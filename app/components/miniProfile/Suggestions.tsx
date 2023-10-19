import { Suggestion } from "..";
import { mockUsers } from "@/app/utils/mockData";

const Suggestions = () => {
    return (  
        <div className="mt-5">
            <div className="flex items-center justify-between mb-5 text-sm">
                <p className="text-gray-400 tracking-wide">Suggestions for you</p>
                <button type="button" className="btn tracking-wide hover:underline">See all</button>
            </div>

            {mockUsers.slice(0,5).map((user) => <Suggestion key={user.id} {...user} />)}
        </div>
    );
}
 
export default Suggestions;