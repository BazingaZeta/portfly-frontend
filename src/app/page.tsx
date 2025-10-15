import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SignInButton } from "./components/authButtons";
import styles from "./home.module.css";

// CSS for the button, as it's a small, one-off style
const buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  padding: "0.75rem 1.5rem",
  backgroundColor: "#4285F4",
  color: "white",
  fontSize: "1rem",
  fontWeight: "600",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.2s",
  width: "100%",
};

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className={styles.page}>
      <div className={styles.branding}>
        <h1>Portfly</h1>
        <p>Your professional portfolio, simplified.</p>
      </div>
      <div className={styles.loginArea}>
        <div className={styles.loginCard}>
          <h2>Get Started</h2>
          <p>Sign in with your Google account to continue.</p>
          <SignInButton style={buttonStyle} />
        </div>
      </div>
    </div>
  );
}
