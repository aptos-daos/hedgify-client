"use client";

import React from "react";
import ValueCard from "./value-card";

const Returns = ({ daoAddress }: { daoAddress: string }) => {

  return <ValueCard heading="Returns" value={"98%"} type="value" />;
};

export default Returns;