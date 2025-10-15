import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import styles from './dashboard.module.css';
import Sidebar from './Sidebar';
import { SignOutButton } from '../components/authButtons';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <span>{session.user?.name}</span>
            {session.user?.image && <img src={session.user.image} alt="Avatar" width={32} height={32} />}
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
