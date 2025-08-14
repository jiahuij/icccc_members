'use client';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

const theme = createTheme();

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}