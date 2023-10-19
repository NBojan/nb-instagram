import Image from "next/image";

const Suggestion = ({
  username,
  job,
  img,
}: {
  username: string;
  job: string;
  img: string;
}) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Image src={img} alt="user" width={40} height={40} className="min-w-[40px] w-[40px] h-[40px] p-[1.5px] bg-white border border-gray-300 rounded-full" />
        <div className="space-y-1">
            <h5 className="font-semibold text-xs max-w-[200px] truncate">{username}</h5>
            <p className="text-xs text-gray-400 max-w-[200px] truncate">{job}</p>
        </div>
      </div>

      <button
          type="button"
          className="btn text-xs tracking-wider text-blue-500 hover:underline"
        >
          Follow
        </button>
    </div>
  );
};

export default Suggestion;
