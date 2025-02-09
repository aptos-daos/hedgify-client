import React from "react";
import { DaoData } from "@/validation/dao.validation";
import { DaoStatus } from "@/constants";
import DaoDetails from "../preview-display/DaoDetails";
import ParticipantsTable from "@/components/modules/participants-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props extends DaoData {
  status: DaoStatus;
}

const FundsTabs: React.FC<Props> = ({ status, ...dao }) => {
  const tabs = [
    { value: "overview", label: "Overview", content: <DaoDetails {...dao} /> },
    {
      value: "participants",
      label: "Participants",
      content: <ParticipantsTable daoAddress={dao.treasuryAddress} />,
    },
  ];

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FundsTabs;
