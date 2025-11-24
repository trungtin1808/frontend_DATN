"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../ui/login/login.module.css';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API;
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      const { access_token, refresh_token, user } = response.data;

      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('sessionId', user.id);
        localStorage.setItem('role', user.role);
        localStorage.setItem('name', user.name);
      }

      // Chuyển hướng dựa trên role
      if (user.role === "jobseeker" || user.role === "employer") {
        router.push('/'); // về trang chủ
      } else if (user.role === "admin") {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Email hoặc mật khẩu không đúng.');
      } else {
        setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn('google', { redirect: false });
      if (result?.error) {
        setError('Lỗi khi đăng nhập bằng Google');
        return;
      }
      // TODO: gửi idToken về backend: POST /login/google
      console.warn('Google login logic cần bổ sung backend /login/google');
    } catch (err) {
      console.error(err);
      setError('Đã có lỗi xảy ra khi đăng nhập bằng Google');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <p className={styles.description}>Nhập thông tin để đăng nhập.</p>

      <form className={styles.form} onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            className={`${styles.input} ${error ? styles['input-error'] : ''}`}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            className={`${styles.input} ${error ? styles['input-error'] : ''}`}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            required
            disabled={isLoading}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.button}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng nhập...' : 'Login'}
        </button>
      </form>

      <button
        className={`${styles.button} mt-4`}
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        Login with Google
      </button>

      <p className={styles.footer}>
        Chưa có tài khoản? <a className={styles.link} href="/register">Đăng ký ngay</a>
      </p>
    </div>
  );
}
