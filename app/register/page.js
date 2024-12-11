"use client"

import { useState } from "react";
import Form from "next/form";
import { registerUser } from "./register.js";
import { useRouter } from "next/navigation";

export default function Home()
{
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) =>
	  {
	      setErrorText("");

	      // check if all fields are filled
	      if (!fullName || !username || !password)
	      {
		  setErrorText("Please fill in all of the fields.");
		  return;
	      }


	      let data = await registerUser(fullName, username, password);

	      if (data.worked === true)
	      {

		  router.push({pathname: "/login", query: {username: username, password: password} }, "/login");
		  return;
	      }

	      setErrorText(data.errorText);

	  }


    return (
	<>
	<h1 className="page-header">Register</h1>
	<Form action={handleSubmit} className="mx-auto max-w-md">
	  <div className="mb-3">
	    <label className="" htmlFor="fullName">Full Name</label><br/>
	    <input className="rounded text-gray-800 w-full" name="fullName" type="text" value={fullName} onChange={(e) => {setFullName(e.target.value)}} /><br/>
	  </div>
	  <div className="mb-3">
	    <label className="" htmlFor="username">Username</label><br/>
	    <input className="rounded text-gray-800 w-full" name="username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} /><br/>
	  </div>
	  <div className="mb-3">
	    <label className="" htmlFor="password">Password</label><br/>
	    <input className="rounded text-gray-800 w-full" name="password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} /><br/>
	  </div>
	  <p className="text-red-500 mb-3">{errorText}</p>
	  <button type="submit" className="button-style">Register</button>
	</Form>
	</>
    );


}
