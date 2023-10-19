import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { commentElement } from "./PostComments";

const Comment = ({ comment, timestamp, userImg, username }: commentElement) => {
  return (
    <div className="flex space-x-2 mb-2">
      <Image
        src={userImg}
        alt="User"
        width={24}
        height={24}
        className="comment-img-resp rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="flex justify-between flex-col xs:flex-row xs:items-center xs:space-x-1">
          <p className="text-resp font-semibold truncate leading-none">
            {username}
          </p>
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {formatDistanceToNow(timestamp.toDate())}
          </p>
        </div>

        <p className="text-resp text-gray-500">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
