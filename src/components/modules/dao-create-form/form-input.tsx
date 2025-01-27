import React, { HTMLInputTypeAttribute } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePicker from "@/components/molecules/DatePicker";
import { getKebab, getLabel } from "@/utils/formatters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BaseFormProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  formik?: any;
  disabled?: boolean;
}

interface FormInputProps extends BaseFormProps {
  type?: HTMLInputTypeAttribute | "textarea";
}

interface FormSelectProps extends BaseFormProps {
  options: {key: string, value: string}[];
}

const getFormFieldClassNames = (formik: any, name: string) => 
  cn(
    "w-full bg-opacity-5 text-white",
    formik.errors[name] && formik.touched[name] ? "border-red-500 bg-red-100" : ""
  );

const FormField: React.FC<{ formik: any; name: string }> = ({ formik, name }) => (
  formik.errors[name] && formik.touched[name] ? (
    <p className="text-red-500 text-sm">{String(formik.errors[name])}</p>
  ) : null
);

const FormWrapper: React.FC<{ children: React.ReactNode } & BaseFormProps> = ({
  children,
  name,
  label,
  required = true,
}) => (
  <div className="space-y-2">
    <Label htmlFor={name} className="text-muted">
      {label ?? getLabel(name)}
      {required && <span className="text-red-500">*</span>}
    </Label>
    {children}
  </div>
);

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder = "",
  type = "text",
  required = true,
  formik,
  disabled = false,
}) => {
  const commonProps = {
    id: name,
    name,
    placeholder,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[name],
    disabled: disabled || formik.isSubmitting,
    autoComplete: "off",
    className: getFormFieldClassNames(formik, name),
  };

  return (
    <FormWrapper name={name} label={label} required={required}>
      {type === "textarea" ? (
        <Textarea {...commonProps} className={`${commonProps.className} min-h-[100px] px-3 py-2 rounded-md`} rows={4} />
      ) : type === "date" ? (
        <DatePicker
          onChange={(date) => formik.setFieldValue(name, date)}
          defaultValue={formik.values[name]}
        />
      ) : (
        <Input {...commonProps} type={type} />
      )}
      <FormField formik={formik} name={name} />
    </FormWrapper>
  );
};

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  placeholder = "",
  required = true,
  formik,
  disabled = false,
  options,
}) => (
  <FormWrapper name={name} label={label} required={required}>
    <Select
      onValueChange={(value) => formik.setFieldValue(name, value)}
      defaultValue={formik.values[name]}
      disabled={disabled || formik.isSubmitting}
    >
      <SelectTrigger className={getFormFieldClassNames(formik, name)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.key} value={option.value}>
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <FormField formik={formik} name={name} />
  </FormWrapper>
);

export { FormInput, FormSelect };