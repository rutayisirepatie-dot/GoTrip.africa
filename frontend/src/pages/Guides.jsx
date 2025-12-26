import { useEffect, useState } from 'react';
import api from '../api/api';
import Table from '../components/Table';

const Guides = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    api.get('/guides').then(res => setGuides(res.data.data));
  }, []);

  const columns = ['_id', 'name', 'specialty', 'rating', 'price', 'available'];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Guides</h1>
      <Table columns={columns} data={guides} />
    </div>
  );
};

export default Guides;