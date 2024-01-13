import Image from "next/image";

const PostImage = ({ image }: { image: string }) => {
  return (
    <div className="w-full">
      <Image src={image} alt="postImage" width={1000} height={1000} className="w-full h-full max-h-[500px] sm:max-h-[600px] lg:max-h-[660px] object-fill xs:object-contain sm:object-fill lg:object-contain" />
    </div>
  );
};

export default PostImage;
