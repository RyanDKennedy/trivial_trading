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
    const data = g_db.prepare("SELECT COUNT(*) as num FROM users WHERE id = ?;").get(userId)["num"];

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

//    const query = "SELECT stock_purchases.id as purchase_id, users.name as user_name, stocks.name as stock_name, stock_entrys.price as stock_price, stock_purchases.shares as stock_shares, DATETIME(ROUND(stock_purchases.date/1000), 'unixepoch') as date FROM users JOIN stock_purchases ON stock_purchases.user_id = users.id JOIN stock_entrys ON stock_purchases.stock_entry_id = stock_entrys.id JOIN stocks ON stocks.id = stock_entrys.stock_id WHERE users.id = ? ORDER BY date DESC;";

    const query = "SELECT stock_purchases.id as purchase_id, users.name as user_name, stocks.name as stock_name, stocks.abbreviation as stock_abbreviation, stock_entrys.price as stock_price, stock_purchases.shares as stock_shares, stock_purchases.date as date FROM users JOIN stock_purchases ON stock_purchases.user_id = users.id JOIN stock_entrys ON stock_purchases.stock_entry_id = stock_entrys.id JOIN stocks ON stocks.id = stock_entrys.stock_id WHERE users.id = ? ORDER BY date DESC;";

    const data =  g_db.prepare(query).all(userId);

    return data;
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
