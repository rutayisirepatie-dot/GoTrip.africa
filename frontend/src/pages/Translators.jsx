import { useEffect, useState } from 'react';
import api from '../api/api';
import Table from '../components/Table';

const Translators = () => {
  const [translators, setTranslators] = useState([]);

  useEffect(() => {
    api.get('/translators').then(res => setTranslators(res.data.data));
  }, []);

  const columns = ['_id', 'name', 'languages', 'rating', 'price', 'available'];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Translators</h1>
      <Table columns={columns} data={translators} />
    </div>
  );
};

export default Translators;