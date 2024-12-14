
import Link from "next/link";
import { hasSession, getFullName } from "@/app/lib/utils.js";

async function Contents(props)
{
    if (props.hasSession === true)
    {
	const fullName = await getFullName();

	return (
		<>
		<p>Welcome {fullName}!</p>
	        <Link href="/logout" className="button-style">Logout</Link>
		</>
	);
    }
    else
    {
	return (
		<>
		<p>Select an option to get started.</p>
		<div className="grid grid-cols-2 gap-x-2">
	          <Link href="/register" className="button-style">Register</Link>
	          <Link href="/login" className="button-style">Login</Link>
		</div>
		</>
	);
    }

}


export default async function Page()
{


    return (
	    <>
	    <h1 className="page-header">Homepage</h1>
	    <div className="space-x-2 mt-10 flex flex-col gap-3 justify-center items-center">

	    <Contents hasSession={await hasSession()} />

	    </div>
	    </>
    );
}
