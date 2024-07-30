import React, { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage.external';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const store = staticGenerationAsyncStorage.getStore();
  if (!store) {
    return null;
  }

  let path = store.urlPathname;

  if (token) {
    return <div style={{ flex: 1 }}>{children}</div>;
  } else {
    if (!path.includes('/login')) {
      redirect('/admin/login');
    } else {
      return <div style={{ flex: 1 }}>{children}</div>;
    }
  }

  return <div></div>;
}
