import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { daoSchema } from "@/validation/dao.validation";
import { useSession } from "next-auth/react";
import FormInput from "./form-input";
import { ImageUpload } from "@/components/ui/image-upload";
import { compressImage } from "@/utils/image";
import uploadFile from "@/utils/upload-file";
import { type DaoFormData } from "@/validation/dao.validation";

interface Props {
  onSubmit: (data: DaoFormData) => void;
}

const DAOForm: React.FC<Props> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async (file: File | null) => {
    if (!file) return;
    compressImage(file).then((compressedFile) => {
      setFile(compressedFile);
    });
  };

  const formik = useFormik<DaoFormData>({
    initialValues: {
      title: "",
      description: "",
      fundTicker: "",
      telegramHandle: "",
      telegramGroup: "",
      poc: "",
      fundingStarts: new Date(),
      indexFund: 0,
      poster: "",
    },
    validationSchema: toFormikValidationSchema(daoSchema),
    onSubmit: async (values) => {
      if (!file) return;
      const url = await uploadFile(file);
      onSubmit({ ...values, poster: url });
    },
  });

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
        label="Fund Ticker"
        placeholder="e.g., BTC, ETH"
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
        name="telegramHandle"
        label="Telegram Handle"
        placeholder="@username"
        formik={formik}
      />
      <FormInput
        name="telegramGroup"
        label="Telegram Group"
        placeholder="@groupname (optional)"
        formik={formik}
        required={false}
      />
      <FormInput
        name="poc"
        label="Point of Contact at DeFi"
        placeholder="Enter the name of your DeFi contact"
        formik={formik}
      />
      <FormInput
        name="fundingStarts"
        type="date"
        label="Funding Starts"
        placeholder="Enter the date your fund will begin"
        formik={formik}
      />

      <Button
        type="submit"
        className="w-full font-semibold"
        disabled={formik.isSubmitting || !formik.isValid}
      >
        {formik.isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default DAOForm;
