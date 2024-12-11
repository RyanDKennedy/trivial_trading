"use client"

import { useState } from "react";
import Form from "next/form";

export default function Home()
{
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    const handleSubmit = (e) =>
	  {
	      setErrorText("");

	      // check if all fields are filled
	      if (!fullName || !username || !password)
	      {
		  setErrorText("Please fill in all of the fields.");
	      }

	      console.log(fullName, username, password);
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
	      <input type="submit" className="bg-blue-800 rounded p-1" />

	    </Form>

	</>
    );


}
