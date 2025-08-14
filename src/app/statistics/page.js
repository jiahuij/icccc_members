import RequireAuth from '../../components/RequireAuth';
import StatisticsDashboard from '../../components/StatisticsDashboard';

// Statistics dashboard placeholder
export default function StatisticsPage() {
  return (
    <RequireAuth>
      <StatisticsDashboard />
    </RequireAuth>
  );
}
