"use client";
import RequireAuth from '../../components/RequireAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading) {
      if (user) {
        router.replace('/members');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router, isMounted]);

  return null;
}
