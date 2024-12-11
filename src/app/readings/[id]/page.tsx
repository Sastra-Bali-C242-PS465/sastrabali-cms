'use client';

import { Container, Heading, Stack, VStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import styles from '@/styles/editor.module.css';
import { useEffect, useState } from 'react';
import edjsParser from 'editorjs-parser';
import { useQuery } from '@tanstack/react-query';
import { getReadingById } from '@/api/reading.api';
import Reading from '@/interfaces/reading.interface';
import { useSession } from 'next-auth/react';
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from '@/components/ui/breadcrumb';

interface EdjTableData {
  stretched: boolean;
  withHeadings: boolean;
  content: [string][];
}

const customParsers = {
  table: function (data: EdjTableData) {
    const { withHeadings, content } = data;

    if (withHeadings && content.length > 0) {
      const headerRow = content[0]; // First row as header
      const bodyRows = content.slice(1); // Remaining rows as body

      return `
        <table>
          <thead>
            <tr>
              ${headerRow.map((col) => `<th>${col}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${bodyRows.map((row) => `<tr>${row.map((col) => `<td>${col}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      `;
    }

    // Render non-header table
    return `
      <table>
        <tbody>
          ${content.map((row) => `<tr>${row.map((col) => `<td>${col}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;
  },
};

export default function ReadingPage() {
  const { id } = useParams<{ id: string }>();
  const [markup, setMarkup] = useState('');
  const parser = new edjsParser(undefined, customParsers);
  const session = useSession();

  const { data } = useQuery<Reading>({
    queryKey: ['readings', id],
    queryFn: () => getReadingById(id),
  });

  useEffect(() => {
    if (data) {
      const parseMarkupResult = parser.parse(JSON.parse(data.content));
      setMarkup(parseMarkupResult);
    }
  }, [data]);

  return (
    <Container maxW={'2xl'} marginX={'auto'} marginY={6} paddingX={4}>
      <Stack gap={4}>
        {session.data?.user && (
          <BreadcrumbRoot>
            <BreadcrumbLink href='/readings'>Readings</BreadcrumbLink>
            <BreadcrumbCurrentLink>{data?.title}</BreadcrumbCurrentLink>
          </BreadcrumbRoot>
        )}

        <VStack gap={4}>
          <Heading>{data?.title}</Heading>
          <div className={styles.edjMarkup} dangerouslySetInnerHTML={{ __html: markup }}></div>
        </VStack>
      </Stack>
    </Container>
  );
}
