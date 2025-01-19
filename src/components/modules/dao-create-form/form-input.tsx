import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePicker from "@/components/molecules/DatePicker";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  formik?: any;
  disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder = "",
  type = "text",
  required = true,
  formik,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-muted">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className={`w-full min-h-[100px] px-3 py-2 rounded-md border text-white ${
            formik.errors[name] && formik.touched[name]
              ? "border-red-500"
              : "border-gray-300"
          }`}
          disabled={disabled || formik.isSubmitting}
          autoComplete="off"
        />
      ) : type === "date" ? (
        <DatePicker
          onChange={(date) => {
            formik.setFieldValue(name, date);
          }}
          defaultValue={formik.values[name]}
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          disabled={disabled || formik.isSubmitting}
          autoComplete="off"
          className={cn(
            "bg-white bg-opacity-5",
            formik.errors[name] && formik.touched[name]
              ? "border-red-500 bg-red-100"
              : ""
          )}
        />
      )}
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-red-500 text-sm">{String(formik.errors[name])}</p>
      )}
    </div>
  );
};

export default FormInput;
