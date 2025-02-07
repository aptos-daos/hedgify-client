import React from "react";
import Image from "next/image";
import { ThumbsUp, MessageCircle } from "lucide-react";
import type { Comment as CommentType } from "@/validation/comment.validation";
import { formatDistanceToNow } from "date-fns";
import CommentAPI from "@/request/comment/comment.api";
import { handleToggleLike } from "@/actions/comments";

const Comment: React.FC<CommentType> = ({
  id,
  daoId,
  comment,
  name,
  image,
  likes,
  createdAt,
}) => {
  const handleLikeClick = async () => {
    const resp = await handleToggleLike(daoId, id!);
    console.log(resp);
  }

  return (
    <div className="group relative flex items-start space-x-4 rounded-lg p-4 transition-all">
      <div className="shrink-0">
        <Image
          src={image}
          alt={`${name}'s avatar`}
          width={40}
          height={40}
          className="rounded-full border-2 border-primary/20 transition-all"
        />
      </div>
      <div className="grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-primary">{name}</h4>
            {createdAt && (
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(createdAt)}
              </span>
            )}
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{comment}</p>
        <div className="mt-3 flex items-center space-x-4">
          <button 
            className="flex items-center space-x-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary transition-colors hover:bg-primary/20" 
            onClick={handleLikeClick}
          >
            <ThumbsUp size={14} />
            <span>{likes}</span>
          </button>
          {/* <button className="flex items-center space-x-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary transition-colors hover:bg-primary/20">
            <MessageCircle size={14} />
            <span>Reply</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
