"use server"

import { redirect } from "next/navigation";
import Database from "better-sqlite3";
import { createSession, deleteSession } from "@/app/lib/session.js";
import { revalidatePath } from 'next/cache';
import bcrypt from "bcrypt"


const g_db = new Database(process.env.DB_USERS_PATH, {});
// g_db.prepare('CREATE TABLE users (name text, username text, password text, role text);').run();

export async function registerUser(fullName, username, password)
{
    let errorText = "Failed to register user.";

    let worked = true;

    try
    {
	let hashedPassword = await bcrypt.hash(password, 10);
	g_db.prepare('INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?);').run(fullName, username, hashedPassword, "user");
    }
    catch (err)
    {
	console.log("Failed to register user: "+err);
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

    const userRecord = g_db.prepare("SELECT rowid, * FROM users WHERE username=?;").get(username);

    if (!userRecord)
    {
	errorText = "Incorrect username or password.";
	return {errorText};
    }

    let passwordMatches = await bcrypt.compare(password, userRecord?.password);

    if (!passwordMatches)
    {
	errorText = "Incorrect username or password.";
	return {errorText};
    }

    await createSession(userRecord.rowid, userRecord.role);
    redirect("/");

}

export async function logout()
{
    await deleteSession();
}
