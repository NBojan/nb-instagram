import Link from "next/link";

const NotFound = () => {
    return (
        <section className="container mx-auto lg:max-w-[1024px] text-center">
            <h4 className="mb-8">There was a problem.</h4>
            <p>We could not find the post you were looking for.</p>
            <p>Go back to the <Link href="/" className="text-red-500">Dashboard</Link></p>
        </section>
    );
}
 
export default NotFound;