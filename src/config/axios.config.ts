import axios from 'axios';

const sabiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
  headers: {
    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzMjI3NTE0LCJleHAiOjE3MzMzMTM5MTR9.8LXJk-gYDVmNqRuM148njqk_9GAYdVJkBTL-LBw_5T0',
  },
});

export default sabiAxios;
