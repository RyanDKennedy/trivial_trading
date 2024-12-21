"use client"

import Link from "next/link";
import Form from "next/form";
import { useState } from "react";

import { searchStocks } from "@/app/lib/utils.js";

function StockCard({name, abbreviation, id})
{

    return (
	    <div className="m-3 p-3 rounded-lg bg-indigo-900">
	    <h2 className="mb-3">{abbreviation} - {name}</h2>
	    <Link href={"/stocks/"+id} className="button-style">Goto Stock</Link>
	    
	    </div>
    );
}

export function ExchangeStocks({ exchangeName, exchangeAbbreviation, exchangeId, startingStocks, pageSize })
{
    const [stocks, setStocks] = useState(startingStocks);
    const [search, setSearch] = useState("");
    const [oldSearch, setOldSearch] = useState("");
    const [errorText, setErrorText] = useState("");

    const [page, setPage] = useState(0);

    const theAction = async (a) =>
	  {
	      // to stop spamming submit
	      if (oldSearch === search)
	      {
		  setErrorText("Please stop spamming search.");
		  return;
	      }

	      // Warn about sql injection characters
	      let err = search.includes(";");
	      err |= search.includes("'");
	      err |= search.includes("\"");
	      
	      if (err)
	      {
		  setErrorText("Characters [ ; ' \" ] are not allowed in searches.");
		  return;
	      }

	      setErrorText("");

	      setOldSearch(search);

	      setPage(0);
	      
	      const newStocks = await searchStocks(exchangeId, search, pageSize, 0);
	      setStocks(newStocks);
	  }

    const changePage = async (e, amt) =>
	  {
	      e.preventDefault();

	      let newPage = page + amt;
	      if (newPage < 0)
		  newPage = 0;

	      if (newPage == page)
		  return;

	      const newStocks = await searchStocks(exchangeId, oldSearch, pageSize, newPage);

	      setStocks(newStocks);

	      setPage(newPage);

	  }

    return (
	    <>
	    
	    <Form action={theAction} className="mx-auto w-max my-4">
	    <div className="flex flex-row justify-center items-center gap-2">
	    <input type="text" name="search" onChange={(e) => setSearch(e.target.value)} value={search} className="text-gray-900 rounded-lg max-w-[40ch] p-2"/>
	    <button type="submit" className="button-style !mx-2">Search</button><br/>
	    </div>

	    <span className="text-red-400">{errorText}</span>
	    </Form>
	    
	    <div className="flex flex-row justify-center items-center gap-2">
	    <button onClick={(e) => changePage(e, -1)} className="button-style">{"<"}</button>
	    Page {page}
	    <button onClick={(e) => changePage(e, 1)} className="button-style">{">"}</button>
	    </div>

	    <ul>
	    {stocks.map( stock => <li key={stock.id}><StockCard name={stock.name} abbreviation={stock.abbreviation} id={stock.id} /></li>)}
	    </ul>



	    </>
    );
}
