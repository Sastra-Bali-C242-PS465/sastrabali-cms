import { EditQuizGroupFormValues } from '@/app/(auth)/groups/[id]/edit/page';
import sabiAxios from '@/config/axios.config';
import Group from '@/interfaces/group.interface';
import { handleError } from '@/utils/error.util';

export const getGroups = async () => {
  try {
    const {
      data: { data },
    } = await sabiAxios.get('/api/groups', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    return data.groups;
  } catch (error) {
    console.log(error);

    handleError(error);
  }
};

export const getGroupById = async (id: string): Promise<Group | undefined> => {
  try {
    const {
      data: { data },
    } = await sabiAxios.get(`/api/groups/${id}`);

    return data.group;
  } catch (error) {
    handleError(error);
    return undefined;
  }
};

export const createGroup = async ({ title, description, thumbnail }: { title: string; description: string; thumbnail: string }) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);

    const { data } = await sabiAxios.post('/api/groups/', formData, {
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.message;
  } catch (error) {
    handleError(error);
  }
};

export const editGroup = async ({ id, title, description, thumbnail }: EditQuizGroupFormValues) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);

    const {
      data: {
        message,
        data: { group },
      },
    } = await sabiAxios.put(`/api/groups/${id}`, formData, {
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    });

    return { message, group };
  } catch (error) {
    handleError(error);
  }
};
