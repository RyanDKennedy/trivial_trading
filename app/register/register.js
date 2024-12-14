"use server"

import { redirect } from "next/navigation";
import Database from "better-sqlite3";

const g_db = new Database("test.db", { verbose: (a) => console.log("db exec: "+a)});
// g_db.prepare('CREATE TABLE users (name text, username text, password text);').run();

export async function registerUser(fullName, username, password)
{
    let errorText = "Failed to register user.";

    let worked = true;

    try
    {
	// FIXME: store password as hash with salt
	g_db.prepare('INSERT INTO users (name, username, password) VALUES (?, ?, ?);').run(fullName, username, password);
	// console.log("Registered User {name: "+fullName+", username: "+username+", password: "+password+"}");
    }
    catch (err)
    {
	worked = false;
	console.log("ERROR: ", err);
    }

    if (worked === true)
    {
	redirect("/login");
    }


    return {errorText};

}

