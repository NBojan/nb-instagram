import Image from "next/image";
import { LogForm } from "../../components";
import { logImg } from "@/app/utils/helpingHand";

const LogPage = () => {
    return (  
        <section className="p-4">
            <div className="min-h-screen flex items-center justify-center flex-col">
                <Image src={logImg} width={200} height={200} alt="Instagram" className="w-[180px] sm:w-[200px]" />
                <LogForm />
            </div>
        </section>
    );
}
 
export default LogPage;