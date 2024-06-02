import PrimaryButton from '@components/buttons/PrimaryButton';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/">Todos</Link>
      </div>
      <div className={styles.right}>
        <PrimaryButton type="button" action={() => signOut()}>
          LOGOUT
        </PrimaryButton>
      </div>
    </nav>
  );
};

export default Navbar;
