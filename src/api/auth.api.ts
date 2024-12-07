import sabiAxios from '@/config/axios.config';
import { handleError } from '@/utils/error.util';

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    const {
      data: {
        data: { token },
      },
    } = await sabiAxios.post('/api/auth/login', {
      email,
      password,
    });

    return token;
  } catch (error) {
    handleError(error);
  }
};
