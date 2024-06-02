'use client';

import PrimaryButton from '@components/buttons/PrimaryButton';
import Input from '@components/input/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './login.module.css';
import Loader from '@components/loader/Loader';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (error) {
      countdownInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setError('');
            clearInterval(countdownInterval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [error]);

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimer(5);
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError('Invalid username or password');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>TODO APP</h1>
        <form onSubmit={handleSubmitLogin} className={styles.cardContent}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            action={(e) => setUsername(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Password"
            value={password}
            action={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton type="submit" loader={isLoading}>
            LOGIN
          </PrimaryButton>
        </form>
        {error && (
          <p className={styles.error}>
            {error} ({timer}s)
          </p>
        )}
      </div>
    </main>
  );
};

export default Login;
