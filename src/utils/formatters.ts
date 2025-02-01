import { format } from "date-fns";
const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value}%`;
};

const getKebab = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const getTicker = (str: string) => {
  const arr = str.replace(/[^\w\s]/g, "").split(" ");
  if (arr.length > 2) {
    return arr
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }
  return str.replaceAll(" ", "").substring(0, 3).toUpperCase();
};

const getLabel = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getSecondsTime = (val: unknown): number => {
  if (typeof val === "string") {
    const date = new Date(val);
    return isNaN(date.getTime())
      ? getSecondsTime(new Date())
      : getSecondsTime(date);
  }

  if (typeof val === "number") {
    return val > 1e12 ? val / 1000 : val;
  }

  if (val instanceof Date) {
    return getSecondsTime(val.getTime());
  }

  return getSecondsTime(new Date()); // Default to current time if input is invalid
};

export {
  formatNumber,
  formatCurrency,
  formatPercentage,
  getKebab,
  getTicker,
  getLabel,
  getSecondsTime
};
