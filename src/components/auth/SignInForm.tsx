'use client';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Container, Input, VStack } from '@chakra-ui/react';
import { Field as FormikField, Form, Formik, FieldInputProps, FormikProps } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as Yup from 'yup';
import { Toaster, toaster } from '../ui/toaster';

export default function SignInForm() {
  const router = useRouter();
  interface SignInFormValues {
    email: string;
    password: string;
  }
  const SignInValidationSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  return (
    <Container maxW={'2xl'} marginX='auto' marginY={6} paddingX={4}>
      <Toaster />

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInValidationSchema}
        onSubmit={async (values) => {
          try {
            const res = await signIn('credentials', { redirect: false, redirectTo: '/groups', ...values });

            if (res?.error) {
              return toaster.create({
                type: 'error',
                description: 'Kredensial tidal valid!',
                duration: 5000,
              });
            } else if (res?.url) {
              toaster.create({
                type: 'success',
                description: 'Berhasil masuk.',
                duration: 3000,
              });

              setTimeout(() => {
                if (res.url) router.push(res.url);
              }, 3000);
            }
          } catch (error) {
            throw error;
          }
        }}
      >
        {(props) => (
          <Form>
            <VStack alignItems='start'>
              {/* Email Field */}
              <FormikField name='email'>
                {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<SignInFormValues> }) => (
                  <Field label='Email' invalid={Boolean(form.touched.email && form.errors.email)} errorText={form.errors.email}>
                    <Input {...field} placeholder='Email' />
                  </Field>
                )}
              </FormikField>

              {/* Password Field */}
              <FormikField name='password'>
                {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<SignInFormValues> }) => (
                  <Field label='Kata Sandi' invalid={Boolean(form.touched.password && form.errors.password)} errorText={form.errors.password}>
                    <Input {...field} type='password' placeholder='Kata Sandi' />
                  </Field>
                )}
              </FormikField>

              <Button w='full' type='submit'>
                Submit
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
