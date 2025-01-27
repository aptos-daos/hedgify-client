import APIRequest from "../api/APIRequest";

export default class InviteAPI extends APIRequest {
  constructor() {
    super();
  }

  async listInvites() {
    const config = {
      url: "/invite",
      method: "GET",
    };

    try {
      const response = await this.request<Invite[]>(config);

      if (!response) {
        throw new Error("No response from server when fetching invites");
      }

      return response;
    } catch (error) {
      console.error("Failed to fetch invites:", error);
      throw error;
    }
  }

  async validateInvite(code: string): Promise<boolean> {
    if (!code) {
      throw new Error("Invite code is required");
    }

    const config = {
      url: `/invite/${code}`,
      method: "POST",
    };

    try {
      const response = await this.request<{ verified: boolean }>(config);
      return response.verified;
    } catch (error) {
      return false;
    }
  }

  async addInvite(code: string) {
    const config = {
      url: "/invite/add",
      method: "POST",
      data: { code },
    };

    try {
      const response = await this.request<string>(config);

      if (!response) {
        throw new Error("No response from server when adding invite");
      }

      return response;
    } catch (error) {
      console.error("Failed to add invite:", error);
      throw error;
    }
  }

  async removeInvite(code: string) {
    if (!code) {
      throw new Error("Invite code is required");
    }

    const config = {
      url: `/invite/${code}`,
      method: "DELETE",
    };

    try {
      const response = await this.request<boolean>(config);

      if (!response) {
        throw new Error("No response from server when removing invite");
      }

      return response;
    } catch (error) {
      console.error("Failed to remove invite:", error);
      throw error;
    }
  }
}
