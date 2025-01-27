import React from "react";
import Image from "next/image";
import { ThumbsUp } from "lucide-react";
import type { Comment as CommentType } from "@/validation/comment.validation";
import { formatDistanceToNow } from "date-fns";
import CommentAPI from "@/request/comment/comment.api";
import { handleToggleLike } from "@/actions/comments";

// interface Props extends CommentType {}

const Comment: React.FC<CommentType> = ({
  id,
  comment,
  name,
  image,
  likes,
  createdAt,
}) => {
  const handleLikeClick = async () => {
    const resp = await handleToggleLike(id!);
    console.log(resp);
  }

  return (
    <div className="flex items-start space-x-4 p-4">
      <div className="shrink-0">
        <Image
          src={image}
          alt={`${name}'s avatar`}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="grow">
        <div className="flex items-center space-x-2">
          <h4 className="font-semibold">{name}</h4>
          {createdAt && (
            <span className="text-xs text-muted">
              {formatDistanceToNow(createdAt)}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{comment}</p>
        <div className="mt-2 flex items-center justify-between">
          <button className="flex items-center text-gray-500 hover:text-blue-500" onClick={handleLikeClick}>
            <ThumbsUp />
            <span className="ml-1">{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
