"use client";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { useGlobalContext } from "@/app/context/context";

const PersonalStory = () => {
  const { user } = useGlobalContext();
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="relative">
        <Image
          src={user.userImg}
          alt="img"
          width={56}
          height={56}
          className="object-cover min-w-[56px] h-[56px] rounded-full border-2 border-red-500 p-[1.5px] group-hover:scale-110 transition-transform"
        />
        <div className="absolute flex items-center justify-center top-0 left-0 min-w-[56px] h-[56px] rounded-full text-white text-lg group-hover:bg-white group-hover:bg-opacity-30 transition">
          <AiOutlinePlus />
        </div>
      </div>
      <p className="text-xs text-center truncate w-[56px]">{user.username}</p>
    </div>
  );
};

export default PersonalStory;
