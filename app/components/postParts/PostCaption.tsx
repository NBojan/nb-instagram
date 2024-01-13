"use client";
import Link from "next/link";
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
        <Link href={`/profile/${username}`}>
          {username}
        </Link>
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
