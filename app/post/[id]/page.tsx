import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { postElement } from "@/app/components/feed/Posts";
import { PostCaption, PostComments, PostHeader, PostImage, PostInteract, UploadComment } from "@/app/components";

const getPost = async (id:string) => {
    const postSnap = await getDoc(doc(db, "userPosts", id));
    if(!postSnap.exists()) throw new Error("Post does not exist");
    else return {
        id: postSnap.id,
        ...postSnap.data()
    } as postElement
}

const SinglePost = async ({ params }: { params: { id: string } }) => {
  const postData = await getPost(params.id);

  return (
    <section className="container mx-auto lg:max-w-[1024px]">
        <article className="flex border border-gray-200 rounded mb-6 flex-col sm:flex-row">
            <PostImage image={postData.image} />

            <div className="w-full flex flex-col justify-between bg-white">
                <div>
                  <PostHeader userImg={postData.userImg} username={postData.username} />
                  <PostCaption username={postData.username} caption={postData.caption} />
                  <PostInteract postId={postData.id} />
                </div>

                <div>
                  <PostComments postId={postData.id} postPage={true} />
                  <UploadComment postId={postData.id} />
                </div>
            </div>
        </article>
    </section>
  )
};

export default SinglePost;
