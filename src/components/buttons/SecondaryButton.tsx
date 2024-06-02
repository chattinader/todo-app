'use client';

import React from 'react';
import styles from './buttons.module.css';

interface SecondaryButtonProps {
  children: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  action?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  type,
  children,
  action,
}) => {
  return (
    <button
      className={`${styles.button} ${styles.secondary}`}
      type={type}
      onClick={action}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
