import Link from 'next/link';
import styles from './dashboard.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>Portfly</h2>
      <nav className={styles.sidebarNav}>
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/dashboard/portfolio">Portfolio</Link></li>
          <li><Link href="/dashboard/settings">Settings</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
