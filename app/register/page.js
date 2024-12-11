"use client"

import { useState } from "react";

export default function Home()
{
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>
	  {
	      e.preventDefault();
	      console.log(fullName, username, password);
	  }


    return (


<form className="w-full max-w-sm" onSubmit={handleSubmit}>
  <div className="md:flex md:items-center mb-3">
    <div className="md:w-1/3">
      <label className="block text-violet-300 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
        Full Name
      </label>
    </div>
    <div className="md:w-2/3">
	    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-800" name="inline-full-name" type="text" value={fullName} onChange={(e) => {setFullName(e.target.value)}}/>
    </div>
  </div>

  <div className="md:flex md:items-center mb-3">
    <div className="md:w-1/3">
      <label className="block text-violet-300 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-username">
        Username
      </label>
    </div>
    <div className="md:w-2/3">
	    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-800" name="inline-username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
    </div>
  </div>

  <div className="md:flex md:items-center mb-3">
    <div className="md:w-1/3">
      <label className="block text-violet-300 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
        Password
      </label>
    </div>
    <div className="md:w-2/3">
	    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-800" name="inline-password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
    </div>
  </div>
  <div className="md:flex md:items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <input className="shadow bg-slate-700 hover:bg-slate-600 focus:shadow-outline focus:outline-none text-violet-300 font-bold py-2 px-4 rounded" type="submit" value="Sign Up"/>
    </div>
  </div>
</form>


    );


}
