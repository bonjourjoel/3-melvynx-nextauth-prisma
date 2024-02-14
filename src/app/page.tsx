import LoginButton from "@/lib/auth/LoginButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authConfig } from "../../pages/api/auth/[...nextauth]";
import User from "@/lib/auth/User";
import { getAuthSession } from "@/lib/auth/auth";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <main className="flex flex-col gap-2 ml-2 mt-2">
      <h1>Home page</h1>
      {session ? (
        <div>
          <User />
        </div>
      ) : (
        <div>
          <LoginButton />
        </div>
      )}
      <div>
        <Link className="text-blue-700" href="secure-page">
          Link to secure page
        </Link>
      </div>
    </main>
  );
}
