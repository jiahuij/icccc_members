// login/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography, Alert, Paper, Stack, Link } from '@mui/material';
import { useAuth } from '../../components/AuthProvider';
import { supabase } from '../../supabaseClient';

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  // Registration fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRegSuccess('');
    setRegLoading(true);
    try {
      // 1. Create user in Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: regEmail,
        password: regPassword,
        options: {
          data: { name: regName }
        }
      });
      if (signUpError) throw signUpError;
      // 2. Insert into members table
      const { error: memberError } = await supabase.from('members').insert([
        { name: regName, email: regEmail }
      ]);
      if (memberError) throw memberError;
      setRegSuccess('Registration successful! Please check your email to confirm and then log in.');
      setRegName('');
      setRegEmail('');
      setRegPassword('');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setRegLoading(false);
    }
  };

  if (user && !loading) {
    router.push('/');
    return null;
  }

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" mb={2} align="center">
          {registerMode ? 'Register as New Member' : 'Login'}
        </Typography>
        {registerMode ? (
          <form onSubmit={handleRegisterSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                required
                fullWidth
              />
              {error && <Alert severity="error">{error}</Alert>}
              {regSuccess && <Alert severity="success">{regSuccess}</Alert>}
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={regLoading}>
                {regLoading ? 'Registering...' : 'Register'}
              </Button>
              <Button onClick={() => { setRegisterMode(false); setError(''); setRegSuccess(''); }} color="secondary" fullWidth>
                Back to Login
              </Button>
            </Stack>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                fullWidth
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                Login
              </Button>
              <Button onClick={() => { setRegisterMode(true); setError(''); setRegSuccess(''); }} color="secondary" fullWidth>
                Register as New Member
              </Button>
            </Stack>
          </form>
        )}
      </Paper>
    </Box>
  );
}
