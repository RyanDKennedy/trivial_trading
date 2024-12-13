"use server"

import { redirect } from "next/navigation";


export async function registerUser(fullName, username, password)
{
    let errorText = "Failed to register user.";

    let worked = true;

    try
    {
	// TODO: check db
	console.log("fake checking db");

    }
    catch (err)
    {
	worked = false;
	console.log("ERROR");
    }

    if (worked === true)
    {
	redirect("/login");
    }
    else
    {

	return {errorText};
    }
}
