import { generateInviteCode } from "@/utils/invite-code";
import { useRequest } from "@/request/api/request.hook";
import InviteAPI from "@/request/invite/invite.api";
import { useState, useEffect } from "react";

const useInvite = (secure = false) => {
  const api = new InviteAPI();
  const [codes, setCodes] = useState<Invite[]>([]);
  const { handleRequest } = useRequest();



  const createInviteCode = async (): Promise<string> => {
    const code = generateInviteCode();
    const resp = await handleRequest<string>(() => api.addInvite(code));
    if (resp) return resp;
    return "";
  };

  const removeInviteCode = async (code: string): Promise<boolean> => {
    const success = await handleRequest<boolean>(() => api.removeInvite(code));
    return !!success;
  };

  const getInviteCodes = async (): Promise<Invite[]> => {
    const fetchedCodes = await handleRequest<Invite[]>(() => api.listInvites());
    if (fetchedCodes) {
      setCodes(fetchedCodes);
      return fetchedCodes;
    }
    return [];
  };

  const validInvite = async (code: string): Promise<boolean> => {
    const resp = await handleRequest<boolean>(() => api.validateInvite(code));
    if (resp) return true;
    return false;
  };

  return {
    createInviteCode,
    removeInviteCode,
    getInviteCodes,
    validInvite,
    codes,
  };
};

export default useInvite;
