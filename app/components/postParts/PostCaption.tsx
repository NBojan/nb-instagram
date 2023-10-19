"use client";
import { useState } from "react";

const PostCaption = ({
  username,
  caption,
}: {
  username: string;
  caption: string;
}) => {
  const [read, setRead] = useState(false);
  const toggleRead = () => setRead(!read);

  return (
    <div className="flex post-padding-x py-2 space-x-2">
      <h5 className="font-bold text-resp truncate max-w-[300px] flex-shrink-0">
        {username}
      </h5>

      <p
        className={`text-resp cursor-default tracking-wide ${read ? "line-clamp-none" : "line-clamp-1"}`}
        onClick={toggleRead}
      >
        {caption}
      </p>
    </div>
  );
};

export default PostCaption;
