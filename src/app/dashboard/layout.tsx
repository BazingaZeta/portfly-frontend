"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./dashboard.module.css";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
import LoadingPage from "../loading-page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // New state for mobile detection

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []); // Run once on mount

  // Close sidebar if it's open and screen becomes desktop
  useEffect(() => {
    if (!isMobile && isSidebarOpen) {
      // If not mobile and sidebar is open
      setIsSidebarOpen(false);
    }
  }, [isMobile, isSidebarOpen]); // Re-run when isMobile or isSidebarOpen changes

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (!session) {
    redirect("/");
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboardLayout}>
      {isMobile && isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}{" "}
      {/* Conditional rendering */}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          {isMobile && ( // Only show hamburger on mobile
            <button
              className={styles.hamburger}
              onClick={toggleSidebar}
              style={{ visibility: isSidebarOpen ? "hidden" : "visible" }}
            >
              <span />
              <span />
              <span />
            </button>
          )}
          <div className={styles.userInfo}>
            {session.user && <UserMenu user={session.user} />}
          </div>
        </header>
        <div className={styles.pageContent}>{children}</div>
      </main>
    </div>
  );
}
