'use client';

import { getGroups } from '@/api/group.api';
import { getUsers } from '@/api/user.api';
import { Button } from '@/components/ui/button';
import { User } from '@/interfaces/user.interface';
import useUserStore from '@/lib/stores/user.store';
import { Container, Image, Link, Table } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

export default function UserPage() {
  const { users, setUsers } = useUserStore();
  const { data } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  return (
    <Container maxW={'4xl'} marginX={'auto'} marginY={6} paddingX={4}>
      <Table.ScrollArea borderWidth='1px' maxW='4xl'>
        <Table.Root variant='outline' size='lg' showColumnBorder colorPalette='green'>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader paddingX={4} paddingY={1}>
                Nama Lengkap
              </Table.ColumnHeader>
              <Table.ColumnHeader paddingX={4} paddingY={1}>
                Email
              </Table.ColumnHeader>
              <Table.ColumnHeader paddingX={4} paddingY={1}>
                Poin
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell paddingX={4} paddingY={2}>
                    {user.fullname}
                  </Table.Cell>
                  <Table.Cell paddingX={4} paddingY={2}>
                    {user.email}
                  </Table.Cell>
                  <Table.Cell paddingX={4} paddingY={2}>
                    {user.points}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Container>
  );
}
