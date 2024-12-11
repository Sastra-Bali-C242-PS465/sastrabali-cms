'use client';

import { getQuizesByGroupId } from '@/api/quiz.api';
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Container, HStack, Image, Link, List, Stack, Table } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';

interface Quiz {
  id: number;
  question: string;
  options: {
    id: number;
    option: string;
    isAnswer: boolean;
  }[];
}

export default function QuestionPage() {
  const { id: groupId } = useParams<{ id: string }>();
  const [quizes, setQuizes] = useState<Quiz[] | null>(null);

  const { data } = useQuery({
    queryKey: ['quizes', 'group'],
    queryFn: () => getQuizesByGroupId(Number(groupId)),
  });

  useEffect(() => {
    if (data) {
      setQuizes(data);
    }
  }, [data]);

  return (
    <Container maxW={'4xl'} marginX={'auto'} marginY={6} paddingX={4}>
      <Stack gap={4}>
        <HStack justifyContent='space-between'>
          <BreadcrumbRoot>
            <BreadcrumbLink href='/groups'>Groups</BreadcrumbLink>
            <BreadcrumbCurrentLink>Quizes</BreadcrumbCurrentLink>
          </BreadcrumbRoot>

          <Button colorPalette='gray' color='bg' asChild paddingX={4} paddingY={3}>
            <Link href={`/groups/${groupId}/quizes/create`}>Tambah</Link>
          </Button>
        </HStack>

        <Table.ScrollArea borderWidth='1px' maxW='4xl'>
          <Table.Root variant='outline' size='lg' showColumnBorder colorPalette='green'>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader paddingX={4} paddingY={1}>
                  Soal
                </Table.ColumnHeader>
                <Table.ColumnHeader paddingX={4} paddingY={1}>
                  Opsi
                </Table.ColumnHeader>
                <Table.ColumnHeader paddingX={4} paddingY={1}>
                  Aksi
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {quizes &&
                quizes.length > 0 &&
                quizes.map((quiz) => (
                  <Table.Row key={quiz.id}>
                    <Table.Cell paddingX={4} paddingY={2}>
                      <Image h='200px' rounded='md' src={quiz.question} alt='soal' />
                    </Table.Cell>
                    <Table.Cell paddingX={4} paddingY={2}>
                      <List.Root>
                        {quiz.options.map((option) => (
                          <List.Item key={option.id}>
                            {option.option}
                            {option.isAnswer && (
                              <List.Indicator asChild color='green.500'>
                                <HiCheck />
                              </List.Indicator>
                            )}
                          </List.Item>
                        ))}
                      </List.Root>
                    </Table.Cell>
                    <Table.Cell paddingX={4} paddingY={2}>
                      <Button colorPalette='orange' color='bg' asChild>
                        <Link href='#'>Edit</Link>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Stack>
    </Container>
  );
}
