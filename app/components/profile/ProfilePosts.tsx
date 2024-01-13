import { ProfilePost } from "..";
import { postElement } from "../feed/Posts";

const ProfilePosts = ({ userPosts }: { userPosts: postElement[] }) => {
    return (
      <div>
        {userPosts.length > 0 ? (
            <div className="flex justify-between flex-wrap flex-col xs:flex-row">
                {userPosts.map(post => <ProfilePost key={post.id} post={post} />)}
            </div>
        ) : (
          <h4 className="text-center">There are no posts to show...</h4>
        )}
      </div>
    );
}
 
export default ProfilePosts;