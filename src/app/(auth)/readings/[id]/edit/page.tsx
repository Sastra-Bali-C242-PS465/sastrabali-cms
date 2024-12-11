import EditReadingForm from '@/components/editReadingForm';
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from '@/components/ui/breadcrumb';
import { Container, Stack } from '@chakra-ui/react';

export default function EditReadingPage() {
  return (
    <Container maxW={'4xl'} marginX={'auto'} marginY={6} paddingX={4}>
      <Stack gap={4}>
        <BreadcrumbRoot>
          <BreadcrumbLink href='/readings'>Readings</BreadcrumbLink>
          <BreadcrumbCurrentLink>Edit</BreadcrumbCurrentLink>
        </BreadcrumbRoot>

        <EditReadingForm />
      </Stack>
    </Container>
  );
}
