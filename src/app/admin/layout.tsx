import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";

export default function AdminLayout({ children }) {
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
      redirect('/admin/login', 'replace');
    } else {
      return <div style={{ flex: 1 }}>{children}</div>;
    }
  }

  return <div></div>;
}
