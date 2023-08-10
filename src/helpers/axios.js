import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://tesvan-electronics.onrender.com/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default instance;
