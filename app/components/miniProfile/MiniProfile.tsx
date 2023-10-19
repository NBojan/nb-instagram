import { Profile, Suggestions } from "../index";

const MiniProfile = () => {
    return (  
        <div className="hidden md:block w-[300px] min-w-[300px] mt-5">
            <div className="fixed md:block w-[300px] min-w-[300px]">
                <Profile />
                <Suggestions />
            </div>
        </div>
    );
}
 
export default MiniProfile;