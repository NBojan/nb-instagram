import { PersonalStory, Story } from "../index";
import { mockUsers } from "@/app/utils/mockData";

const Stories = () => {
    return (  
        <div className="bg-white post-padding-x py-6 border border-gray-200 flex items-center space-x-3 overflow-x-scroll scrollbar-thin mb-8">
            <PersonalStory />
            {mockUsers.map(user => <Story key={user.id} {...user} />)}
        </div>
    );
}
 
export default Stories;