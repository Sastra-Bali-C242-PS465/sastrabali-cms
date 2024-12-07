'use client';

import { getGroups } from '@/api/group.api';
import { Button } from '@/components/ui/button';
import Group from '@/interfaces/group.interface';
import useGroupStore from '@/lib/stores/group.store';
import { Container, Image, Link, Table } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

export default function QuizGroupPage() {
  const { groups, setGroups } = useGroupStore();
  const { data } = useQuery<Group[]>({
    queryKey: ['groups'],
    queryFn: () => getGroups(),
  });

  useEffect(() => {
    if (data) {
      setGroups(data);
    }
  }, [data]);

  return (
    <Container maxW={'4xl'} marginX={'auto'} marginY={6} paddingX={4}>
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
                Deskripsi
              </Table.ColumnHeader>
              <Table.ColumnHeader paddingX={4} paddingY={1}>
                Jumlah Soal
              </Table.ColumnHeader>
              <Table.ColumnHeader paddingX={4} paddingY={1}>
                Aksi
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {groups &&
              groups.length > 0 &&
              groups.map((group) => (
                <Table.Row key={group.id}>
                  <Table.Cell paddingX={4} paddingY={2}>
                    {group.title}{' '}
                  </Table.Cell>
                  <Table.Cell paddingX={4} paddingY={2}>
                    <Image rounded='md' src={group.thumbnailUrl} alt={`${group.title} thumbnail`} />
                  </Table.Cell>
                  <Table.Cell paddingX={4} paddingY={2}>
                    {group.description}
                  </Table.Cell>
                  <Table.Cell paddingX={4} paddingY={2}>
                    <Link href={`/groups/${group.id}/quizes`}>{group.totalQuestion}</Link>
                  </Table.Cell>
                  <Table.Cell paddingX={4} paddingY={2}>
                    <Button asChild>
                      <Link href={`/groups/${group.id}/edit`}>Edit</Link>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Container>
  );
}
