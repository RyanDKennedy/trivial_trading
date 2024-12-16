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

export async function doesUserExistFromId(userId)
{
    const data = g_db.prepare("SELECT COUNT(*) FROM users WHERE id = ?;").get(userId)["COUNT(*)"];

    if (data === 0)
	return false;

    return true;
}

export async function getFullNameFromId(userId)
{
    const name = g_db.prepare("SELECT name FROM users WHERE id = ?;").get(userId)?.name;

    return name;    
}

export async function getStockPurchasesFromId(userId)
{

    return g_db.prepare("SELECT * FROM stock_purchases WHERE user_id=?;").all(userId);

/*
    const result;

    const entrys;
    for (let i = 0; i < purchases.length; ++i)
    {
	const entrys = g_db.prepare("SELECT price, stock_id FROM stock_entrys WHERE id=;").all(purchases[i].stock_entry_id);

	result[i].price = entrys
    }
*/

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
