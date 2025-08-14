// components/AttendanceAnalytics.js
'use client';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { supabase } from '../supabaseClient';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AttendanceAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: records, error } = await supabase.from('attendance').select('*');
      // Group by date
      const byDate = {};
      (records || []).forEach(r => {
        if (!byDate[r.date]) byDate[r.date] = 0;
        byDate[r.date] += (r.attendees?.length || 0);
      });
      const labels = Object.keys(byDate).sort();
      const counts = labels.map(date => byDate[date]);
      setData({ labels, datasets: [{ label: 'Attendance Count', data: counts, backgroundColor: '#1976d2' }] });
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;
  if (!data) return <Typography>No attendance data.</Typography>;

  return (
    <Box my={4}>
      <Typography variant="h6" mb={2}>Attendance Trends</Typography>
      <Bar data={data} />
    </Box>
  );
}
