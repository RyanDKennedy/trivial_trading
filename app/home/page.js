
import { getStockMarkets } from "@/app/lib/utils.js";

import Link from "next/link";

function MarketCard({name, abbreviation, id})
{
    return (
	    <div className="p-3 m-3 bg-indigo-900 rounded-lg">
	    <h1 className="mb-3">{abbreviation} - {name}</h1>
	    <Link href={"/exchanges/"+id} className="button-style">Browse</Link>
	    </div>
    );
}

export default async function Page(props)
{

    const markets = await getStockMarkets();

    return (
	    <>
	    <h1 className="page-header">Browse Exchanges</h1>
	    <ul>
	    {markets.map(market => <li key={market.id}><MarketCard name={market.name} abbreviation={market.abbreviation} id={market.id} /></li>)}
	    </ul>
	    </>
    );
    
}
