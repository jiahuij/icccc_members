// utils/firestoreUser.js
import { supabase } from '../supabaseClient';

export async function getUserProfile(uid) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uid', uid)
    .single();
  if (error) return null;
  return data;
}

export async function setUserProfile(uid, data) {
  // Upsert user profile by uid
  const { error } = await supabase
    .from('users')
    .upsert([{ uid, ...data }], { onConflict: ['uid'] });
  return !error;
}
