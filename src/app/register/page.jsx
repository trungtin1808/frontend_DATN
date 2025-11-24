"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '@/app/ui/login/login.module.css';

export default function RegisterPage() {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API;
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/register`, formData);

      if (formData.role === 'employer') {
        setSuccessMessage('Đăng ký tài khoản nhà tuyển dụng thành công! Vui lòng chờ admin xác nhận để được hoạt động.');
      } else {
        setSuccessMessage('Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay.');
      }
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        role: '',
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const backendErrors = error.response.data.errors;
          const newErrors = {};
          ['name','email','phone','password','role','password_confirmation'].forEach(field => {
            if (backendErrors[field]) newErrors[field] = backendErrors[field][0];
          });
          setErrors(newErrors);
          setGeneralError('Vui lòng kiểm tra lại các thông tin đã nhập.');
        } else {
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
        {['name','email','phone','password','password_confirmation'].map(field => (
          <div key={field}>
            <label htmlFor={field} className={styles.label}>
              {field === 'name' ? 'Họ và tên' :
               field === 'email' ? 'Email' :
               field === 'phone' ? 'Số điện thoại' :
               field === 'password' ? 'Mật khẩu' : 'Xác nhận mật khẩu'}
            </label>
            <input
              className={`${styles.input} ${errors[field] ? styles['input-error'] : ''}`}
              id={field}
              name={field}
              type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
              value={formData[field]}
              onChange={handleChange}
              required
              minLength={field.includes('password') ? 6 : undefined}
              disabled={isLoading}
            />
            {errors[field] && <p className={styles['error-field']}>{errors[field]}</p>}
          </div>
        ))}

        <div>
          <label htmlFor="role" className={styles.label}>Chọn vai trò</label>
          <select
            className={`${styles.input} ${errors.role ? styles['input-error'] : ''}`}
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            disabled={isLoading}
          >
            <option value="">-- Chọn vai trò --</option>
            <option value="jobseeker">Người tìm việc</option>
            <option value="employer">Nhà tuyển dụng</option>
          </select>
          {errors.role && <p className={styles['error-field']}>{errors.role}</p>}
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