

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
 const { userId } = await auth();

 return (
  <div className="p-4 ">
   {userId ? (
    <div className="flex  gap-4">
     <h1>Welcome</h1>
     <UserButton />
     {}
    </div>
   ) : (
    <div>
      <Link href="/sign-in">Login</Link>
    </div>
   )}
  </div>
 );
}
