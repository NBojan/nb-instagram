import Image from "next/image";
import { loadingImg } from "../utils/helpingHand";

const AppLoading = () => {
    return (  
        <section className="min-h-screen flex flex-col items-center justify-center p-4">
            <Image src={loadingImg} width={75} height={75} alt="Instagram" className="w-[50px] sm:w-[75px] animate-bounce" />
        </section>
    );
}
 
export default AppLoading;