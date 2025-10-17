'use client';

import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import styles from './dashboard.module.css';

export default function Sidebar({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/portfolio', label: 'Portfolio' },
    { href: '/dashboard/watchlist', label: 'Watchlist' },
    { href: '/dashboard/settings', label: 'Settings' },
  ];

  const handleNavigation = (href: string) => {
    toggle(); // Close the sidebar

    // Use requestAnimationFrame to ensure the DOM updates before navigation
    requestAnimationFrame(() => {
      router.push(href); // Programmatically navigate
    });
  };

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
              <button
                className={`${styles.sidebarNavLink} ${pathname === href ? styles.active : ''}`}
                onClick={() => handleNavigation(href)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
