import axios from 'axios';

const sabiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
  headers: {
    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzMTk3MjA2LCJleHAiOjE3MzMyODM2MDZ9.vxgRg3d14Nh8KV8HLBpJggjK3vCai7tZIbmZ6gUQLto',
  },
});

export default sabiAxios;
