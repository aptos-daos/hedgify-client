"use server";

import { auth } from "@/lib/auth";
import CommentAPI from "@/request/comment/comment.api";
import { commentSchema } from "@/validation/comment.validation";

const api = new CommentAPI();

export const handleAddComment = async (
  comment: string,
  daoId: string
): Promise<string> => {
  try {
    const session = await auth();

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

export const handleToggleLike = async (commentId: string): Promise<string> => {
  const session = await auth();
  // const resp = await api.toggleLikeComment(commentId, session?.user?.id!);
  //TODO: HANDLE LIKE
  return "";
};
