// components/AttendanceList.js
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { List, ListItem, ListItemText, Typography, CircularProgress, Paper, Box } from '@mui/material';

export default function AttendanceList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttendance() {
      const { data, error } = await supabase.from('attendance').select('*').order('date', { ascending: false });
      setRecords(data || []);
      setLoading(false);
    }
    fetchAttendance();
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>;
  if (!records.length) return <Typography align="center">No attendance records found.</Typography>;

  return (
    <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" mb={2}>Attendance Records</Typography>
      <List>
        {records.map(record => (
          <ListItem key={record.id} divider>
            <ListItemText
              primary={`${record.type === 'sunday' ? 'Sunday Service' : 'Small Group'} - ${record.date}`}
              secondary={`Attendees: ${(record.attendees || []).join(', ')}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
