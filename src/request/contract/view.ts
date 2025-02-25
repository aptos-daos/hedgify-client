import axios from "axios";
import { getNetwork } from "@/lib/aptos";

interface ViewPayload {
  function: string;
  typeArguments?: string[];
  functionArguments?: any[];
}

const view = async (payload: { payload: ViewPayload }) => {
  const network = getNetwork();
  const options = {
    method: "POST",
    url: `https://api.${network}.aptoslabs.com/v1/view`,
    headers: { "Content-Type": "application/json" },
    data: {
      function: payload.payload.function,
      type_arguments: payload.payload.typeArguments || [],
      arguments: payload.payload.functionArguments || [],
    },
  };

  console.log(options);
  return axios.request(options);
};

export default view;
