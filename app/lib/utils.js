"use server"

import { cookies } from "next/headers";
import Database from "better-sqlite3";
import { getSession } from "@/app/lib/session.js";

const g_db = new Database(process.env.DB_PATH, {});

export async function getFullName()
{
    const userId = await getUserId();
    
    if (!userId)
	return "";
    
    const name = g_db.prepare("SELECT name FROM users WHERE id = ?;").get(userId)?.name;

    return name;

}

export async function doesRecordExistFromId(userId)
{
    const data = g_db.prepare("SELECT COUNT(*) FROM users WHERE id = ?;").get(userId)["COUNT(*)"];

    console.log(data);

    if (data === 0)
	return false;


    return true;
}

export async function getFullNameFromId(userId)
{
    const name = g_db.prepare("SELECT name FROM users WHERE id = ?;").get(userId)?.name;

    return name;    
}

export async function hasSession()
{
    const session = await getSession();

    if (session)
	return true;
    else
	return false;
}

export async function getUserId()
{
    const session = await getSession();
    return session?.userId;
}
