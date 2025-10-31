"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '@/app/ui/login/login.module.css';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email: email,
        password: password,
      });

      const { access_token, refresh_token, user } = response.data;

      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('refresh_token',refresh_token);
        localStorage.setItem('sessionId', user.id);
        localStorage.setItem('userPassword', user.password);
        localStorage.setItem('role', user.role);
        localStorage.setItem('name', user.name);
      }

      if (user.role === "jobSeeker") {
        router.push('/');
      } else if (user.role === "employer") {
        router.push('/');
      } else if (user.role === "admin"){
        router.push('admin/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signIn('google', { redirect: false });
    if (result?.error) {
      console.error("Google Sign-in error", result.error);
      setError('Lỗi khi đăng nhập bằng Google');
      return;
    }
    // Lưu ý: Phần này có lỗi logic trong mã gốc (status và session không được định nghĩa).
    // Tôi sẽ giả định bạn sẽ sửa nó sau, giữ nguyên để khớp yêu cầu.
    if (status !== 'authenticated' || !session?.idToken) {
      console.error("Không tìm thấy idToken");
      setError('Không tìm thấy thông tin xác thực');
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/login/google`, { idToken: session.idToken });
      const { access_token, user } = response.data;
      localStorage.setItem('authToken', access_token);
      localStorage.setItem('sessionId', user.id);
      localStorage.setItem('role', user.role);
      localStorage.setItem('name', user.name);
      router.push(user.role === 1 ? '/dashboard' : '/');
    } catch (error) {
      console.error("Lỗi gửi idToken về Laravel", error);
      setError(error.response?.data?.message || 'Lỗi khi đăng nhập bằng Google');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <p className={styles.description}>Enter details below.</p>
      <form className={styles.form} onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            className={`${styles.input} ${error ? styles['input-error'] : ''}`}
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            className={`${styles.input} ${error ? styles['input-error'] : ''}`}
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles['checkbox-container']}>
          <div className="flex items-center">
            <input className={styles.checkbox} id="remember" name="remember" type="checkbox" />
            <span>Remember me</span>
          </div>
          <a className={styles.link} href="#">Forgot Password</a>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} id="login" name="login" type="submit">
          Login
        </button>
      </form>

      <p className={styles.footer}>
        Don’t have an account? <a className={styles.link} href="/register">Sign Up</a>
      </p>
    </div>
  );
}