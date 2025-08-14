// components/StatisticsDashboard.js
'use client';
import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { supabase } from '../supabaseClient';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function StatisticsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { data: members, error: err1 } = await supabase.from('members').select('*');
      const { data: attendance, error: err2 } = await supabase.from('attendance').select('*');
      // Attendance by type
      const byType = { sunday: 0, smallgroup: 0 };
      (attendance || []).forEach(r => {
        if (r.type && byType[r.type] !== undefined) {
          byType[r.type] += (r.attendees?.length || 0);
        }
      });
      // Attendance by member
      const memberAttendance = {};
      (members || []).forEach(m => { memberAttendance[m.name] = 0; });
      (attendance || []).forEach(r => {
        (r.attendees || []).forEach(id => {
          const member = (members || []).find(m => m.id === id);
          if (member) memberAttendance[member.name]++;
        });
      });
      // Analytics by geolocation (assuming 'location' field on member)
      const geoCounts = {};
      (members || []).forEach(m => {
        const loc = m.location || 'Unknown';
        geoCounts[loc] = (geoCounts[loc] || 0) + 1;
      });
      setStats({
        totalMembers: (members || []).length,
        attendanceByType: byType,
        memberAttendance,
        geoCounts,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>;
  if (!stats) return <Typography>No statistics available.</Typography>;

  return (
    <Box my={4}>
      <Typography variant="h5" mb={2} align="center">Statistics Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Members</Typography>
            <Typography variant="h3" color="primary.main">{stats.totalMembers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Attendance by Type</Typography>
            <Pie data={{
              labels: ['Sunday Service', 'Small Group'],
              datasets: [{
                data: [stats.attendanceByType.sunday, stats.attendanceByType.smallgroup],
                backgroundColor: ['#1976d2', '#43a047'],
              }],
            }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Attendance by Member</Typography>
            <Bar data={{
              labels: Object.keys(stats.memberAttendance),
              datasets: [{
                label: 'Attendance Count',
                data: Object.values(stats.memberAttendance),
                backgroundColor: '#1976d2',
              }],
            }} options={{ indexAxis: 'y' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Members by Geolocation</Typography>
            <Pie data={{
              labels: Object.keys(stats.geoCounts),
              datasets: [{
                data: Object.values(stats.geoCounts),
                backgroundColor: [
                  '#1976d2', '#43a047', '#fbc02d', '#e53935', '#8e24aa', '#00acc1', '#ff7043', '#d4e157', '#6d4c41', '#789262'
                ],
              }],
            }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
