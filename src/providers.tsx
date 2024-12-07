'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function LocalStorageTokenProvider({ accessToken, children }: { accessToken: string; children: React.ReactNode }) {
  useEffect(() => {
    localStorage.setItem('token', `Bearer ${accessToken}`);
  }, [accessToken]);

  return <div>{children}</div>;
}
