"use client";

import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { CSVRow, getWhitelistArray } from "@/utils/csv";
import { DaoData } from "@/validation/dao.validation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useContract } from "@/hooks/use-contract";

const AdminController: React.FC<DaoData> = (dao) => {
  const [whitelist, setWhitelist] = useState<CSVRow[]>([]);
  const [active, setActive] = useState(false);
  const { endWhitelist } = useContract();

  const handleFileChange = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    const whtl = await getWhitelistArray(file);
    setWhitelist(whtl);
  };

  const handleToggle = async () => {
    setActive(!active);
    const contract_resp = await endWhitelist(dao);
  };

  return (
    <Card className="md:max-w-lg m-auto">
      <CardHeader>
        <CardTitle className="text-white">Admin</CardTitle>
      </CardHeader>
      <CardContent className="text-white space-y-2">
        <div className="flex justify-between items-center bg-white/10 rounded-lg p-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-primary">Public Stage</h3>
            <Label>Disable VIP Stage</Label>
          </div>
          <Switch checked={active} onCheckedChange={handleToggle} />
        </div>

        <FileUpload onChange={handleFileChange} />
      </CardContent>
    </Card>
  );
};

export default AdminController;
