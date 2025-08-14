// components/RequireAdmin.js
'use client';
import { useRole } from './RoleProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RequireAdmin({ children }) {
  const { role, loading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== 'admin') {
      router.push('/');
    }
  }, [role, loading, router]);

  if (loading || role !== 'admin') return null;
  return children;
}
