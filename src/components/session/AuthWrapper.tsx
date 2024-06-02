'use client';

import { useSession } from 'next-auth/react';
import Navbar from '@components/navbar/Navbar';
import Loader from '@components/loader/Loader';
import styles from './authWrapper.module.css';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className={styles.main}>
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <>
      {session && <Navbar />}
      <div>{children}</div>
    </>
  );
};

export default AuthWrapper;
