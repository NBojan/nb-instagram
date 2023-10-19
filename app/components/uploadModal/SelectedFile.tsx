import { SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";

const SelectedFile = ({
  selectedFile,
  setSelectedFile,
  profilePic
}: {
  selectedFile: string;
  setSelectedFile: React.Dispatch<SetStateAction<string | null>>;
  profilePic: boolean
}) => {
  return (
    <div className="group relative">
      <div
        className={`absolute hidden group-hover:flex items-center justify-center bg-white bg-opacity-50 text-2xl cursor-pointer ${profilePic ? "w-[96px] h-[96px] rounded-full" : "w-full h-[300px]"}`}
        onClick={() => setSelectedFile(null)}
      >
        <AiOutlineClose />
      </div>

      <img
        src={selectedFile}
        alt="selectedFile"
        className={`shadow-md ${profilePic ? "w-[96px] h-[96px] object-cover rounded-full" : "w-full h-[300px] object-contain"}`}
      />
    </div>
  );
};
 
export default SelectedFile;