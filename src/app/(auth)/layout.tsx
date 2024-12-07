import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { LocalStorageTokenProvider } from '@/providers';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session || !session.accessToken || new Date(session.expires) < new Date()) redirect('/auth/login');

  return <LocalStorageTokenProvider accessToken={session.accessToken}>{children}</LocalStorageTokenProvider>;
}
