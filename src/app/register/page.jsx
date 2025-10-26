"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '@/app/ui/login/login.module.css';

export default function RegisterPage() {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API;
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        role: role,
      });

      setSuccessMessage('Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay.');
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setPassword_confirmation('');
      setGeneralError('');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const errors = error.response.data.errors;
          if(errors?.name){
            setErrors({name: [errors.name[0]]});
            
          } else if(errors?.email){
            setErrors({email:[errors.email[0]]});
          } else if(errors?.password){
            setErrors({password_confirmation:[errors.password[0]]});
          }else if(errors?.role){
            setErrors({role:[errors.role[0]]});
          } 
          setGeneralError('Vui lòng kiểm tra lại các thông tin đã nhập.');
        }
         else  {
          setGeneralError('Đã có lỗi xảy ra phía máy chủ. Vui lòng thử lại sau.');
        }
      } else if (error.request) {
        setGeneralError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.');
      } else {
        setGeneralError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Đăng Ký Tài Khoản</h2>
      <p className={styles.description}>Nhập thông tin để tạo tài khoản mới.</p>
      <form className={styles.form} onSubmit={handleRegister}>
        <div>
          <label htmlFor="name" className={styles.label}>Họ và tên</label>
          <input
            className={`${styles.input} ${errors.name ? styles['input-error'] : ''}`}
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
          {errors.name && <p className={styles['error-field']}>{errors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            className={`${styles.input} ${errors.email ? styles['input-error'] : ''}`}
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          {errors.email && <p className={styles['error-field']}>{errors.email[0]}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={styles.label}>Số điện thoại</label>
          <input
            className={`${styles.input} ${errors.phone ? styles['input-error'] : ''}`}
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={isLoading}
          />
          {errors.phone && <p className={styles['error-field']}>{errors.phone[0]}</p>}
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>Mật khẩu</label>
          <input
            className={`${styles.input} ${errors.password ? styles['input-error'] : ''}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={isLoading}
          />
          {errors.password && <p className={styles['error-field']}>{errors.password[0]}</p>}
        </div>
        <div>
          <label htmlFor="password_confirmation" className={styles.label}>Xác nhận mật khẩu</label>
          <input
            className={`${styles.input} ${errors.password_confirmation ? styles['input-error'] : ''}`}
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
            required
            disabled={isLoading}
          />
          {errors.password_confirmation && <p className={styles['error-field']}>{errors.password_confirmation[0]}</p>}
        </div>
        <div>
          <label htmlFor="role" className={styles.label}>Chọn vai trò</label>
          <select
            className={`${styles.input} ${errors.role ? styles['input-error'] : ''}`}
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            disabled={isLoading}
         >
            <option value="">-- Chọn vai trò --</option>
            <option value="jobSeeker">Người tìm việc</option>
            <option value="employer">Nhà tuyển dụng</option>
          </select>

          {errors.role && (
          <p className={styles['error-field']}>{errors.role[0]}</p>
          )}
        </div>
        
        {generalError && <p className={styles.error}>{generalError}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Đăng Ký'}
        </button>
      </form>
      <p className={styles.footer}>
        Đã có tài khoản? <a className={styles.link} href="/login">Đăng nhập ngay</a>
      </p>
    </div>
  );
}