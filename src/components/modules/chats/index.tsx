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

const Chats = ({ daoId }: { daoId: string }) => {
  const [value, setValue] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const session = useSession();

  useEffect(() => {
    const fetchComments = async () => {
      // TODO: FETCH COMMENTS
      setComments([]);
    };

    fetchComments();
  }, []);

  const handleClick = async () => {
    if(session.status === "unauthenticated") {
      // TODO: show toast
    }

    const success = await handleAddComment(value);
    if (success) {
      const comment = commentSchema.parse({
        comment: value,
        ...session.data?.user,
      });
      setComments((prev) => [comment, ...prev]);
    }
    else {
      // TODO: SHOW TOAST
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="Write a comment..."
          className="flex-1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
        <Comment key={index} {...comment} />
      ))}
    </>
  );
};

export default Chats;
