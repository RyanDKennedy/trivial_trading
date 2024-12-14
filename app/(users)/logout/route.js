import {redirect} from "next/navigation";
import { logout } from "@/app/(users)/users.js";

export async function GET()
{
    await logout();

    redirect("/");
}
