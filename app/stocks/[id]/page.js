import { getStockFromId } from "@/app/lib/utils.js";

export default async function page(props)
{
    const { id } = await props.params;

    const stock = await getStockFromId(id);

    return (
	    <>
	    <h1 className="page-header">{stock.abbreviation} - {stock.name}</h1>
	    </>
    );

}
