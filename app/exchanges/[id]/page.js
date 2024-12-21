"use server"

import { getStockMarketFromId, searchStocks } from "@/app/lib/utils.js";
import { ExchangeStocks } from "@/app/exchanges/[id]/display.js";
import Link from "next/link";

export default async function Page(props)
{
    const { id } = await props.params;

    const pageSize = 20;

    const market = await getStockMarketFromId(id);

    const startingStocks = await searchStocks(id, "", pageSize, 0);

    return (
	    <>
	    <h1 className="page-header">Browse {market.abbreviation} Stocks</h1>

	    <ExchangeStocks exchangeName={market.name} exchangeAbbreviation={market.abbreviation} exchangeId={market.id} startingStocks={startingStocks} pageSize={pageSize}/>

	    <div className="grid grid-flow-col justify-stretch mx-3 py-4">
	    <Link href="#" className="button-style">Top</Link>
	    </div>

	    </>
    )

}
