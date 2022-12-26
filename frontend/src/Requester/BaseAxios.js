import axios from 'axios';

const baseAxios = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

export default baseAxios;
