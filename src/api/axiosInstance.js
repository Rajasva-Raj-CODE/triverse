import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGUiOiJDT01QQU5ZX1NVUlBFUl9BRE1JTiIsImlhdCI6MTc1MjE0MjQ3OCwiZXhwIjoxNzUyNTc0NDc4fQ.LvUKNK8F8bEYvI6W2lgkB1YvoZtgyuAsgaTabHxz9wQ');

axiosInstance.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // else{
    //     window.location.href = '/';
    // }
    return config;
});

export default axiosInstance;