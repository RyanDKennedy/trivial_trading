import { getFullNameFromId, doesUserExistFromId, getUserId, getStockPurchasesFromId } from "@/app/lib/utils.js";


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
	    <h2 className="text-2xl">Stock Purchase History</h2>
	    <ul>{stockPurchases.map(purchase => <li key={purchase.id}>{purchase.stock_entry_id} - {purchase.shares} shares</li>)}</ul>
	</>
    );

}
