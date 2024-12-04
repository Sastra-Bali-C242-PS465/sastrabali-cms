import sabiAxios from '@/config/axios.config';
import { handleError } from '@/utils/error.util';

export const getUsers = async () => {
  try {
    const {
      data: {
        data: { users },
      },
    } = await sabiAxios.get('/api/users');

    return users;
  } catch (error) {
    handleError(error);
  }
};
