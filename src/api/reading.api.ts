import sabiAxios from '@/config/axios.config';
import { handleError } from '@/utils/error.util';

export const createReading = async ({ title, content, thumbnail }: { title: string; content: string; thumbnail: string }) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('thumbnail', thumbnail);

    const {
      data: { message },
    } = await sabiAxios.post('/api/readings', formData, {
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    });

    return message;
  } catch (error) {
    handleError(error);
  }
};

export const editReading = async ({ id, title, content, thumbnail }: { id: string; title: string; content: string; thumbnail: string }) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('thumbnail', thumbnail);

    const {
      data: { message },
    } = await sabiAxios.put(`/api/readings/${id}`, formData, {
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    });

    return message;
  } catch (error) {
    handleError(error);
  }
};

export const getReadings = async () => {
  try {
    const {
      data: {
        data: { readings },
      },
    } = await sabiAxios.get('/api/readings', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    return readings;
  } catch (error) {
    handleError(error);
  }
};

export const getReadingById = async (id: string) => {
  try {
    const {
      data: {
        data: { reading },
      },
    } = await sabiAxios.get(`/api/readings/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    return reading;
  } catch (error) {
    handleError(error);
  }
};

export const deleteReading = async (id: number) => {
  try {
    const {
      data: { message },
    } = await sabiAxios.delete(`/api/readings/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    return message;
  } catch (error) {
    handleError(error);
  }
};
