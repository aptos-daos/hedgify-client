import { useEffect, useState } from "react";
import type { DaoData, DaoFormData } from "@/validation/dao.validation";
import { useToast } from "./use-toast";
import DAOAPI from "@/request/dao/dao.api";

const useDao = (ifetch = false) => {
  const [daos, setDaos] = useState<DaoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const api = new DAOAPI();

  useEffect(() => {
    if(!ifetch) return;
    
    setLoading(true);
    fetchAllDaoData()
      .then((resp) => {
        setDaos(resp);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setDaos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { toast } = useToast();

  const fetchAllDaoData = async (walletAddress?: string): Promise<DaoData[]> => {
    try {
      const response = await api.getAllDAOs();
      return response;
    } catch (error) {
      toast({
        title: "Failed to fetch dao data",
        variant: "destructive",
      });
      return [];
    }
  };

  const fetchDao = async (id: string): Promise<DaoData | null> => {
    try {
      const response = await api.getSingleDAO(id);
      return response;
    } catch (error) {
      toast({
        title: "Failed to fetch dao entry",
        variant: "destructive",
      });
      return null;
    }
  };

  const createDao = async (
    data: DaoFormData,
    inviteCode: string,
  ): Promise<DaoData | null> => {
    try {
      // TODO: handle type
      // @ts-ignore
      return await api.createDAO({inviteCode, ...data});
    } catch (error) {
      toast({
        title: "Failed to add dao",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteDao = async (id: string) => {
    try {
      const response = await api.removeDAO(id);
      return response;
    } catch (error) {
      toast({
        title: "Failed to delete dao",
        variant: "destructive",
      });
    }
  };

  const updateDaoValue = async (id: string, value: Partial<DaoData>) => {
    try {
      const response = await api.updateDAO(id, value);;
      return response;
    } catch (error) {
      toast({
        title: "Failed to update dao value",
        variant: "destructive",
      });
    }
  };

  return {
    daos,
    loading,
    error,
    fetchAllDaoData,
    fetchDao,
    createDao,
    deleteDao,
    updateDaoValue,
  };
};

export { useDao };
