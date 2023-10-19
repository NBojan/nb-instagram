"use client"
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { PostButtons, PostLikes } from "..";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export interface likesElement {
    id: string;
    username: string;
    userImg: string;
}

const PostInteract = ({ postId }: { postId: string }) => {
    const [likes, setLikes] = useState<likesElement[]>([]);

    useEffect(() => {
        const q = query(collection(db, "userPosts", postId, "likes"), orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const likings = [] as any;
            querySnapshot.forEach((doc) => {
                likings.push({id: doc.id, ...doc.data()});
            });
            setLikes(likings);
        });
    }, [])

    return (
        <div className="post-padding-x pt-3">
            <PostButtons likes={likes} postId={postId} />

            {likes.length > 0 && <PostLikes likes={likes} />}
        </div>
    );
}
 
export default PostInteract;