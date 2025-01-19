"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Comment from "./comment";
import { useSession } from "next-auth/react";
import {
  commentSchema,
  type Comment as CommentType,
} from "@/validation/comment.validation";
import { handleAddComment } from "@/actions/comments";
import CommentAPI from "@/request/comment/comment.api";

const Chats = ({ daoId }: { daoId: string }) => {
  const api = new CommentAPI();

  const [value, setValue] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const session = useSession();

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await api.getComments(daoId);
      const sorted = comments.sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
      setComments(sorted);
    };

    fetchComments();
  }, []);

  const handleClick = async () => {
    if (session.status === "unauthenticated") {
      // TODO: show toast
    }

    const id = await handleAddComment(value, daoId);
    if (id) {
      console.log(id);
      const comment = commentSchema.parse({
        id,
        daoId,
        comment: value,
        name: session.data?.user?.name,
        userId: session.data?.user?.id,
        image: session.data?.user?.image,
      });
      setComments((prev) => [comment, ...prev]);
      setValue("");
    } else {
      // TODO: SHOW TOAST
    }
  };

  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-md">
      <div className="flex gap-2">
        <Input
          placeholder="Write a comment..."
          className="flex-1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <Button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
          onClick={handleClick}
        >
          Post
          <Send />
        </Button>
      </div>
      {comments.map((comment, index) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default Chats;
