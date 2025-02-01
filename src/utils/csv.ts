import Papa from "papaparse";
import { z } from "zod";
import { CSVRowSchema, type CSVRow } from "@/validation/csv.validation";

const getWhitelistArray = (file: File): Promise<CSVRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(file, {
      complete: (results) => {
        try {
          const invalidEntries: { row: number; error: string }[] = [];
          const validData: CSVRow[] = results.data
            .map((item, index) => {
              try {
                // Validate each row against the schema
                return CSVRowSchema.parse({
                  address: item.address,
                  amount: item.amount,
                });
              } catch (error) {
                // Capture invalid rows with row number and error message
                invalidEntries.push({
                  row: index + 2, // Add 2 (1 for header and 1 for 1-based index)
                  error:
                    (error as z.ZodError).issues[0]?.message || "Invalid row",
                });
                return null; // Invalid rows return null
              }
            })
            .filter((row): row is CSVRow => row !== null); // Filter valid rows

          if (invalidEntries.length > 0) {
            // Reject the promise with invalid row details
            reject({
              message: "CSV contains invalid entries",
              invalidEntries,
            });
            return;
          }

          resolve(validData);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
      header: true,
      skipEmptyLines: true,
    });
  });
};

const arrayToCSVFile = (
  allowlistArray: CSVRow[],
  filename: string
): File | null => {
  const headers = ["address", "amount"] as const;

  if (!Array.isArray(allowlistArray)) {
    console.log("allowlistArray is not an array", allowlistArray);
    return null;
  }

  const csvContent = [
    headers.join(","),
    ...allowlistArray.map((row) => {
      return headers.map((header) => row[header]).join(",");
    }),
  ].join("\n");

  const file = new File([csvContent], filename, { type: "text/csv" });
  return file;
};

export { getWhitelistArray, CSVRowSchema, arrayToCSVFile, type CSVRow };
