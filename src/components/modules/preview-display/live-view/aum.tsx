"use client";

import React from "react";
import ValueCard from "./value-card";

const AUM = ({ daoAddress }: { daoAddress: string }) => {
  return <ValueCard heading="AUM" value={"$1.2M"} type="value" />;
};

export default AUM;