"use client";
import { db } from "@/firebase";
import { useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { useGlobalContext } from "@/app/context/context";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const UploadComment = ({ postId }: { postId: string }) => {
  const { user } = useGlobalContext();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!comment.trim()) return
    else {
        setLoading(true);
        const postComment = await addDoc(collection(db, "userPosts", postId, "comments"), {
            comment: comment.trim(),
            username: user.username,
            userImg: user.userImg,
            timestamp: Timestamp.fromDate(new Date())
        })
        setComment("");
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center post-padding-x py-4 space-x-3">
      <label htmlFor="comment" className="text-2xl">
        <FaRegSmile />
      </label>

      <input
        type="text"
        placeholder="Enter your comment..."
        className="w-full outline-none text-resp tracking-wide"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        autoComplete="off"
      />

      <button
        type="submit"
        className="text-blue-500 disabled:text-blue-300 text-resp tracking-wide"
        disabled={!comment || loading}
      >
        {loading ? <div className="loading loading-resp"></div> : "Post"}
      </button>
    </form>
  );
};

export default UploadComment;
