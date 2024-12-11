import { Box, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import { Button } from '../ui/button';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Flex position='fixed' left={0} top={0} bottom={0} w={48} display={{ lg: 'block', lgDown: 'none' }} direction='column' bg='#09423E' color='bg'>
        <Button unstyled={true} w='full' _hover={{ bg: 'white/10' }} p={4} asChild>
          <Link href='/groups'>Groups</Link>
        </Button>
        <Button unstyled={true} w='full' _hover={{ bg: 'white/10' }} p={4} asChild>
          <Link href='/readings'>Readings</Link>
        </Button>
      </Flex>

      <Box marginLeft={{ lg: 48, lgDown: 0 }}>{children}</Box>
    </div>
  );
}
