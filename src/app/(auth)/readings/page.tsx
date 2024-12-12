'use client';

import { getReadings } from '@/api/reading.api';
import DeleteButton from '@/components/deleteButton';
import { BreadcrumbCurrentLink, BreadcrumbRoot } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import Reading from '@/interfaces/reading.interface';
import { Container, HStack, Image, Link, SimpleGrid, Stack, Table } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

export default function QuizGroupPage() {
  const [readings, setReadings] = useState<Reading[] | null>(null);
  const { data } = useQuery<Reading[]>({
    queryKey: ['readings'],
    queryFn: () => getReadings(),
  });

  useEffect(() => {
    if (data) {
      setReadings(data);
    }
  }, [data]);

  return (
    <Container maxW={'4xl'} marginX={'auto'} marginY={6} paddingX={4}>
      <Stack gap={4}>
        <HStack justifyContent='space-between'>
          <BreadcrumbRoot>
            <BreadcrumbCurrentLink>Readings</BreadcrumbCurrentLink>
          </BreadcrumbRoot>

          <Button colorPalette='gray' color='bg' asChild paddingX={4} paddingY={3}>
            <Link href={'/readings/create'}>Tambah</Link>
          </Button>
        </HStack>

        <Table.ScrollArea borderWidth='1px' maxW='4xl'>
          <Table.Root variant='outline' size='lg' showColumnBorder colorPalette='green'>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader paddingX={4} paddingY={1}>
                  Judul
                </Table.ColumnHeader>
                <Table.ColumnHeader paddingX={4} paddingY={1}>
                  Sampul
                </Table.ColumnHeader>
                <Table.ColumnHeader paddingX={4} paddingY={1}>
                  Aksi
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {readings &&
                readings.length > 0 &&
                readings.map((reading) => (
                  <Table.Row key={reading.id}>
                    <Table.Cell paddingX={4} paddingY={2}>
                      {reading.title}
                    </Table.Cell>
                    <Table.Cell paddingX={4} paddingY={2}>
                      <Image h='100px' rounded='md' src={reading.thumbnailUrl} alt={`${reading.title} thumbnail`} />
                    </Table.Cell>
                    <Table.Cell paddingX={4} paddingY={2} w='100px'>
                      <SimpleGrid gap={1}>
                        <Button colorPalette='green' color='bg' paddingX={4} paddingY={3} asChild>
                          <Link href={`/readings/${reading.id}`}>Detail</Link>
                        </Button>
                        <Button colorPalette='orange' color='bg' paddingX={4} paddingY={3} asChild>
                          <Link href={`/readings/${reading.id}/edit`}>Edit</Link>
                        </Button>
                        <DeleteButton id={reading.id} model='reading' />
                      </SimpleGrid>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>

        <Toaster />
      </Stack>
    </Container>
  );
}
