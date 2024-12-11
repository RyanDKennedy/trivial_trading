"use server"




export async function registerUser(fullName, username, password)
{
    console.log(fullName, username, password);

    let errorText = "Failed to register user.";
    let worked = true;

    // TODO: check db
    try
    {
	console.log("hi");
    }
    catch (err)
    {
	worked = false;


    }

    return {worked, errorText};
}
