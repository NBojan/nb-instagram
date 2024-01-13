import { postElement } from "./Posts";
import { PostHeader, PostImage, PostCaption, PostInteract, PostComments, UploadComment } from "..";

const Post = ({ id, caption, image, userImg, username }: postElement) => {
  return (
    <article className="bg-white border border-gray-200 rounded mb-6">
      <PostHeader userImg={userImg} username={username} />
      <PostImage image={image} />
      <PostInteract postId={id} />
      <PostCaption username={username} caption={caption} />
      <PostComments postId={id} postPage={false} />
      <UploadComment postId={id} />
    </article>
  );
};

export default Post;
