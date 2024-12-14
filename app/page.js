
import Link from "next/link";
import { hasSession, getFullName } from "@/app/lib/utils.js";

export default async function Page()
{


    return (
	  <>


	    <div className="bg-gradient-to-b from-[#164e63] to-indigo-900 h-screen">

	    <h1 className="text-3xl text-center w-screen my-5">Trivial Trading</h1>

	<div className="flex flex-col justify-evenly">




	<div className="flex flex-row justify-between mt-10 mx-10 gap-x-10">

	      <div className="bg-gradient-to-r from-violet-800 to-indigo-600 inline-block p-5 rounded-lg min-h/5">
	        <h2 className="text-2xl underline">What is Trivial Trading?</h2>
	        <p className="mt-2">
	        Trivial Trading is a website designed to introduce you to the stock market. It does this by allowing you to participate in a simulation of the real stock market using imaginary currency.
	        </p>
	      </div>


	      <div className="bg-gradient-to-b to-emerald-500 from-blue-700 inline-block p-5 rounded-lg min-h-1/5">
	        <h2 className="text-2xl underline">How much does Trivial Trading cost?</h2>
	        <p className="mt-2">
	        Nothing! Trivial Trading isn't actually a real product, therefore we don't have any costs.
	        </p>
              </div>

	</div>


	<div className="flex flex-row justify-center mt-10 mx-10">

	        <div className="bg-gradient-to-bl to-amber-600 from-red-500 inline-block p-5 rounded-lg min-h-2/5 w-screen">
	          <h2 className="text-2xl underline">Get Started!</h2>
	          <p className="mt-2 mb-10">
	          To start you have to make an account. To create an account click the register button below.
	          </p>
	          <Link href="/register" className="button-style">Register</Link>
	        </div>
       </div>


	</div>



	    </div>



	  </>
    );
}


/*
	    <h1 className="text-3xl text-center w-screen my-4">Trivial Trading</h1>

	    <div className="bg-gradient-to-b from-[#000000] to-blue-900 h-screen">

	      <div className="relative h-1/5 w-full my-5">
	        <div className="absolute top-0 left-0 bg-gradient-to-br from-indigo-600 to-violet-600 inline-block p-5 rounded-lg w-1/2 h-full m-5">

	          <h2 className="text-2xl underline">What is Trivial Trading?</h2>
	          <p className="mt-2">
	          Trivial Trading is a website designed to introduce you to the stock market. It does this by allowing you to participate in a simulation of the stock market using imaginary currency.
	          </p>

	        </div>
	      </div>

	      <div className="relative h-1/5 w-full my-5">
	        <div className="absolute top-0 right-0 bg-gradient-to-bl to-emerald-500 from-blue-700 inline-block p-5 rounded-lg w-1/2 h-full m-5">
	          <h2 className="text-2xl underline">How much does Trivial Trading cost?</h2>
	          <p className="mt-2">
	          Nothing! Trivial Trading isn't actually a real product, therefore we don't have any costs.
	          </p>

	        </div>
	      </div>




	      <div className="relative min-h-1/5 w-5/6 my-5">
	        <div className="bg-gradient-to-b to-amber-600 from-red-500 inline-block p-5 rounded-lg w-full h-full m-5">
	          <h2 className="text-2xl underline">Get Started!</h2>
	          <p className="my-2">
	          To start you have to make an account. To create an account click the register button below.
	          </p>
	          <Link href="/register" className="button-style">Register</Link>
	        </div>
	      </div>

	    </div>



	  </>

*/
