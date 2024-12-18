
import { getStockMarketFromId } from "@/app/lib/utils.js";

import Link from "next/link";

function StockCard({name, abbreviation, id})
{
    return (
	    <div className="m-3 p-3 rounded-lg bg-indigo-900">
	    <h2 className="mb-3">{abbreviation}</h2>
	    <Link href={"/stocks/"+id} className="button-style">Visit Stock</Link>
	    </div>
    );
}

export default async function Page(props)
{
    const { id } = await props.params;

    const market = await getStockMarketFromId(id);

    return (
	    <>
	    <h1 className="page-header">Browse {market.abbreviation} Stocks</h1>

	    <ul>
	    <li><StockCard name="test" abbreviation="tst" id="1" /></li>
	    </ul>


	    </>
    )

}
