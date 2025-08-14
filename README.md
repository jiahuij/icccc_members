# ICCCC Church Management Application

This project is a Next.js application for managing church members, tracking attendance, and generating statistics for ICCCC (International Community Church of Christ).

## Features
- Member management (add, update, remove, view)
- Attendance tracking for small groups and Sunday services
- Statistics dashboard with charts and reports
- User authentication and role-based access (staff, member)
- Responsive and accessible UI

## Tech Stack
- Next.js (App Router)
- Firebase (Firestore, Auth)
- Material-UI (MUI)
- Chart.js (or Recharts)

## Getting Started
1. Clone the repository or download the project files.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Firestore and Authentication
   - Copy your Firebase config to `.env.local` (see `.env.example`)
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment
- Deploy to Vercel: https://vercel.com/

## License
MIT
