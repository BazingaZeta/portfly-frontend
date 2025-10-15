import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SignInButton, SignOutButton } from "./components/authButtons";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Google Authentication with NextAuth</h1>
      {
        session ? (
          <div>
            <p>Welcome, {session.user?.name}!</p>
            <p>Email: {session.user?.email}</p>
            {session.user?.image && <img src={session.user.image} alt="User avatar" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />}
            <br />
            <SignOutButton />
          </div>
        ) : (
          <div>
            <p>You are not signed in.</p>
            <SignInButton />
          </div>
        )
      }
    </main>
  );
}