import React from "react";
import ValueCard from "./value-card";

const TwitterCard = ({ twitter }: { twitter: string }) => {
  return <ValueCard heading="Twitter" value={twitter} />;
};

export default TwitterCard;
