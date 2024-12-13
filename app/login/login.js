"use server"

import { redirect } from "next/navigation";
import Database from "better-sqlite3";

const g_db = new Database("test.db", { verbose: (a) => console.log("db exec: "+a)});

export async function login(username, password)
{
    let errorText = "Failed to login";

    const userRecord = g_db.prepare("SELECT rowid, * FROM users WHERE username=? AND password=?;").get(username, password);

    console.log("userRecord: ", userRecord);

    if (userRecord)
    {
	// TODO: LOGIN COOKIE STUFF
	redirect("/");
    }


    if (!userRecord)
    {
	errorText = "Username and password are incorrect.";
    }

    return {errorText};
}
