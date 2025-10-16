'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';

export default function Sidebar({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/portfolio', label: 'Portfolio' },
    { href: '/dashboard/watchlist', label: 'Watchlist' },
    { href: '/dashboard/settings', label: 'Settings' },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <h2>Portfly</h2>
        <button className={styles.closeButton} onClick={toggle}>&times;</button>
      </div>
      <nav className={styles.sidebarNav}>
        <ul>
          {menuItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname === href ? styles.active : ''}
                onClick={toggle} // Always close the sidebar on click
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
