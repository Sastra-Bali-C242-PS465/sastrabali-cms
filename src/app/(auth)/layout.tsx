import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { LocalStorageTokenProvider } from '@/providers';
import Sidebar from '@/components/layout/sidebar';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  console.log('session', session);

  if (!session || !session.accessToken || new Date(session.expires) < new Date()) redirect('/auth/login');

  return (
    <LocalStorageTokenProvider accessToken={session.accessToken}>
      <Sidebar>{children}</Sidebar>
    </LocalStorageTokenProvider>
  );
}
