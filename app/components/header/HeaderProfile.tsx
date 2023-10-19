import Link from "next/link";
import { HeaderUser } from "../index";
import { AiFillHome } from "react-icons/ai";

const HeaderProfile = () => {
  return (
    <div className="flex items-center space-x-4 sm:space-x-6">
      <Link
        href="/"
        className="hidden sm:block text-xl sm:text-2xl hover:scale-125 transition-transform"
      >
        <AiFillHome />
      </Link>

      <HeaderUser />
    </div>
  );
};

export default HeaderProfile;
