import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/sign-in");

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Bem-vindo, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      <form action="/api/auth/sign-out" method="post">
        <button type="submit">Sair</button>
      </form>
    </main>
  );
}
