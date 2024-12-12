import { EditQuizFormValues } from '@/app/(auth)/groups/[id]/quizes/[quizId]/edit/page';
import { QuizInputGroupValues } from '@/app/(auth)/groups/[id]/quizes/create/page';
import sabiAxios from '@/config/axios.config';
import { handleError } from '@/utils/error.util';

export const createQuiz = async ({ question, optionA, optionB, optionC, optionD, answer, groupId }: QuizInputGroupValues) => {
  try {
    const formData = new FormData();
    formData.append('question', question);
    formData.append('options', optionA);
    formData.append('options', optionB);
    formData.append('options', optionC);
    formData.append('options', optionD);
    formData.append('answer', answer);
    formData.append('groupId', groupId);

    const { data } = await sabiAxios.post('api/questions', formData, {
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

export const editQuiz = async ({ id, question, optionA, optionB, optionC, optionD, answer }: EditQuizFormValues) => {
  try {
    const formData = new FormData();
    formData.append('question', question);
    formData.append('options', optionA);
    formData.append('options', optionB);
    formData.append('options', optionC);
    formData.append('options', optionD);
    formData.append('answer', answer);

    const {
      data: { message },
    } = await sabiAxios.put(`api/questions/${id}`, formData, {
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

export const getQuizesByGroupId = async (groupId: number) => {
  try {
    const {
      data: {
        data: { quizes },
      },
    } = await sabiAxios.get(`/api/groups/${groupId}/quizes`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    return quizes;
  } catch (error) {
    handleError(error);
  }
};

export const getQuizById = async (id: string) => {
  try {
    const {
      data: {
        data: { question },
      },
    } = await sabiAxios.get(`/api/questions/${id}`);

    return question;
  } catch (error) {
    handleError(error);
  }
};

export const deleteQuiz = async (id: number) => {
  try {
    const {
      data: { message },
    } = await sabiAxios.delete(`/api/questions/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });

    return message;
  } catch (error) {
    handleError(error);
  }
};
