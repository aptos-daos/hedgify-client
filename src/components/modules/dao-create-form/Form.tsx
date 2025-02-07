import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { daoFormSchema, daoSchema } from "@/validation/dao.validation";
import { FormInput, FormSelect } from "./form-input";
import { ImageUpload } from "@/components/ui/image-upload";
import { compressImage } from "@/utils/image";
import uploadFile from "@/utils/upload-file";
import { type DaoFormData } from "@/validation/dao.validation";
import { getKebab, getTicker } from "@/utils/formatters";
import { FileUpload } from "@/components/ui/file-upload";
import {
  AVAILABLE_FUND_OPTIONS,
  AVAILABLE_PERIOD_OF_TRADING,
} from "@/constants";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { CSVRow, getWhitelistArray } from "@/utils/csv";

interface IData extends DaoFormData {
  whitelist: CSVRow[];
}

interface Props {
  onSubmit: (data: IData) => void;
  address: string;
}

const DAOForm: React.FC<Props> = ({ address, onSubmit }) => {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [whitelist, setWhitelist] = useState<CSVRow[]>([]);

  const handleFileUpload = async (file: File | null) => {
    if (!file) return;
    compressImage(file).then((compressedFile) => {
      setFile(compressedFile);
    });
  };

  const handleFileChange = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const whtl = await getWhitelistArray(file);
    setWhitelist(whtl);
  };

  const formik = useFormik<DaoFormData>({
    initialValues: {
      title: "",
      fundTicker: "",
      description: "",
      userXHandle: session?.user?.name!,
      daoXHandle: "",
      telegramHandle: "",
      telegramGroup: "",
      website: "",
      fundingStarts: new Date(),
      indexFund: 0,
      profits: 0,
      poster: "",
      tradingPeriod: 0,
      walletAddress: address,
      isPublic: true,
      publicLimit: 0,
    },
    validationSchema: toFormikValidationSchema(daoFormSchema),
    onSubmit: async (values) => {
      console.log(values);
      if (!file) {
        toast({
          title: "Upload Poster",
          variant: "destructive",
        });
        return;
      }
      const url = await uploadFile(file);
      onSubmit({
        ...values,
        poster: url,
        isPublic: whitelist.length === 0,
        whitelist,
      });
    },
  });
  // console.log(formik);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <ImageUpload onChange={handleFileUpload} />
      <FormInput
        name="title"
        label="Fund Name"
        placeholder="Enter your fund's name"
        formik={formik}
      />
      <FormInput
        name="fundTicker"
        placeholder="e.g., APT, ZAAP"
        formik={formik}
      />
      <FormInput
        name="description"
        label="Fund Description"
        placeholder="Describe your fund's strategy and goals"
        type="textarea"
        formik={formik}
      />
      <FormInput
        name="publicLimit"
        label="Public Max Limit"
        placeholder="User Max Limit"
        type="number"
        formik={formik}
      />
      <FormInput name="daoXHandle" placeholder="@username" formik={formik} />
      <FormInput
        label="Telegram Handle of Fund Manager"
        name="telegramHandle"
        placeholder="@username"
        formik={formik}
      />
      <FormInput
        name="telegramGroup"
        placeholder="@groupname (optional)"
        formik={formik}
        required={false}
      />
      <FormInput
        name="fundingStarts"
        type="date"
        placeholder="Enter the date your fund will begin"
        formik={formik}
      />
      <FormInput
        name="website"
        placeholder="https://hedgify.money"
        formik={formik}
        required={false}
      />
      <FormInput
        name="profits"
        label="Manager's Cut"
        type="number"
        placeholder="Enter the Profit share Fund Manager wants to keep"
        formik={formik}
      />
      <FormSelect
        name="indexFund"
        options={AVAILABLE_FUND_OPTIONS.map((item) => ({
          key: item.toLocaleString(),
          value: item.toString(),
        }))}
        placeholder="Enter the Profit share Fund Manager wants to keep"
        formik={formik}
      />
      <FormSelect
        name="tradingPeriod"
        options={AVAILABLE_PERIOD_OF_TRADING.map((days) => ({
          key: `${days} days`,
          value: days,
        }))}
        placeholder="Select trading period duration"
        formik={formik}
      />

      <FileUpload onChange={handleFileChange} />

      <Button
        type="submit"
        className="w-full font-semibold"
        // disabled={formik.isSubmitting || !formik.isValid}
      >
        {formik.isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default DAOForm;
