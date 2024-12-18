"use server"

import { redirect } from "next/navigation";
import Database from "better-sqlite3";
import { createSession, deleteSession } from "@/app/lib/session.js";
import { revalidatePath } from 'next/cache';
import bcrypt from "bcrypt"

const g_db = new Database(process.env.DB_PATH, {});

export async function registerUser(fullName, username, password)
{
    let errorText = "Failed to register user.";
    let worked = true;

    try
    {
	const prevRecord = g_db.prepare("SELECT id FROM users WHERE username = ?;").get(username);

	if (prevRecord)
	{
	    errorText = "Username is already taken.";
	    return {errorText};
	}


	const hashedPassword = await bcrypt.hash(password, 10);

	const roleUserId = g_db.prepare("SELECT id FROM role WHERE name=?;").get("user");

	g_db.prepare('INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?);').run(fullName, username, hashedPassword, roleUserId.id);
    }
    catch (err)
    {
	worked=false;
	console.log("Failed to register user: "+err);
	return {errorText};
    }

    if (worked === true)
    {
	redirect("/login");	
    }

}

export async function login(username, password)
{
    let errorText = "Failed to login";

    const userRecord = g_db.prepare("SELECT * FROM users WHERE username=?;").get(username);

    if (!userRecord)
    {
	errorText = "Incorrect username or password.";
	return {errorText};
    }

    const passwordMatches = await bcrypt.compare(password, userRecord?.password);

    if (!passwordMatches)
    {
	errorText = "Incorrect username or password.";
	return {errorText};
    }

    const roleName = g_db.prepare("SELECT name FROM role WHERE id=?;").get(userRecord.role);

    await createSession(userRecord.id, roleName.name);
    redirect("/home");

}

export async function logout()
{
    await deleteSession();
}
