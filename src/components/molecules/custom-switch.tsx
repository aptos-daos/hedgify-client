import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CustomSwitch = ({
  heading,
  label,
  active,
  onToggle,
}: {
  heading: string;
  label: string;
  active: boolean;
  onToggle: (checked: boolean) => void;
}) => {
  return (
    <div className="flex justify-between items-center bg-white/10 rounded-lg p-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-primary">{heading}</h3>
        <Label>{label}</Label>
      </div>
      <Switch checked={active} onCheckedChange={onToggle} />
    </div>
  );
};

export default CustomSwitch;
