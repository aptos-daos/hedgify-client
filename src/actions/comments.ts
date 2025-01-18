"use server";

import { auth } from "@/lib/auth";
import { commentSchema } from "@/validation/comment.validation";

export const handleAddComment = async (comment: string): Promise<boolean> => {
  try {
    const session = await auth();

    if (!session?.user) {
      return false;
    }
    const { user } = session;
    const obj = {
      comment,
      userId: user.id!,
      image: user.image!,
      name: user.name!,
    };
    const val = commentSchema.parse(obj);

    // TODO: SEND COMMENT
    return true;
  } catch (error) {
    console.error("Validation failed:", error);
    return false;
  }
};
