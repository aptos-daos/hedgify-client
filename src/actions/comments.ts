"use server";

import CommentAPI from "@/request/comment/comment.api";
import { commentSchema } from "@/validation/comment.validation";
import { getSession } from "@/lib/auth";

const api = new CommentAPI();

export const handleAddComment = async (
  comment: string,
  daoId: string
): Promise<string> => {
  try {
    const session = await getSession();
    console.log("session", session)
    if (!session?.user) {
      return "";
    }
    const { user } = session;
    const obj = {
      comment,
      daoId,
      userId: user.id!,
      image: user.image!,
      name: user.name!,
    };
    const val = commentSchema.parse(obj);
    const resp = await api.addComment(val);
    if (resp && resp.id) {
      return resp.id;
    }
    return "";
  } catch (error) {
    return "";
  }
};

export const handleToggleLike = async (daoId: string, commentId: string): Promise<string> => {
  const session = await getSession();

  const resp = await api.toggleLikeComment(daoId, commentId, session?.user?.id!);
  // TODO: HANDLE LIKE
  return "";
};
