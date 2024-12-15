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

    if (!isPublicRoute && !session?.userId)
    {
	return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (isPrivateRoute && session?.role !== "admin")
    {
	return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
