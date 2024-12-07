'use client';

import { createGroup } from '@/api/group.api';
import { BreadcrumbRoot } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { CloseButton } from '@/components/ui/close-button';
import { Field } from '@/components/ui/field';
import { FileInput, FileUploadClearTrigger, FileUploadRoot } from '@/components/ui/file-upload';
import { InputGroup } from '@/components/ui/input-group';
import { Toaster, toaster } from '@/components/ui/toaster';
import { Box, BreadcrumbCurrentLink, BreadcrumbLink, Container, Icon, Image, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Field as FormikField, Form, Formik, FieldInputProps, FormikProps } from 'formik';
import React, { useState } from 'react';
import { HiUpload } from 'react-icons/hi';
import * as Yup from 'yup';

export default function CreateQuizGroupPage() {
  const [thumbnail, setThumbnail] = useState('');
  interface CreateQuizGroupFormValues {
    title: string;
    description: string;
    thumbnail: string;
  }
  const createQuizGroupFormInitialValues = {
    title: '',
    description: '',
    thumbnail: '',
  };
  const createQuizGroupValidationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    thumbnail: Yup.string().required(),
  });

  const mutation = useMutation({
    mutationFn: (values: { title: string; description: string; thumbnail: string }) => createGroup(values),
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

  return (
    <Container maxW={'2xl'} marginX='auto' marginY={6} paddingX={4}>
      <Stack gap={4}>
        <BreadcrumbRoot>
          <BreadcrumbLink href='/groups'>Groups</BreadcrumbLink>
          <BreadcrumbCurrentLink>Create</BreadcrumbCurrentLink>
        </BreadcrumbRoot>

        <Formik
          initialValues={createQuizGroupFormInitialValues}
          validationSchema={createQuizGroupValidationSchema}
          onSubmit={(values, { resetForm }) => {
            mutation.mutate(values, {
              onSuccess: () => {
                resetForm();
              },
            });
          }}
        >
          {(props) => (
            <Form>
              <VStack alignItems='start'>
                {/* Title Field */}
                <FormikField name='title'>
                  {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateQuizGroupFormValues> }) => (
                    <Field label='Judul' invalid={Boolean(form.touched.title && form.errors.title)} errorText={form.errors.title}>
                      <Input {...field} placeholder='Judul' />
                    </Field>
                  )}
                </FormikField>

                {/* Description Field */}
                <FormikField name='description'>
                  {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateQuizGroupFormValues> }) => (
                    <Field label='Deskripsi' invalid={Boolean(form.touched.description && form.errors.description)} errorText={form.errors.description}>
                      <Input {...field} placeholder='Deskripsi' />
                    </Field>
                  )}
                </FormikField>

                {/* Thumbnail FileUpload */}
                <FormikField name={'thumbnail'}>
                  {({ form }: { form: FormikProps<CreateQuizGroupFormValues> }) => (
                    <Field
                      label='Thumbnail'
                      helperText='File dengan format .png atau .jpeg. Ukuran maks 200kb.'
                      invalid={Boolean(form.touched.thumbnail && form.errors.thumbnail)}
                      errorText={form.errors.thumbnail}
                    >
                      <FileUploadRoot
                        onFileAccept={(details) => {
                          props.setFieldValue('thumbnail', details.files[0]);
                          setThumbnail(URL.createObjectURL(details.files[0]));
                        }}
                        accept={['image/jpeg', 'image/png']}
                        maxFileSize={1024 * 200}
                        required
                      >
                        <InputGroup
                          w='full'
                          startElement={
                            <Icon ms={1}>
                              <HiUpload />
                            </Icon>
                          }
                          endElement={
                            <FileUploadClearTrigger asChild>
                              <CloseButton onClick={() => setThumbnail('')} me='-1' size='xs' variant='plain' focusVisibleRing='inside' focusRingWidth='2px' pointerEvents='auto' color='fg.subtle' />
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
                {thumbnail && (
                  <VStack alignItems='start'>
                    <Text fontSize='sm'>Preview:</Text>
                    <Image height='200px' src={thumbnail} />
                  </VStack>
                )}

                <Button disabled={mutation.isPending} w='full' type='submit'>
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
