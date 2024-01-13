import Image from "next/image";
import { likesElement } from "./PostInteract";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const LikesPop = ({
  likes,
  setOpenLikes,
}: {
  likes: likesElement[];
  setOpenLikes: Dispatch<SetStateAction<boolean>>;
}) => {
  const closeLikes = () => setOpenLikes(false);
  const handleClose = (e: any) => {
    if (e.target.id === "closeLikes") return closeLikes();
  };

  return (
    <aside
      className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-20"
      onClick={handleClose}
      id="closeLikes"
    >
      <div className="w-[90%] max-w-[520px] px-4 py-8 bg-white rounded border-2 border-gray-300 z-20 relative">
       
        <button
          type="button"
          className="absolute right-4 top-4 text-2xl hover:scale-125 hover:text-red-500 transition"
          onClick={closeLikes}
        >
          <AiOutlineCloseCircle />
        </button>

        {likes.map((like) => (
          <div key={like.id} className="flex items-center space-x-2 mb-3">
            <Image
              src={like.userImg}
              alt={like.username}
              width={24}
              height={24}
              className="comment-img-resp rounded-full object-cover"
            />
            <h5 className="font-bold text-resp">{like.username}</h5>
          </div>
        ))}

      </div>
    </aside>
  );
};

export default LikesPop;
