import { useEffect, useState } from 'react';
import api from '../api/api';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/admin').then(res => setStats(res.data.data));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Users" value={stats.stats.totalUsers} />
        <StatsCard title="Total Bookings" value={stats.stats.totalBookings} />
        <StatsCard title="Active Bookings" value={stats.stats.activeBookings} />
        <StatsCard title="Total Revenue" value={`$${stats.stats.totalRevenue}`} />
      </div>
    </div>
  );
};

export default Dashboard;