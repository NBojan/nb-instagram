import { db } from "@/firebase";
import { ProfileHeader, ProfilePosts } from "@/app/components";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const getUser = async (username:string) => {
    const userExists = [] as any;
    const userQuery = query(collection(db, "users"), where('username', "==", username));
    const usersSnapshot = await getDocs(userQuery);
    usersSnapshot.forEach((doc) => userExists.push({id: doc.id, ...doc.data()}));
    if(userExists.length < 1) throw new Error('User Not Found');
    else {
      const userData = userExists[0];
      const userPosts = [] as any;
      const postsQuery = query(collection(db, "userPosts"), where('username', "==", userData.username), orderBy('timestamp', "desc"));
      const userPostsSnapshot = await getDocs(postsQuery);
      userPostsSnapshot.forEach((doc) => userPosts.push({id: doc.id, ...doc.data()}));

      return { userData, userPosts }
    }
}

const Profile = async ({ params }: { params: { username: string } }) => {
  const { userData, userPosts } = await getUser(params.username);

  return (
    <section className="container mx-auto lg:max-w-[1024px]">
        <ProfileHeader userData={userData} userPosts={userPosts} />
        <ProfilePosts userPosts={userPosts} />
    </section>
  );
};

export default Profile;
