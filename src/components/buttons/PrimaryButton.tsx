'use client';

import React from 'react';
import styles from './buttons.module.css';
import Loader from '@components/loader/Loader';

interface PrimaryButtonProps {
  children: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  loader?: boolean;
  action?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type,
  children,
  loader,
  action,
}) => {
  return (
    <button
      className={`${styles.button} ${styles.primary}`}
      type={type}
      onClick={action}
    >
      {children}
      {loader && (
        <div className={styles.icon}>
          <Loader />
        </div>
      )}
    </button>
  );
};

export default PrimaryButton;
