"use client";
import { db } from "@/firebase";
import { Post } from "../index";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export interface postElement {
  id: string;
  caption: string;
  image: string;
  userImg: string;
  username: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<postElement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, "userPosts"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const postings = [] as any;
          querySnapshot.forEach((doc) => {
              postings.push({id: doc.id, ...doc.data()});
          });
          setPosts(postings);
          setLoading(false);
      })
  }, [])

  return (
    <div>
      {loading ? (
        <div className="flex items-center space-x-2">
          <p className="font-semibold">Loading posts...</p>
          <div className="loading loading-s"></div>
        </div>
      ) : posts.length > 0 ? (
        posts.map((post) => <Post {...post} key={post.id} />)
      ) : (
        <div>
          <h5 className="font-semibold">Oops, all the posts have left the building.</h5>
        </div>
      )}
    </div>
  );
};

export default Posts;
