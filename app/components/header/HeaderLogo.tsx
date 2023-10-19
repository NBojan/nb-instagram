import Link from "next/link";
import Image from "next/image";
import { logoImg } from "@/app/utils/helpingHand";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <Image src={logoImg} width={96} height={96} alt="Instagram" />
    </Link>
  );
};

export default HeaderLogo;
