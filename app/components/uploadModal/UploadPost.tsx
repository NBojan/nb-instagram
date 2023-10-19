"use client"
import { useState } from "react";
import { storage, db } from "@/firebase";
import { SelectedFile } from "../index";
import { AiOutlineCamera } from "react-icons/ai";
import { useGlobalContext } from "@/app/context/context";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";


const UploadPost = () => {
    const { user, closeSidebar } = useGlobalContext();
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<null | string>(null);

    const getImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if(e.target.files && e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (readerEvent) => {
                if(readerEvent.target){
                    setSelectedFile(readerEvent.target.result as string);
                }
            } 
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(!selectedFile || loading) return;
      else {
        setLoading(true);
        const imageId = new Date().toString();
        const storageRef = ref(storage, `postImages/${user.email}/${imageId}`);
  
        await uploadString(storageRef, selectedFile, "data_url").then(
          async (snapshot) => {
            const imageUrl = await getDownloadURL(storageRef);
            const docRef = await addDoc(collection(db, "userPosts"), {
              caption: caption.trim(),
              image: imageUrl,
              username: user.username,
              userImg: user.userImg,
              timestamp: Timestamp.fromDate(new Date())
            });
          }
        );
  
        setCaption("");
        setSelectedFile(null);
        setLoading(false);
        closeSidebar();
      }
    };

    return (
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        {selectedFile ? (
          <SelectedFile
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            profilePic={false}
          />
        ) : (
          <label
            htmlFor="uploadPicture"
            className="flex items-center justify-center border border-red-500 text-red-500 bg-red-200 h-[56px] w-[56px] rounded-full text-4xl cursor-pointer shadow-md hover:text-red-200 hover:bg-red-500 transition-colors"
          >
            <AiOutlineCamera />
          </label>
        )}

        <input
          type="file"
          id="uploadPicture"
          className="hidden"
          onChange={getImage}
          required
        />

        <input
          type="text"
          name="caption"
          value={caption}
          className="w-full rounded-md mt-4 p-2 tracking-wide border border-gray-400 focus:border-black outline-1 outline-black focus:outline"
          onChange={e => setCaption(e.target.value)}
          placeholder="Add a caption. (optional)"
          maxLength={1000}
        />

        <button
          type="submit"
          className="btn btn-m btn-prim capitalize w-full mt-6 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed !transition-colors"
          disabled={!selectedFile || loading}
        >
          {loading ? (
            <div className="loading w-[22.25px] h-[22.25px] mx-auto"></div>
          ) : (
            "upload post"
          )}
        </button>
      </form>
    );
}
 
export default UploadPost;