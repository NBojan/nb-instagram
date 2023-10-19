import { MiniProfile, Posts, Stories } from "./components";

const Home = () => {
  return (  
    <section className="container mx-auto lg:max-w-[1024px] flex justify-center">
      <div className="w-full md:max-w-[436px] lg:max-w-[692px] md:mr-8">
        <Stories />
        <Posts />
      </div>

      <MiniProfile />
    </section>
  );
}
 
export default Home;