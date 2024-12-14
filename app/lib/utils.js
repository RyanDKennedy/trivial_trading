"use server"

import { cookies } from "next/headers";
import Database from "better-sqlite3";
import { getUserId } from "@/app/lib/session.js";

const g_db = new Database(process.env.DB_USERS_PATH, {});

export async function getFullName()
{
    const userId = await getUserId();
    
    if (!userId)
	return "";
    
    const { name } = g_db.prepare("SELECT name FROM users WHERE rowid = ?;").get(userId);

    return name;

}

export async function hasSession()
{
    const userId = await getUserId();

    if (userId)
	return true;
    else
	return false;
}
