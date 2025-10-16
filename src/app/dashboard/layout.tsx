"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./dashboard.module.css";
import Sidebar from "./Sidebar";

import UserMenu from "./UserMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/");
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboardLayout}>
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <button
            className={styles.hamburger}
            onClick={toggleSidebar}
            style={{ visibility: isSidebarOpen ? "hidden" : "visible" }}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={styles.userInfo}>
            {session.user && <UserMenu user={session.user} />}
          </div>
        </header>
        <div className={styles.pageContent}>{children}</div>
      </main>
    </div>
  );
}
