import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload)
{
    return new SignJWT(payload)
	.setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
	.setExpirationTime("7d")
	.sign(encodedKey);
}

export async function decrypt(session)
{
    if (!session)
	return "";

    try
    {
	const { payload } = await jwtVerify(session ?? "", encodedKey, {algorithms: ["HS256"]});
	return payload;
    }	
    catch (err)
    {
	console.log("Failed to verify session");
    }
}

export async function getUserId()
{
    const cookieStore = await cookies();    
    const session = cookieStore.get("session")?.value;
    const payload = await decrypt(session);

    if (!session || !payload)
    {
	return null;
    }

    return payload.userId;
}

export async function createSession(userId)
{
    const expiresAt = new Date(Date.now() + 7*24*3600*1000);
    const session = await encrypt({userId});
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
	httpOnly: true,
	secure: process.env.ENVIRONMENT_TYPE === "dev"? false : true,
	expires: expiresAt,
	sameSite: "lax",
	path: "/"
    });

}

export async function updateSession()
{
    const cookieStore = await cookies();    
    const session = cookieStore.get("session")?.value;
    const payload = await decrypt(session);

    if (!session || !payload)
    {
	return null;
    }

    const expiresAt = new Date(Date.now() + 7*24*3600*1000);


    cookieStore.set("session", session, {
	httpOnly: true,
	secure: process.env.ENVIRONMENT_TYPE === "dev"? false : true,
	expires: expiresAt,
	sameSite: "lax",
	path: "/"
    });

}

export async function deleteSession()
{
    const cookieStore = await cookies();
    cookieStore.delete("session");
}
