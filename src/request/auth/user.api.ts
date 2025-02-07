import APIRequest from "../api/APIRequest";
import { setToken, removeToken } from "@/lib/token";

type MessageNonceResponse = {
  message: string;
  nonce: string;
};

type LoginResponse = {
  token: string;
  walletAddress: string;
  role?: string;
};

/**
 * UserAPI class provides methods to:
 * 1) request a unique message + nonce from the server (for signature),
 * 2) log in using that message, signature, and account.
 */
export default class UserAPI extends APIRequest {
  private walletAddress: string = "";

  constructor() {
    super();
  }

  /**
   * Requests a signed message from the server given a wallet address.
   * @param walletAddress The wallet address (e.g., Aptos address).
   * @throws If walletAddress is missing or if the server response is invalid.
   */
  async requestMessage(walletAddress: string) {
    if (!walletAddress) {
      throw new Error("A valid wallet address is required for requestMessage.");
    }

    this.walletAddress = walletAddress;

    const config = {
      url: "/auth/request-message",
      method: "POST",
      data: { walletAddress: this.walletAddress },
    };

    try {
      const response = await this.request<MessageNonceResponse>(config);

      if (!response) {
        throw new Error("No response from server on requestMessage call.");
      }
      if (!response.message || !response.nonce) {
        throw new Error(
          "Server response missing 'message' or 'nonce' for requestMessage."
        );
      }

      return { message: response.message, nonce: response.nonce };
    } catch (error) {
      console.error("Failed to request message:", error);
      throw error; // re-throw so the caller knows it failed
    }
  }

  /**
   * Logs the user in by providing the signed message, signature, and account.
   * @param account The wallet address or account identifier.
   * @param message The message returned by requestMessage.
   * @param signature The signature from the user’s wallet.
   * @throws If any required param is missing or if server returns an invalid response.
   */
  async login(
    address: string,
    publicKey: string,
    message: string,
    signature: string
  ) {
    if (!address || !message || !signature) {
      throw new Error(
        "Account, message, and signature are all required to login."
      );
    }

    const config = {
      url: "/auth",
      method: "POST",
      data: { address, publicKey, message, signature },
    };

    try {
      const response = await this.request<LoginResponse>(config);

      if (!response) {
        throw new Error("No response from server during login.");
      }
      if (!response.token) {
        throw new Error("No token returned from server during login.");
      }

      // Clear any existing token, then set the new one
      removeToken();
      setToken(response.token);

      // Return the full response object if needed
      return response;
    } catch (error) {
      console.error("Failed to login user:", error);
      throw error; // re-throw so the caller knows it failed
    }
  }

  /**
   * Gets an admin signature for claim verification.
   * @param dao_address The DAO contract address
   * @param joinee_address The address of the user joining the DAO
   * @returns The admin signature
   * @throws If the server request fails
   */
  async getAdminSignature(dao_address: string, joinee_address: string) {
    const config = {
      url: "/auth/admin",
      method: "POST",
      data: {
        dao_address,
        joinee_address,
      },
    };

    try {
      return await this.request<{
        signature: string;
        expire_time_in_seconds: string;
      }>(config);
    } catch (error) {
      console.error("Failed to get admin signature:", error);
      throw error;
    }
  }
}
