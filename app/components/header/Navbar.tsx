import { HeaderLogo, HeaderProfile, HeaderSearch } from "../index";

const Navbar = () => {
    return (  
        <header className="bg-white shadow sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center h-[5rem] relative lg:max-w-[1024px]">
                <HeaderLogo />

                <HeaderSearch />

                <HeaderProfile />
            </nav>
        </header>
    );
}
 
export default Navbar;