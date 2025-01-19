import instance from "../api/api.instance";
import APIRequest from "../api/APIRequest";
import type { Comment as CommentType } from "@/validation/comment.validation";

interface LikeData {
  userId: string;
  commentId: string;
  createdAt: string;
}

export default class CommentAPI extends APIRequest {
  constructor() {
    super(instance);
  }

  /**
   * Add a new comment to a DAO
   * @param daoId The ID of the DAO
   * @param content The comment content
   */
  async addComment(comment: CommentType): Promise<CommentType> {
    const config = {
      url: `dao/comments`,
      method: "POST",
      data: comment,
    };

    try {
      const response = await this.request<CommentType>(config);
      return response;
    } catch (error) {
      console.error("Failed to add comment:", error);
      throw error;
    }
  }

  /**
   * Get all comments for a DAO
   * @param daoId The ID of the DAO
   */
  async getComments(daoId: string): Promise<CommentType[]> {
    if (!daoId) {
      throw new Error("DAO ID is required");
    }

    const config = {
      url: `dao/comments/${daoId}`,
      method: "GET",
    };

    try {
      const response = await this.request<CommentType[]>(config, false);
      return response;
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      throw error;
    }
  }

  /**
   * Toggle like status for a comment
   * @param commentId The ID of the comment
   */
  async toggleLikeComment(
    commentId: string,
    userId: string
  ): Promise<{ message: string }> {
    if (!commentId || !userId) {
      throw new Error("Comment ID and User Id is required");
    }

    const config = {
      url: `dao/comments/${commentId}/like-toogle`,
      method: "POST",
      body: { userId },
    };

    console.log("Config", config)

    try {
      const response = await this.request<{ message: string }>(config);
      return response;
    } catch (error) {
      console.error("Failed to toggle like:", error);
      throw error;
    }
  }

  /**
   * Get likes for a comment
   * @param commentId The ID of the comment
   */
  async getCommentLikes(commentId: string): Promise<LikeData[]> {
    if (!commentId) {
      throw new Error("Comment ID is required");
    }

    const config = {
      url: `dao/comments/${commentId}/likes`,
      method: "GET",
    };

    try {
      const response = await this.request<LikeData[]>(config, false);
      return response;
    } catch (error) {
      console.error("Failed to fetch likes:", error);
      throw error;
    }
  }
}
