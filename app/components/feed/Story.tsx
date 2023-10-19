import Image from "next/image";

const Story = ({ username, img }: { username: string; img: string }) => {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <Image
        src={img}
        alt="img"
        width={56}
        height={56}
        className="object-cover min-w-[56px] h-[56px] rounded-full border-2 border-red-500 p-[1.5px] group-hover:scale-110 transition-transform"
      />
      <p className="text-xs text-center truncate w-[56px]">{username}</p>
    </div>
  );
};

export default Story;
