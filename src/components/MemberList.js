// components/MemberList.js
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { List, ListItem, ListItemText, Typography, CircularProgress, IconButton, Paper, Box, Stack, Tooltip, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MemberForm from './MemberForm';

export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    const { data, error } = await supabase.from('members').select('*').order('id');
    setMembers(data || []);
    setLoading(false);
  }

  async function handleAdd(member) {
    await supabase.from('members').insert([member]);
    fetchMembers();
  }

  async function handleEdit(member) {
    await supabase.from('members').update(member).eq('id', editing.id);
    setEditing(null);
    fetchMembers();
  }

  async function handleDelete(id) {
    await supabase.from('members').delete().eq('id', id);
    fetchMembers();
  }

  if (loading) return <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>;

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Typography variant="h5" mb={2} align="center">Church Members</Typography>
      <Divider sx={{ mb: 2 }} />
      <Box mb={3}>
        {editing ? (
          <MemberForm
            onSubmit={handleEdit}
            initialData={editing}
            submitLabel="Update Member"
          />
        ) : (
          <MemberForm onSubmit={handleAdd} />
        )}
      </Box>
      <List>
        {members.map(member => (
          <ListItem key={member.id} divider
            secondaryAction={
              <Stack direction="row" spacing={1}>
                <Tooltip title="Edit">
                  <IconButton edge="end" aria-label="edit" onClick={() => setEditing(member)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(member.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            }
          >
            <ListItemText
              primary={<Typography fontWeight={500}>{member.name}</Typography>}
              secondary={member.email}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
