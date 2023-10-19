"use client"
import { useState } from "react";
import { db, storage } from "@/firebase";
import { SelectedFile } from "../index";
import { AiOutlineCamera } from "react-icons/ai";
import { doc, updateDoc } from "firebase/firestore";
import { useGlobalContext } from "@/app/context/context";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const UploadProfilePic = () => {
  const { user, closeSidebar } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<null | string>(null);

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if(e.target.files && e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (readerEvent) => {
            if(readerEvent.target){
                setSelectedFile(readerEvent.target.result as string);
            }
        }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!selectedFile || loading) return;
    else {
      setLoading(true);
      const storageRef = ref(storage, `userImages/${user.email}/image`);

      await uploadString(storageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const imageUrl = await getDownloadURL(storageRef);
          const docRef = doc(db, "users", user.email);
          await updateDoc(docRef, {
            userImg: imageUrl
          }); 
        }
      );

      setSelectedFile(null);
      setLoading(false);
      closeSidebar();
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      {selectedFile ? (
        <SelectedFile selectedFile={selectedFile} setSelectedFile={setSelectedFile} profilePic />
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

      <button
        type="submit"
        className="btn btn-m btn-prim capitalize w-full mt-6 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed !transition-colors"
        disabled={!selectedFile || loading}
      >
        {loading ? <div className="loading w-[22.25px] h-[22.25px] mx-auto"></div> : 'upload profile picture'}
      </button>
    </form>
  );
};

export default UploadProfilePic;
