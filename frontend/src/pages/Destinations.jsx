import { useEffect, useState } from 'react';
import api from '../api/api';
import Table from '../components/Table';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    api.get('/destinations').then(res => setDestinations(res.data.data));
  }, []);

  const columns = ['_id', 'name', 'location', 'description', 'price'];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Destinations</h1>
      <Table columns={columns} data={destinations} />
    </div>
  );
};

export default Destinations;