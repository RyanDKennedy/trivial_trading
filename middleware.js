import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateSession, decrypt } from "@/app/lib/session.js";

export default async function middleware(request)
{
    const publicRoutes = ["/", "/login", "/register"];
    const privateRoutes = ["/admin"];


    const path = request.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const isPrivateRoute = privateRoutes.includes(path);

    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    await updateSession();

    // goto users profile if path is "/profile" and they are logged in
    if (path === "/profile" && session?.userId)
    {
	return NextResponse.redirect(new URL("/profile/"+session.userId, request.nextUrl));
    }

    // goto "/" if they aren't logged in and trying to access a non public page
    if (!isPublicRoute && !session?.userId)
    {
	return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // goto "/" if they are trying to access a private page but aren't admin
    if (isPrivateRoute && session?.role !== "admin")
    {
	return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
