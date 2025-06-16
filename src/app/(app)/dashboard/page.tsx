import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.session) {
    redirect("/login");
  }
  return (
    <div>
      <h1 className="text-4xl tracking-tighter">
        Welcome Back, {session?.user.name}
      </h1>
    </div>
  );
}
