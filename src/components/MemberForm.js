// components/MemberForm.js
'use client';
import { useState } from 'react';
import { TextField, Button, Box, Paper, Stack } from '@mui/material';

export default function MemberForm({ onSubmit, initialData, submitLabel = 'Add Member' }) {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {submitLabel}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
