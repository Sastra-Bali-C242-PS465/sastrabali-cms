import { QuizInputGroupValues } from '@/app/groups/[id]/quizes/create/page';
import sabiAxios from '@/config/axios.config';
import { handleError } from '@/utils/error.util';

export const createQuiz = async ({ question, optionA, optionB, optionC, optionD, answer }: QuizInputGroupValues) => {
  try {
    const formData = new FormData();
    formData.append('question', question);
    formData.append('options', optionA);
    formData.append('options', optionB);
    formData.append('options', optionC);
    formData.append('options', optionD);
    formData.append('answer', answer);
    formData.append('groupId', '1');

    const { data } = await sabiAxios.post('api/questions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.message;
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
    } = await sabiAxios.get(`/api/groups/${groupId}/quizes`);

    return quizes;
  } catch (error) {
    handleError(error);
  }
};
