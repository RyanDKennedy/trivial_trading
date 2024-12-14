"use client"

import { useState } from "react";
import Form from "next/form";
import { registerUser } from "../users.js";


export default function Page()
{
    const [showPassword, setShowPassword] = useState(false);
    const [errorText, setErrorText] = useState("");

    const handleSubmit = async (formData) =>
	  {
	      setErrorText("");

	      const fullName = formData.get("fullName");
	      const username = formData.get("username");
	      const password = formData.get("password");

	      let data = await registerUser(fullName, username, password);

	      setErrorText(data.errorText);
	  }

    return (
	<>
	<h1 className="page-header">Register</h1>
	<Form action={handleSubmit} className="mx-auto max-w-md">
	  <div className="mb-3">
	    <label className="" htmlFor="fullName">Full Name</label><br/>
	    <input required className="rounded text-gray-800 w-full" name="fullName" type="text" /><br/>
	  </div>
	  <div className="mb-3">
	    <label className="" htmlFor="username">Username</label><br/>
	    <input required className="rounded text-gray-800 w-full" name="username" type="text" /><br/>
	  </div>
	  <div className="mb-3">
	    <label className="" htmlFor="password">Password</label><br/>
	    <input required className="rounded text-gray-800 w-full" name="password" type={showPassword? "text" : "password"} /><br/>
	  </div>
	  <p className="text-red-500 mb-3">{errorText}</p>
	  <button type="submit" className="button-style">Register</button>
	  <button type="button" className="button-style ml-3" onClick={() => setShowPassword(!showPassword)}>Toggle Show Password</button>
	</Form>
	</>
    );


}
