// components/RoleProvider.js
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { getUserProfile } from '../utils/firestoreUser';

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    getUserProfile(user.uid).then(profile => {
      setRole(profile?.role || 'member');
      setLoading(false);
    });
  }, [user]);

  return (
    <RoleContext.Provider value={{ role, loading }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
