// components/AttendanceForm.js
'use client';
import { useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';

export default function AttendanceForm({ members, onSubmit }) {
  const [selected, setSelected] = useState([]);
  const [type, setType] = useState('sunday');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ attendees: selected, type, date: new Date().toISOString().slice(0, 10) });
    setSelected([]);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={2}>
      <Typography variant="h6">Mark Attendance</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Attendance Type</InputLabel>
        <Select value={type} label="Attendance Type" onChange={e => setType(e.target.value)}>
          <MenuItem value="sunday">Sunday Service</MenuItem>
          <MenuItem value="smallgroup">Small Group</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Members</InputLabel>
        <Select
          multiple
          value={selected}
          onChange={e => setSelected(e.target.value)}
          renderValue={selected => selected.map(id => {
            const m = members.find(mem => mem.id === id);
            return m ? m.name : id;
          }).join(', ')}
        >
          {members.map(member => (
            <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Attendance
      </Button>
    </Box>
  );
}
