'use client';

import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Box, Container, HStack, Icon, Image, Input, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { Field as FormikField, FieldArray, Form, Formik, FieldInputProps, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { FileInput, FileUploadClearTrigger, FileUploadRoot } from '@/components/ui/file-upload';
import { HiUpload } from 'react-icons/hi';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createQuiz, editQuiz, getQuizById } from '@/api/quiz.api';
import { Toaster, toaster } from '@/components/ui/toaster';
import { CloseButton } from '@/components/ui/close-button';
import { InputGroup } from '@/components/ui/input-group';
import { useParams } from 'next/navigation';
import Quiz from '@/interfaces/quiz.interface';

export interface EditQuizFormValues {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  id: string;
}

export default function CreateQuizPage() {
  const { id: groupId, quizId } = useParams<{ id: string; quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [question, setQuestion] = useState<string | null>(null);
  const createQuestionValidationSchema = Yup.object().shape({
    optionA: Yup.string().required(),
    optionB: Yup.string().required(),
    optionC: Yup.string().required(),
    optionD: Yup.string().required(),
    answer: Yup.number().min(0).max(3).required(),
  });
  const mutation = useMutation({
    mutationFn: (values: EditQuizFormValues) => editQuiz(values),
    onSuccess: (data) => {
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

  const { data } = useQuery({
    queryKey: ['quizes', quizId],
    queryFn: () => getQuizById(quizId),
  });

  useEffect(() => {
    if (data) {
      setQuiz(data);
    }
  }, [data, setQuiz]);

  useEffect(() => {
    if (quiz) {
      let quizAnswer = 0;
      quiz.options.map((option, index) => {
        if (option.isAnswer) quizAnswer = index;
      });

      setQuizAnswer(String(quizAnswer));
      setQuestion(quiz.question);
    }
  }, [quiz, setQuizAnswer]);

  if (quiz && quizAnswer)
    return (
      <Container maxW={'2xl'} marginX={'auto'} marginY={6} paddingX={4}>
        <Stack gap={4}>
          <BreadcrumbRoot>
            <BreadcrumbLink href='/groups'>Groups</BreadcrumbLink>
            <BreadcrumbLink href={`/groups/${groupId}/quizes`}>Quizes</BreadcrumbLink>
            <BreadcrumbCurrentLink>Edit</BreadcrumbCurrentLink>
          </BreadcrumbRoot>

          <Formik
            initialValues={{
              id: quizId,
              question: '',
              optionA: quiz.options[0].option,
              optionB: quiz.options[1].option,
              optionC: quiz.options[2].option,
              optionD: quiz.options[3].option,
              answer: quizAnswer,
            }}
            validationSchema={createQuestionValidationSchema}
            onSubmit={(values) => {
              mutation.mutate(values);
            }}
          >
            {(props) => (
              <Form>
                <VStack alignItems='start' gap={4}>
                  {/* Question Field */}
                  <FormikField name={'question'}>
                    {({ form }: { form: FormikProps<EditQuizFormValues> }) => (
                      <Field
                        label='Soal'
                        helperText='File dengan format .png atau .jpeg. Ukuran maks 1mb.'
                        invalid={Boolean(form.touched.question && form.errors.question)}
                        errorText={form.errors.question}
                      >
                        <FileUploadRoot onFileAccept={(details) => props.setFieldValue('question', details.files[0])} accept={['image/jpeg', 'image/png']} maxFileSize={1024 * 1000}>
                          <InputGroup
                            w='full'
                            startElement={
                              <Icon ms={1}>
                                <HiUpload />
                              </Icon>
                            }
                            endElement={
                              <FileUploadClearTrigger asChild>
                                <CloseButton me='-1' size='xs' variant='plain' focusVisibleRing='inside' focusRingWidth='2px' pointerEvents='auto' color='fg.subtle' />
                              </FileUploadClearTrigger>
                            }
                          >
                            <FileInput />
                          </InputGroup>
                        </FileUploadRoot>
                      </Field>
                    )}
                  </FormikField>

                  {/* Preview */}
                  {question && (
                    <VStack alignItems='start'>
                      <Text fontSize='sm'>Preview:</Text>
                      <Image height='200px' src={question} alt='Pertanyaan' />
                    </VStack>
                  )}

                  {/* Options FieldArray */}
                  <FieldArray name={'options'}>
                    {() => (
                      <Box w='full' paddingX={6}>
                        <RadioGroup value={props.values.answer} onValueChange={(e) => props.setFieldValue('answer', e.value)}>
                          <SimpleGrid columns={2} gap={4}>
                            {/* OptionA Field */}
                            <HStack gap={4} align='center'>
                              {/* Radio Input */}
                              <Radio value={'0'} />

                              {/* OptionA Field */}
                              <FormikField name={'optionA'}>
                                {({ field }: { field: FieldInputProps<string> }) => (
                                  <Field invalid={Boolean(props.touched.optionA && props.errors.optionA)} errorText={props.errors.optionA}>
                                    <Input {...field} placeholder={'Opsi A'} />
                                  </Field>
                                )}
                              </FormikField>
                            </HStack>

                            {/* OptionB Field */}
                            <HStack gap={4} align='center'>
                              {/* Radio Input */}
                              <Radio value={'1'} />

                              {/* Option Field */}
                              <FormikField name={'optionB'}>
                                {({ field }: { field: FieldInputProps<string> }) => (
                                  <Field invalid={Boolean(props.touched.optionB && props.errors.optionB)} errorText={props.errors.optionB}>
                                    <Input {...field} placeholder={'Opsi B'} />
                                  </Field>
                                )}
                              </FormikField>
                            </HStack>

                            {/* OptionC Field */}
                            <HStack gap={4} align='center'>
                              {/* Radio Input */}
                              <Radio value={'2'} />

                              {/* Option Field */}
                              <FormikField name={'optionC'}>
                                {({ field }: { field: FieldInputProps<string> }) => (
                                  <Field invalid={Boolean(props.touched.optionC && props.errors.optionC)} errorText={props.errors.optionC}>
                                    <Input {...field} placeholder={'Opsi C'} />
                                  </Field>
                                )}
                              </FormikField>
                            </HStack>

                            {/* OptionD Field */}
                            <HStack gap={4} align='center'>
                              {/* Radio Input */}
                              <Radio value={'3'} />

                              {/* Option Field */}
                              <FormikField name={'optionD'}>
                                {({ field }: { field: FieldInputProps<string> }) => (
                                  <Field invalid={Boolean(props.touched.optionD && props.errors.optionD)} errorText={props.errors.optionD}>
                                    <Input {...field} placeholder={'Opsi D'} />
                                  </Field>
                                )}
                              </FormikField>
                            </HStack>
                          </SimpleGrid>
                        </RadioGroup>
                      </Box>
                    )}
                  </FieldArray>

                  <Button w='full' disabled={mutation.isPending} type='submit'>
                    Submit
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Stack>

        <Toaster />
      </Container>
    );
}
