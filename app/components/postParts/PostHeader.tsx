import Link from "next/link";
import Image from "next/image";

const PostHeader = ({ userImg, username }: { userImg: string, username: string }) => {
  return (
    <div className="flex items-center space-x-2 post-padding-x py-2 xs:py-3 lg:py-4">
      <Image
        src={userImg}
        alt="User"
        width={48}
        height={48}
        className="min-w-[48px] w-[48px] h-[48px] p-[1px] rounded-full bg-white border border-gray-300 object-cover"
      />
      
      <h5 className="font-bold text-resp truncate max-w-[300px]">
        <Link href={`/profile/${username}`}>
          {username}
        </Link>
      </h5>
    </div>
  );
};

export default PostHeader;
