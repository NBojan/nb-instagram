"use client"

import { useGlobalContext } from "@/app/context/context";
import Image from "next/image";

const Profile = () => {
    const { user, signOut } = useGlobalContext();

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <Image
            src={user.userImg}
            alt="User"
            width={64}
            height={64}
            className="min-w-[64px] w-[64px] h-[64px] rounded-full p-[1.5px] bg-white border border-gray-300 object-cover"
          />
          <div className="space-y-1">
            <h5 className="font-semibold text-sm max-w-[160px] truncate">{user.username}</h5>
            <p className="text-xs text-gray-400">Welcome to Instagram!</p>
          </div>
        </div>

        <button
          type="button"
          className="btn text-xs tracking-wider text-blue-500 hover:underline"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    );
}
 
export default Profile;