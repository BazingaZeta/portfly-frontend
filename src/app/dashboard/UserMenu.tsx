'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { SignOutButton } from '@/app/components/authButtons';
import styles from './dashboard.module.css';

interface UserMenuProps {
  user: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className={styles.userMenuContainer} ref={menuRef}>
      <button className={styles.userMenuButton} onClick={toggleMenu}>
        {user.image && (
          <Image
            src={user.image}
            alt="Avatar"
            width={32}
            height={32}
            className={`${styles.userAvatar} rounded-full border-2 border-gray-400`}
            priority
          />
        )}
        <span className="hidden md:inline">{user.name}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.userDropdownMenu}>
          <div className={styles.userDropdownHeader}>
            {user.image && (
              <Image
                src={user.image}
                alt="Avatar"
                width={40}
                height={40}
                className={`${styles.userAvatar} rounded-full border-2 border-gray-400`}
                priority
              />
            )}
            <div className="flex flex-col text-left min-w-0">
              <span className="font-semibold">{user.name}</span>
              <span className={`text-sm text-gray-400 ${styles.userEmailTruncate}`}>{user.email}</span>
            </div>
          </div>
          <div className={styles.userDropdownDivider} />
          <SignOutButton className={styles.userDropdownSignOutButton} />
        </div>
      )}
    </div>
  );
}
