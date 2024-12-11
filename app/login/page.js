"use client"

import { useState } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";

export default function Home()
{
    console.log(props);

    const router = useRouter();

    const [username, setUsername] = useState(router.query.username);
    const [password, setPassword] = useState(router.query.password);
    const [errorText, setErrorText] = useState("");

    const handleSubmit = (e) =>
	  {
	      setErrorText("");

	      // check if all fields are filled
	      if (!username || !password)
	      {
		  setErrorText("Please fill in all of the fields.");
		  return;
	      }

	      console.log(username, password);
	  }


    return (
	<>
	<h1 className="page-header">Login</h1>
	<Form action={handleSubmit} className="mx-auto max-w-md">
	  <div className="mb-3">
	    <label className="" htmlFor="username">Username</label><br/>
	    <input className="rounded text-gray-800 w-full" name="username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} /><br/>
	  </div>
	  <div className="mb-3">
	    <label className="" htmlFor="password">Password</label><br/>
	    <input className="rounded text-gray-800 w-full" name="password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} /><br/>
	  </div>
	  <p className="text-red-500 mb-3">{errorText}</p>
	  <button type="submit" className="button-style">Login</button>
	</Form>
	</>
    );


}
