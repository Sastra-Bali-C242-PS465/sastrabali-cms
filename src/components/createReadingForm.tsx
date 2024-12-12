'use client';

import { useEffect, useRef, useState } from 'react';
import EditorJS, { LogLevels, OutputData, ToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Table from '@editorjs/table';
import { Box, Heading, Icon, Image, Input, Text, VStack } from '@chakra-ui/react';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { createReading } from '@/api/reading.api';
import { Field as FormikField, Form, Formik, FieldInputProps, FormikProps } from 'formik';
import { Field } from './ui/field';
import { FileInput, FileUploadClearTrigger, FileUploadRoot } from './ui/file-upload';
import { InputGroup } from './ui/input-group';
import { HiUpload } from 'react-icons/hi';
import { CloseButton } from './ui/close-button';
import { toaster, Toaster } from './ui/toaster';
import * as Yup from 'yup';

interface CreateReadingFormValues {
  title: string;
  content: string;
  thumbnail: string;
}

const createReadingValidationSchema = Yup.object().shape({
  title: Yup.string().required(),
  thumbnail: Yup.string().required(),
});

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: 'header',
        data: {
          text: 'This is my awesome editor!',
          level: 1,
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = 'editorjs';

export default function CreateReadingForm() {
  const [thumbnail, setThumbnail] = useState('');
  const ejInstance = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<OutputData>(DEFAULT_INITIAL_DATA);
  const [editorDataStringify, setEditorDataStringify] = useState('');
  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: 'ERROR' as LogLevels.ERROR,
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        if (!ejInstance.current) return;
        const content = await ejInstance.current.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      autofocus: true,
      tools: {
        header: Header,
        table: {
          class: Table as ToolConstructable,
          inlineToolbar: true,
          config: {
            withHeadings: true,
          },
        },
      },
    });
  };

  const clickFileUploadCloseButton = () => {
    const button = document.querySelector<HTMLButtonElement>(`button[aria-label="Clear selected files"]`);
    if (button) button.click();
  };

  const mutation = useMutation({
    mutationFn: (values: CreateReadingFormValues) => createReading(values),
    onSuccess: (data) => {
      ejInstance.current?.clear();
      setEditorData(DEFAULT_INITIAL_DATA);
      setEditorDataStringify('');
      setThumbnail('');
      clickFileUploadCloseButton();
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

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  useEffect(() => {
    setEditorDataStringify(JSON.stringify(editorData));
  }, [editorData]);

  return (
    <Box>
      <Formik
        initialValues={{ title: '', thumbnail: '' }}
        validationSchema={createReadingValidationSchema}
        onSubmit={(values, { resetForm }) => {
          mutation.mutate({ ...values, content: editorDataStringify });
          resetForm();
        }}
      >
        {(props) => (
          <Form>
            <VStack alignItems='start' gap={4}>
              {/* Title Field */}
              <FormikField name='title'>
                {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<CreateReadingFormValues> }) => (
                  <Field label='Judul' invalid={Boolean(form.touched.title && form.errors.title)} errorText={form.errors.title}>
                    <Input {...field} placeholder='Judul' />
                  </Field>
                )}
              </FormikField>

              {/* Thumbnail FileUpload */}
              <FormikField name={'thumbnail'}>
                {({ form }: { form: FormikProps<CreateReadingFormValues> }) => (
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

              <Box w='full'>
                <Heading>Editor</Heading>
                {/* Editorjs placeholder */}
                <div id={EDITTOR_HOLDER_ID}></div>
              </Box>

              <Button loading={mutation.isPending} w='full' type='submit'>
                Submit
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>

      <Toaster />
    </Box>
  );
}
