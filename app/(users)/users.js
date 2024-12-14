"use server"

import { redirect } from "next/navigation";
import Database from "better-sqlite3";
import { createSession, deleteSession } from "@/app/lib/session.js";

const g_db = new Database(process.env.DB_USERS_PATH, {});
// g_db.prepare('CREATE TABLE users (name text, username text, password text);').run();

export async function registerUser(fullName, username, password)
{
    let errorText = "Failed to register user.";

    let worked = true;

    try
    {
	// FIXME: store password as hash with salt
	g_db.prepare('INSERT INTO users (name, username, password) VALUES (?, ?, ?);').run(fullName, username, password);
    }
    catch (err)
    {
	worked = false;
    }

    if (worked === true)
    {
	redirect("/login");
    }


    return {errorText};

}

export async function login(username, password)
{
    let errorText = "Failed to login";

    const userRecord = g_db.prepare("SELECT rowid, * FROM users WHERE username=? AND password=?;").get(username, password);

    if (userRecord)
    {
	// TODO: LOGIN COOKIE STUFF
	await createSession(userRecord.rowid, userRecord.name);
	redirect("/");
    }

    if (!userRecord)
    {
	errorText = "Username and password are incorrect.";
    }

    return {errorText};
}

export async function logout()
{
    await deleteSession();
}
