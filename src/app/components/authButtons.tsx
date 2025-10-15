'use client';

import { signIn, signOut } from 'next-auth/react';

// Google Icon SVG
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.8 0-5.18-1.88-6.04-4.42H2.34v2.84C4.13 20.98 7.75 23 12 23z" fill="#34A853"/>
    <path d="M5.96 14.05c-.21-.66-.33-1.36-.33-2.05s.12-1.39.33-2.05V7.11H2.34C1.48 8.88 1 10.62 1 12.4s.48 3.52 1.34 5.29l3.62-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.75 1 4.13 3.02 2.34 6.21l3.62 2.84c.86-2.54 3.24-4.42 6.04-4.42z" fill="#EA4335"/>
    <path d="M1 1h22v22H1z" fill="none"/>
  </svg>
);

export function SignInButton({ style }: { style?: React.CSSProperties }) {
  return (
    <button onClick={() => signIn('google')} style={style}>
      <GoogleIcon />
      <span>Sign in with Google</span>
    </button>
  );
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
