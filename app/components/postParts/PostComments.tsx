"use client"

import { Comment } from "..";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { Timestamp, collection, onSnapshot, orderBy, query } from "firebase/firestore";

export interface commentElement {
  id: string;
  comment: string;
  timestamp: Timestamp;
  userImg: string;
  username: string;
}

const PostComments = ({ postId, postPage }: { postId: string, postPage: boolean }) => {
    const [comments, setComments] = useState<commentElement[]>([]);

    useEffect(() => {
        const q = query(collection(db, "userPosts", postId, "comments"), orderBy("timestamp", "desc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const availableComments = [] as any;
            querySnapshot.forEach((doc) => {
                availableComments.push({id: doc.id, ...doc.data()});
            });
            setComments(availableComments);
          });
    }, [])

    return (
      <div className="px-6 sm:px-8 py-1">
        {comments.length < 1 ? (
          <p className="text-resp text-gray-500">Be the first to leave a comment.</p>
        ) : (
          <div className={`${postPage ? 'max-h-[10rem]' : 'max-h-[6rem]'} overflow-y-scroll scrollbar-thin`}>
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
        )}
      </div>
    );
}
 
export default PostComments;