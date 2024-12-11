import Link from "next/link"

export default function Home()
{

    return (
	    <>
	    <h1 className="page-header">Homepage</h1>
	    <div className="space-x-2 mt-10 flex flex-col gap-3 justify-center items-center">
	      <p>Select an option to get started.</p>
	      <div className="grid grid-cols-2 gap-x-2">
	        <Link href="/register" className="button-style">Register</Link>
	        <Link href="/login" className="button-style">Login</Link>
	      </div>
	    </div>
	    </>
    );
}
