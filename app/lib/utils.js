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

    const query = "SELECT stock_purchases.id as purchase_id, users.name as user_name, stocks.name as stock_name, stocks.abbreviation as stock_abbreviation, stock_entrys.price as stock_price, stock_purchases.shares as stock_shares, stock_purchases.date as date FROM users JOIN stock_purchases ON stock_purchases.user_id = users.id JOIN stock_entrys ON stock_purchases.stock_entry_id = stock_entrys.id JOIN stocks ON stocks.id = stock_entrys.stock_id WHERE users.id = ? ORDER BY date DESC;";

    const data =  g_db.prepare(query).all(userId);

    return data;
}

export async function getStockMarkets()
{
    const query = "SELECT * FROM stock_markets;";
    return g_db.prepare(query).all();
}

export async function getStockMarketFromId(id)
{
    const query = "SELECT * FROM stock_markets WHERE id=?;";
    return g_db.prepare(query).get(id);    
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

export async function searchStocks(marketId, search, limit, offset)
{
    let err = search.includes(";");
    err |= search.includes("'");
    err |= search.includes("\"");

    if (err)
    {
	return [];
    }

    const query = "SELECT * FROM stocks WHERE stock_market_id=? AND (name LIKE '"+search+"%' OR abbreviation LIKE '"+search+"%')LIMIT ? OFFSET ?;";
    return g_db.prepare(query).all(marketId, limit, offset);
}
