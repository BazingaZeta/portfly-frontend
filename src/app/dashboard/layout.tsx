'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';
import Sidebar from './Sidebar';
import Image from 'next/image';
import { SignOutButton } from '../components/authButtons';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect('/');
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboardLayout}>
      {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar} />}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <button className={styles.hamburger} onClick={toggleSidebar} style={{ visibility: isSidebarOpen ? 'hidden' : 'visible' }}>
            <span />
            <span />
            <span />
          </button>
          <div className={styles.userInfo}>
            <span>{session.user?.name}</span>
            {session.user?.image && <Image src={session.user.image} alt="Avatar" width={32} height={32} className="rounded-full" priority />}
            <SignOutButton />
          </div>
        </header>
        <div className={styles.pageContent}>
          {children}
        </div>
      </main>
    </div>
  );
}
