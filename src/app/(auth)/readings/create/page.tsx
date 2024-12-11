import CreateReadingForm from '@/components/createReadingForm';
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from '@/components/ui/breadcrumb';
import { Container, Stack } from '@chakra-ui/react';

export default function CreateReadingPage() {
  return (
    <Container maxW={'4xl'} marginX={'auto'} marginY={6} paddingX={4}>
      <Stack gap={4}>
        <BreadcrumbRoot>
          <BreadcrumbLink href='/readings'>Readings</BreadcrumbLink>
          <BreadcrumbCurrentLink>Tambah</BreadcrumbCurrentLink>
        </BreadcrumbRoot>

        <CreateReadingForm />
      </Stack>
    </Container>
  );
}
