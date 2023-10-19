"use client"
import { LikesPop } from "..";
import { useState } from "react";
import { likesElement } from "./PostInteract";

const PostLikes = ({ likes }: { likes: likesElement[] }) => {
  const [openLikes, setOpenLikes] = useState(false);

  return (
    <div className="pt-2">
      <h5
        className="font-bold text-resp cursor-pointer"
        onClick={() => setOpenLikes(true)}
      >
        {likes.length} {likes.length === 1 ? "like" : "likes"}
      </h5>

      {openLikes && <LikesPop likes={likes} setOpenLikes={setOpenLikes} />}
    </div>
  );
};
 
export default PostLikes;