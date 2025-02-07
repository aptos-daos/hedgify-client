import React, { HTMLInputTypeAttribute, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePicker from "@/components/molecules/DatePicker";
import { getLabel } from "@/utils/formatters";
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
  options: { key: string; value: string | number }[];
}

const getFormFieldClassNames = (formik: any, name: string) =>
  cn(
    "w-full bg-white/5 text-white",
    formik.errors[name] && formik.touched[name]
      ? "border-red-500 bg-red-800/10"
      : ""
  );

const FormField: React.FC<{ formik: any; name: string }> = ({
  formik,
  name,
}) => {
  const hasError = useMemo(
    () => formik.errors[name] && formik.touched[name],
    [formik.errors[name], formik.touched[name], name]
  );

  if (!hasError) return null;
  return <p className="text-red-500 text-sm">{String(formik.errors[name])}</p>;
};

const FormWrapper: React.FC<{ children: React.ReactNode } & BaseFormProps> = ({
  children,
  name,
  label,
  required = true,
}) => {
  const displayLabel = useMemo(() => label ?? getLabel(name), [label, name]);

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-muted">
        {displayLabel}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
};

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder = "",
  type = "text",
  required = true,
  formik,
  disabled = false,
}) => {
  const fieldClassNames = useMemo(
    () => getFormFieldClassNames(formik, name),
    [formik.errors[name], formik.touched[name], name]
  );

  const commonProps = useMemo(
    () => ({
      id: name,
      name,
      placeholder,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values[name],
      disabled: disabled || formik.isSubmitting,
      autoComplete: "off",
      className: fieldClassNames,
    }),
    [
      name,
      placeholder,
      formik.handleChange,
      formik.handleBlur,
      formik.values[name],
      formik.isSubmitting,
      disabled,
      fieldClassNames,
    ]
  );

  const textareaClassName = useMemo(
    () => `${commonProps.className} min-h-[100px] px-3 py-2 rounded-md`,
    [commonProps.className]
  );

  return (
    <FormWrapper name={name} label={label} required={required}>
      {type === "textarea" ? (
        <Textarea {...commonProps} className={textareaClassName} rows={4} />
      ) : type === "date" ? (
        <DatePicker
          onChange={(date) => formik.setFieldValue(name, date)}
          defaultValue={formik.values[name]}
        />
      ) : (
        <Input
          {...commonProps}
          type={type}
          onWheel={(e) =>
            type === "number" &&
            e.target instanceof HTMLElement &&
            e.target.blur()
          }
        />
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
}) => {
  const fieldClassNames = useMemo(
    () => getFormFieldClassNames(formik, name),
    [formik.errors[name], formik.touched[name], name]
  );

  const memoizedOptions = useMemo(
    () =>
      options.map((option) => (
        <SelectItem key={option.key} value={String(option.value)}>
          {option.key}
        </SelectItem>
      )),
    [options]
  );

  return (
    <FormWrapper name={name} label={label} required={required}>
      <Select
        onValueChange={(value) => formik.setFieldValue(name, value)}
        defaultValue={formik.values[name]}
        disabled={disabled || formik.isSubmitting}
      >
        <SelectTrigger className={fieldClassNames}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{memoizedOptions}</SelectContent>
      </Select>
      <FormField formik={formik} name={name} />
    </FormWrapper>
  );
};

export { FormInput, FormSelect };
