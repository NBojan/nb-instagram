import Image from "next/image";
import { postElement } from "../feed/Posts";

interface userElement {
    firstName: string;
    lastName: string;
    userImg: string;
    username: string;
}

const ProfileHeader = ({
  userData,
  userPosts,
}: {
  userData: userElement;
  userPosts: postElement[];
}) => {
  return (
    <div className="border-b border-gray-300 mb-4 pt-4 pb-8">
        <div className="flex justify-center items-center space-x-4 sm:space-x-6">
          <Image src={userData.userImg} alt="userImg" width={96} height={96} className="w-[80px] h-[80px] xs:w-[96px] xs:h-[96px] circle-effect" />

          <div>
            <p className="font-semibold text-[16px] xs:text-[18px] md:text-[20px] tracking-wide">{userData.username}</p>
            <p className="text-[14px] xs:text-[16px] text-gray-700">{userData.firstName} {userData.lastName}</p>
            <p className="text-[14px] xs:text-[16px]">{userPosts.length} {userPosts.length === 1 ? "post" : "posts" }</p>
          </div>
        </div>
    </div>
  )
};
 
export default ProfileHeader;