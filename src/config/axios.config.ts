import axios from 'axios';

const sabiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
});

export default sabiAxios;
