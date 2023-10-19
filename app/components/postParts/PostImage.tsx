import Image from "next/image";

const PostImage = ({ image }: { image: string }) => {
  return (
    <div className="">
      <Image src={image} alt="postImage" width={1000} height={1000} className="w-full max-h-[500px] sm:max-h-[600px] lg:max-h-[660px] lg:object-contain" />
    </div>
  );
};

export default PostImage;
