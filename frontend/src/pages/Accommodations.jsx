import { useEffect, useState } from 'react';
import api from '../api/api';
import Table from '../components/Table';

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    api.get('/accommodations').then(res => setAccommodations(res.data.data));
  }, []);

  const columns = ['_id', 'name', 'location', 'type', 'rating', 'price'];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Accommodations</h1>
      <Table columns={columns} data={accommodations} />
    </div>
  );
};

export default Accommodations;