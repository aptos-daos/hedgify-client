import instance from "../api/api.instance";
import APIRequest from "../api/APIRequest";
import { DaoData, DaoFormData } from "@/validation/dao.validation";
import { CSVRow } from "@/validation/csv.validation";

type DaoCreateType = DaoFormData & { inviteCode: string } & {
  whitelist: CSVRow[];
};
type DaoResponseType = DaoFormData & { merkle: string };
type MerkleResponseType = { root: string; leaves: string[] };
type DaoSingleResponseType = DaoData & { merkle: {root: string, proof: string, limit: string} };

/**
 * DAOAPI class provides methods to:
 * 1) Create a new DAO
 * 2) Update an existing DAO
 * 3) Delete a DAO
 * 4) Get all DAOs
 * 5) Get a single DAO by ID
 */
export default class DAOAPI extends APIRequest {
  constructor() {
    super(instance);
  }

  /**
   * Creates a new DAO with the provided data
   * @param daoData The data for creating the new DAO
   * @throws If required data is missing or if the server response is invalid
   */
  async createDAO(daoData: DaoCreateType): Promise<DaoResponseType> {
    const config = {
      url: "/dao",
      method: "POST",
      data: daoData,
    };

    try {
      return await this.request<DaoResponseType>(config);
    } catch (error) {
      console.error("Failed to create DAO:", error);
      throw error;
    }
  }

  /**
   * Updates an existing DAO
   * @param id The ID of the DAO to update
   * @param updateData The data to update
   * @throws If ID is missing or if server returns an invalid response
   */
  async updateDAO(id: string, updateData: Partial<DaoData>): Promise<DaoData> {
    if (!id) {
      throw new Error("DAO ID is required for updating");
    }

    const config = {
      url: `/dao/${id}`,
      method: "PUT",
      data: updateData,
    };

    try {
      const response = await this.request<DaoData>(config);
      return response;
    } catch (error) {
      console.error("Failed to update DAO:", error);
      throw error;
    }
  }

  /**
   * Deletes a DAO by ID
   * @param id The ID of the DAO to delete
   * @throws If ID is missing or if server returns an invalid response
   */
  async removeDAO(id: string): Promise<{ message: string }> {
    if (!id) {
      throw new Error("DAO ID is required for deletion");
    }

    const config = {
      url: `/dao/${id}`,
      method: "DELETE",
    };

    try {
      const response = await this.request<{ message: string }>(config);
      return response;
    } catch (error) {
      console.error("Failed to delete DAO:", error);
      throw error;
    }
  }

  /**
   * Retrieves all DAOs
   * @returns Array of DAO objects
   * @throws If server returns an invalid response
   */
  async getAllDAOs(): Promise<DaoData[]> {
    const config = {
      url: "/dao",
      method: "GET",
    };

    try {
      const response = await this.request<DaoData[]>(config, false);
      return response;
    } catch (error) {
      console.error("Failed to fetch DAOs:", error);
      throw error;
    }
  }

  /**
   * Retrieves a single DAO by ID
   * @param id The ID of the DAO to retrieve
   * @returns DAO object
   * @throws If ID is missing or if server returns an invalid response
   */
  async getSingleDAO(id: string, address?: string): Promise<DaoSingleResponseType | DaoData> {
    if (!id) {
      throw new Error("DAO ID is required");
    }

    const config = {
      url: `/dao/${id}`,
      method: "GET",
      body: { address },
    };

    try {
      const response = await this.request<DaoSingleResponseType | DaoData>(config, false);
      return response;
    } catch (error) {
      console.error("Failed to fetch DAO:", error);
      throw error;
    }
  }

  /**
   * Retrieves merkle tree data for a DAO
   * @param id The ID of the DAO to get merkle tree for
   * @returns Object containing merkle root and leaves
   * @throws If ID is missing or if server returns an invalid response
   */
  async getMerkleTree(id: string): Promise<MerkleResponseType> {
    if (!id) {
      throw new Error("DAO ID is required");
    }

    const config = {
      url: `/dao/merkle/${id}`,
      method: "GET",
    };

    try {
      const response = await this.request<MerkleResponseType>(config, false);
      return response;
    } catch (error) {
      console.error("Failed to fetch merkle tree:", error);
      throw error;
    }
  }
}
