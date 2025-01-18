import React from "react";
import Image from "next/image";
import { ThumbsUp } from "lucide-react";
import type { Comment as CommentType } from "@/validation/comment.validation";

interface Props extends CommentType {}

const Comment: React.FC<Props> = ({ comment, name, image, likes }) => {
  return (
    <div className="flex items-start space-x-4 p-4 border-b border-gray-200">
      <div className="flex-shrink-0">
        <Image
          src={image}
          alt={`${name}'s avatar`}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center space-x-2">
          <h4 className="font-medium text-gray-900">{name}</h4>
        </div>
        <p className="mt-1 text-gray-600">{comment}</p>
        <div className="mt-2 flex items-center space-x-2">
          <button className="flex items-center text-gray-500 hover:text-blue-500">
            <ThumbsUp />
            <span className="ml-1">{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
