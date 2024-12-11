'use client';

import { editGroup, getGroupById } from '@/api/group.api';
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { CloseButton } from '@/components/ui/close-button';
import { Field } from '@/components/ui/field';
import { FileInput, FileUploadClearTrigger, FileUploadRoot } from '@/components/ui/file-upload';
import { InputGroup } from '@/components/ui/input-group';
import { Toaster, toaster } from '@/components/ui/toaster';
import Group from '@/interfaces/group.interface';
import { Container, Stack, VStack, Input, Icon, Text, Image } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik, Form, FieldInputProps, FormikProps, Field as FormikField } from 'formik';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiUpload } from 'react-icons/hi';
import * as Yup from 'yup';

export interface EditQuizGroupFormValues {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function EditQuizGroupPage() {
  const { id } = useParams<{ id: string }>();
  const [thumbnail, setThumbnail] = useState('');
  const [group, setGroup] = useState<Group | null>(null);
  const createQuizGroupValidationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
  });

  const { data } = useQuery({
    queryKey: ['group'],
    queryFn: () => getGroupById(id),
  });

  const mutation = useMutation({
    mutationFn: (values: { id: string; title: string; description: string; thumbnail: string }) => editGroup(values),
    onSuccess: (data) => {
      if (data) {
        setGroup(data.group);
        return toaster.create({
          description: data.message,
          type: 'success',
          duration: 5000,
        });
      }
    },
    onError: (error) => {
      return toaster.create({
        description: error.message,
        type: 'error',
        duration: 5000,
      });
    },
  });

  useEffect(() => {
    if (data) {
      setGroup(data);
      setThumbnail(data.thumbnailUrl);
    }
  }, [data]);

  if (group)
    return (
      <Container maxW={'2xl'} marginX='auto' marginY={6} paddingX={4}>
        <Stack gap={4}>
          <BreadcrumbRoot>
            <BreadcrumbLink href='/groups'>Groups</BreadcrumbLink>
            <BreadcrumbCurrentLink>Create</BreadcrumbCurrentLink>
          </BreadcrumbRoot>

          <Formik
            enableReinitialize
            initialValues={{ id: id, title: group.title, description: group.description, thumbnail: '' }}
            validationSchema={createQuizGroupValidationSchema}
            onSubmit={(values, { resetForm }) => {
              mutation.mutate(values);
              resetForm();
            }}
          >
            {(props) => (
              <Form>
                <VStack alignItems='start'>
                  {/* Title Field */}
                  <FormikField name='title'>
                    {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<EditQuizGroupFormValues> }) => (
                      <Field label='Judul' invalid={Boolean(form.touched.title && form.errors.title)} errorText={form.errors.title}>
                        <Input {...field} placeholder='Judul' />
                      </Field>
                    )}
                  </FormikField>

                  {/* Description Field */}
                  <FormikField name='description'>
                    {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<EditQuizGroupFormValues> }) => (
                      <Field label='Deskripsi' invalid={Boolean(form.touched.description && form.errors.description)} errorText={form.errors.description}>
                        <Input {...field} placeholder='Deskripsi' />
                      </Field>
                    )}
                  </FormikField>

                  {/* Thumbnail FileUpload */}
                  <FormikField name='thumbnail'>
                    {({ form }: { form: FormikProps<EditQuizGroupFormValues> }) => (
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
                      <Image height='200px' src={thumbnail} alt='Thumbnail preview' />
                    </VStack>
                  )}

                  <Button disabled={mutation.isPending || !props.dirty} w='full' type='submit'>
                    Save
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
