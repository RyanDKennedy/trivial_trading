import { getFullNameFromId, doesUserExistFromId, getUserId, getStockPurchasesFromId } from "@/app/lib/utils.js";


async function HistoryCard({stockName, stockAbbreviation, stockShares, stockPrice, date})
{
    "use client"

    const dateString = new Date(date).toLocaleString();
    
    return (
	    <div className="bg-blue-600 p-4 rounded-lg m-4">
	    <h1 className="text-2xl">{stockAbbreviation}: {stockShares < 0 ? "sold" : "bought"} ${Math.abs(stockShares * stockPrice)}</h1>
	    Stock: {stockName}<br/>
	    Date: {dateString}<br/>
	    Action: {stockShares < 0 ? "Sell" : "Buy"}<br/>
	    Shares: {Math.abs(stockShares)}<br/>
	    Share Price: ${stockPrice}
	    </div>
    );

}

export default async function Page(props)
{
    const id = (await props.params).id;

    if (await doesUserExistFromId(id) === false)
    {
	return (
		<h1 className="page-header">User {id} not found.</h1>
	);
    }

    const fullName = await getFullNameFromId(id);
    const stockPurchases = await getStockPurchasesFromId(id);

    return (
	<>
	    <h1 className="page-header">{fullName}</h1>
	    <h2 className="text-2xl text-center my-3">Stock Transaction History</h2>
	    <ul>{stockPurchases.map(p => <li key={p.purchase_id}><HistoryCard stockName={p.stock_name} stockAbbreviation={p.stock_abbreviation} stockShares={p.stock_shares} stockPrice={p.stock_price} date={p.date} /></li>)}</ul>
	</>
    );



}
/*


*/
