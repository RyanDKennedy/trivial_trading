import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from "next/link";
import { hasSession, getFullName } from "@/app/lib/utils.js";
import { logout } from "@/app/(users)/users.js";

export default async function Navbar(props)
{
    
    const navbarElementClasses = "hover:bg-gray-700 hover:text-yellow-400 p-2 rounded";

    if (props.hasSession)
    {
	const handleSubmit = async (data) =>
	      {
		  "use server"

		  await logout();
		  revalidatePath("/");
		  redirect("/");
	      }

	const fullName = await getFullName();

	return (
		<nav className="top-0 bg-gray-800 space-x-3 p-3 flex flex-row flex-nowrap justify-between items-center">
		<div className="flex gap-x-3 items-center">
		  <Link href="/" className={navbarElementClasses}>Trivial Trading</Link>
		</div>

		<div className="flex gap-x-3 items-center">
		  <button onClick={handleSubmit} className="button-style">Logout</button>
		  <Link href="/profile" className={navbarElementClasses}>{fullName}</Link>
		</div>

		</nav>    
	);

    }
    else
    {
	return (
		<nav className="top-0 bg-gray-800 space-x-3 p-3 flex flex-row flex-nowrap justify-between items-center">
		<div className="flex gap-x-3 items-center">
		  <Link href="/" className={navbarElementClasses}>Trivial Trading</Link>
		</div>

	        <div className="flex gap-x-3 items-center">
	          <Link href="/register" className={navbarElementClasses}>Register</Link>
	          <Link href="/login" className={navbarElementClasses}>Login</Link>
		</div>
		</nav>    
	);
	
    }






}
