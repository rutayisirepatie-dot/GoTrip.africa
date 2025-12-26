import { useEffect, useState } from 'react';
import api from '../api/api';
import Table from '../components/Table';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    api.get('/bookings').then(res => setBookings(res.data.data));
  };

  const updateStatus = (id, status) => {
    api.patch(`/admin/bookings/${id}/status`, { status })
      .then(() => fetchBookings());
  };

  const columns = ['_id', 'user', 'service', 'date', 'status', 'actions'];
  const data = bookings.map(booking => ({
    ...booking,
    actions: (
      <div className="flex gap-2">
        <button 
          className="px-2 py-1 bg-green-500 text-white rounded"
          onClick={() => updateStatus(booking._id, 'approved')}
        >
          Approve
        </button>
        <button 
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => updateStatus(booking._id, 'canceled')}
        >
          Cancel
        </button>
      </div>
    )
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Bookings;