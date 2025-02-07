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
import { toast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

  useEffect(() => {
    const fetchLikes = async () => {
      const likes = await api.getCommentLikes(daoId, session.data?.user?.id!);
      // const sorted = comments.sort(
      //   (a, b) =>
      //     new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      // );
      // setComments(sorted);
    };

    fetchLikes();
  }, []);

  const handleClick = async () => {
    if (session.status === "unauthenticated") {
      toast({ title: "Please login to X/Twitter", variant: "destructive" });
      return;
    }

    const id = await handleAddComment(value, daoId);
    if (id) {
      const comment = commentSchema.parse({
        id,
        daoId,
        comment: value,
        name: session.data?.user?.name,
        // @ts-ignore
        userId: session.data?.user?.id,
        image: session.data?.user?.image,
      });
      setComments((prev) => [comment, ...prev]);
      setValue("");
    } else {
      toast({ title: "Server Error", variant: "destructive" });
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle className="text-white">Chats</CardTitle>
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
            className="bg-primary text-primary-foreground"
            onClick={handleClick}
          >
            Post
            <Send />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-primary">
        {comments.map((comment, index) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </CardContent>
    </Card>
  );
};

export default Chats;
