import { isAuthenticated } from "@/lib/auth/auth";
import Link from "next/link";

export default async function Page() {
  if (!(await isAuthenticated())) {
    return <div>Session error</div>;
  }

  return (
    <main className="flex flex-col gap-2 ml-2 mt-2">
      <h1>Secure page</h1>
      <div>
        <Link className="text-blue-700" href="..">
          Link to home page
        </Link>
      </div>
    </main>
  );
}
