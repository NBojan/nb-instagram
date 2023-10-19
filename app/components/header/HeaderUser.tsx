"use client"
import Image from "next/image";
import { useState } from "react";
import { HeaderOptions } from "../index";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useGlobalContext } from "@/app/context/context";

const HeaderUser = () => {
    const { user, setSidebar } = useGlobalContext();
    const [showOptions, setShowOptions] = useState(false);
    
    const toggleOptions = () => setShowOptions(!showOptions);
    const openSidebarPost = () => setSidebar({openSide: true, uploadProfilePic: false});

    return (
        <div className="flex items-center space-x-4">
            <button type="button" className="inline-block text-xl sm:text-2xl hover:scale-125 transition-transform" onClick={openSidebarPost}>
                <AiOutlinePlusCircle />
            </button>
            

            <div>
                <button type="button" className="flex rounded-full border border-transparent border-gray-400 hover:border-red-500 transition-colors" onClick={toggleOptions}>
                    <Image src={user.userImg} alt="userImg" width={40} height={40} className="min-w-[40px] h-[40px] rounded-full object-cover" />
                </button>
                
                {showOptions && <HeaderOptions toggleOptions={toggleOptions} />}
            </div>

        </div>

        
    );
}
 
export default HeaderUser;