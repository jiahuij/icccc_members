// components/AppNavBar.js
'use client';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from './AuthProvider';
import { useRole } from './RoleProvider';

export default function AppNavBar() {
  const { user, logout } = useAuth();
  const { role } = useRole();

  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ICCCC Church Management
        </Typography>
        {user && (
          <Box>
            <Button color="inherit" component={Link} href="/attendance">Attendance</Button>
            <Button color="inherit" component={Link} href="/statistics">Statistics</Button>
            {role === 'admin' && (
              <Button color="inherit" component={Link} href="/members">Members</Button>
            )}
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        )}
        {!user && (
          <Button color="inherit" component={Link} href="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
