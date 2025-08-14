// components/AttendanceExport.js
'use client';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { supabase } from '../supabaseClient';

function toCSV(rows) {
  if (!rows.length) return '';
  const header = Object.keys(rows[0]).join(',');
  const body = rows.map(row => Object.values(row).join(',')).join('\n');
  return header + '\n' + body;
}

export default function AttendanceExport() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchAttendance() {
      const { data, error } = await supabase.from('attendance').select('*');
      setRecords(data || []);
    }
    fetchAttendance();
  }, []);

  const handleExport = () => {
    const csv = toCSV(records);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outlined" onClick={handleExport} sx={{ mb: 2 }}>
      Export Attendance CSV
    </Button>
  );
}
