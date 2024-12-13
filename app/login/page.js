"use client"

import { useState } from "react";
import Form from "next/form";
import { login } from "./login.js";

export default function Home(props)
{
    const [errorText, setErrorText] = useState("");
    
    const handleSubmit = async (formData) =>
	  {
	      setErrorText("");

	      const username = formData.get("username");
	      const password = formData.get("password");

	      let data = await login(username, password);

	      if (data.success == false)
	      {	      
		  setErrorText(data.errorText);
	      }
	  }


    return (
	<>
	<h1 className="page-header">Login</h1>
	<Form action={handleSubmit} className="mx-auto max-w-md">
	  <div className="mb-3">
	    <label className="" htmlFor="username">Username</label><br/>
	    <input required autoFocus className="rounded text-gray-800 w-full" name="username" type="text" /><br/>
	  </div>
	  <div className="mb-3">
	    <label className="" htmlFor="password">Password</label><br/>
	    <input required className="rounded text-gray-800 w-full" name="password" type="password" /><br/>
	  </div>
	  <p className="text-red-500 mb-3">{errorText}</p>
	  <button type="submit" className="button-style">Login</button>
	</Form>
	</>
    );


}
