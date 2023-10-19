"use client"
import { db } from "@/firebase";
import { likesElement } from "./PostInteract";
import { useGlobalContext } from "@/app/context/context";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots, FaRegBookmark } from "react-icons/fa";
import { Timestamp, deleteDoc, doc, setDoc } from "firebase/firestore";

const PostButtons = ({ likes, postId }: { likes: likesElement[]; postId: string }) => {
  const { user } = useGlobalContext();

  const likePost = async () => {
    await setDoc(doc(db, "userPosts", postId, "likes", user.email), {
      username: user.username,
      userImg: user.userImg,
      timestamp: Timestamp.fromDate(new Date()),
    });
  };

  const removeLike = async () => {
    await deleteDoc(doc(db, "userPosts", postId, "likes", user.email));
  }

  return (
    <div className="flex justify-between space-x-4">
      <div className="flex space-x-4">
        {likes.find((like) => like.id === user.email) ? (
          <button type="button" className="interact-btn text-red-500" onClick={removeLike}>
            <AiFillHeart />
          </button>
        ) : (
          <button type="button" className="interact-btn" onClick={likePost}>
            <AiOutlineHeart />
          </button>
        )}
        <button type="button" className="interact-btn">
          <FaRegCommentDots />
        </button>
      </div>

      <button type="button" className="interact-btn">
        <FaRegBookmark />
      </button>
    </div>
  );
};
 
export default PostButtons;