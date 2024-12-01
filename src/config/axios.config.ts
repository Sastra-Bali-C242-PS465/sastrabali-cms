import axios from 'axios';

const sabiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
  headers: {
    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzMDE2NTY0LCJleHAiOjE3MzMxMDI5NjR9.lXZSZAEylgmwPyjZL86TtmPxKFMRll1ot0eHmHnwOFw',
  },
});

export default sabiAxios;
