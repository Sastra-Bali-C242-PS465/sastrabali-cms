import { deleteReading } from '@/api/reading.api';
import { Button } from './ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toaster } from './ui/toaster';
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from './ui/dialog';
import { deleteQuiz } from '@/api/quiz.api';

export default function DeleteButton({ id, model }: { id: number; model: string }) {
  const queryClient = useQueryClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const deleteService = (model: string): Promise<any> => {
    if (model === 'reading') {
      return deleteReading(id);
    }
    if (model === 'quiz') {
      return deleteQuiz(id);
    }
    return Promise.reject(new Error(`Unsupported model: ${model}`));
  };

  const invalidateQueryKey = (model: string) => {
    if (model === 'reading') {
      return ['readings'];
    }
    if (model === 'quiz') {
      return ['quizes', 'group'];
    }
  };

  const mutation = useMutation({
    mutationFn: () => deleteService(model),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: invalidateQueryKey(model) });
      return toaster.create({
        description: data,
        type: 'success',
        duration: 5000,
      });
    },
    onError: (error) => {
      return toaster.create({
        description: error.message,
        type: 'error',
        duration: 5000,
      });
    },
  });
  return (
    <DialogRoot role='alertdialog' placement='top'>
      <DialogTrigger asChild>
        <Button colorPalette='red' color='bg' paddingX={4} paddingY={3}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent p={4} mt={8}>
        <DialogHeader>
          <DialogTitle>Konfirmasi</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>Apa anda yakin ingin menghapus item ini?</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant='outline'>Batal</Button>
          </DialogActionTrigger>
          <Button onClick={() => mutation.mutate()} colorPalette='red'>
            Hapus
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
