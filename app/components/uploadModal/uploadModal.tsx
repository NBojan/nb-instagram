"use client"
import { UploadPost, UploadProfilePic } from "../index";
import { useGlobalContext } from "@/app/context/context";
import { AiOutlineCloseCircle, AiOutlineArrowRight } from "react-icons/ai";

const UploadModal = () => {
    const { openSide, uploadProfilePic, closeSidebar, toggleProfilePic } = useGlobalContext();
    
    const handleClose = (e:any) => {
        if(e.target.id === "closeSidebar") return closeSidebar();
    }

    return (  
        <aside 
            className={`fixed top-0 left-0 h-full w-full bg-black z-10 flex items-center justify-center bg-opacity-20 transition ${openSide ? "visible opacity-100" : "invisible opacity-0"}`}
            onClick={handleClose}
            id="closeSidebar"
        >
            <div className={`w-[90%] max-w-[520px] px-4 py-8 bg-white rounded border-2 border-gray-300 z-10 relative`}>
                <button type="button" className="absolute right-4 top-4 text-2xl hover:scale-125 hover:text-red-500 transition" onClick={closeSidebar}>
                    <AiOutlineCloseCircle />
                </button>

                {uploadProfilePic ? <UploadProfilePic /> : <UploadPost />}

                <div className="flex justify-center mt-4">
                    <p className="flex items-center text-sm cursor-pointer hover:underline tracking-wide space-x-2 text-center" onClick={toggleProfilePic}>
                        <span>
                            <AiOutlineArrowRight />
                        </span>
                        <span>
                            {uploadProfilePic ? 'Upload a new post instead.' : 'Upload your profile picture instead.'}
                        </span>
                    </p>
                </div>
            </div>
        </aside>
    );
}
 
export default UploadModal;