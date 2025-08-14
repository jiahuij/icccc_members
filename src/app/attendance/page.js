import RequireAuth from '../../components/RequireAuth';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import AttendanceForm from '../../components/AttendanceForm';
import AttendanceList from '../../components/AttendanceList';
import AttendanceAnalytics from '../../components/AttendanceAnalytics';
import AttendanceExport from '../../components/AttendanceExport';
import { Box, Paper, Typography, Divider } from '@mui/material';

// Attendance page
export default function AttendancePage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase.from('members').select('*').order('id');
      setMembers(data || []);
    }
    fetchMembers();
  }, []);

  async function handleAttendance(data) {
    await supabase.from('attendance').insert([data]);
  }

  return (
    <RequireAuth>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 2 }}>
        <Typography variant="h5" mb={2} align="center">Attendance Tracking</Typography>
        <Divider sx={{ mb: 2 }} />
        <Box mb={3}>
          <AttendanceForm members={members} onSubmit={handleAttendance} />
        </Box>
        <AttendanceExport />
        <AttendanceAnalytics />
        <AttendanceList />
      </Paper>
    </RequireAuth>
  );
}
