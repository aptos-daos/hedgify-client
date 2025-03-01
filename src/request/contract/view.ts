import axios from "axios";
import { getNetwork } from "@/lib/aptos";
import aptos from "@/lib/aptos";

interface ViewPayload {
  function: MoveStructId;
  functionArguments?: any[];
}

const view = async (payload: { payload: ViewPayload }) => {
  try {
    const result = await aptos.view({
      payload: {
        function: payload.payload.function,
        functionArguments: payload.payload.functionArguments
      }
    });
    return result;
  } catch (error) {
    console.error("Error in view function:", error);
    throw error;
  }
};

export default view;
