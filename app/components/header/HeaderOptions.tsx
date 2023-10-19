"use client"
import { useGlobalContext } from "@/app/context/context";

const HeaderOptions = ({ toggleOptions }:{ toggleOptions: () => void }) => {
    const { setSidebar, signOut } = useGlobalContext();

    const openSidebarProfile = () => {
        setSidebar({openSide: true, uploadProfilePic: true});
        toggleOptions();
    };

    return (  
        <div className="absolute bg-white border border-gray-400 rounded text-sm right-0 top-[85%]">
            <button type="button" className="option-btn transition-shadow" onClick={openSidebarProfile}>Update profile picture.</button>
            <button type="button" className="option-btn transition-shadow" onClick={signOut}>Log out.</button>
        </div>
    );
}
 
export default HeaderOptions;