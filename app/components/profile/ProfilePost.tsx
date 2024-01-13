import Link from "next/link";
import Image from "next/image";
import { db } from "@/firebase";
import { postElement } from "../feed/Posts";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";

const getInteractions = async (id:string) => {
    const likes = [] as any;
    const comments = [] as any;

    const likesSnapshot = await getDocs(collection(db, "userPosts", id, "likes"));
    likesSnapshot.forEach(doc => likes.push({id: doc.id, ...doc.data()}));

    const commentsSnapshot = await getDocs(collection(db, "userPosts", id, "comments"));
    commentsSnapshot.forEach(doc => comments.push({id: doc.id, ...doc.data()}));

    return { likes, comments }
}

const ProfilePost = async ({ post }: { post: postElement }) => {
  const { likes, comments } = await getInteractions(post.id);

  return (
    <Link href={`/post/${post.id}`} className="block basis-[33%] mb-1 relative group">
        <Image src={post.image} alt="" width={300} height={300} className="w-full aspect-square" />
        
        <div className="hidden group-hover:flex absolute top-0 left-0 w-full h-full justify-center items-center flex-col bg-black bg-opacity-30">
            <p className="flex items-center space-x-2 text-white text-[18px]">
                <span><AiOutlineHeart /></span>
                <span>{likes.length}</span>
            </p>
            <p className="flex items-center space-x-2 text-white text-[18px]">
                <span><FaRegCommentDots /></span>
                <span>{comments.length}</span>
            </p>
        </div>
    </Link>
  )
};
 
export default ProfilePost;