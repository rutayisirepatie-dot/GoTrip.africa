import { useEffect, useState } from 'react';
import api from '../api/api';
import Table from '../components/Table';

const ResourcePage = ({ title, endpoint, columns, actions }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api.get(endpoint).then(res => setData(res.data.data));
  };

  const handleAction = (id, actionFunc) => {
    actionFunc(id).then(fetchData);
  };

  const mappedData = data.map(item => {
    if (actions) {
      const actionElements = actions.map(({ label, onClick, className }, index) => (
        <button
          key={index}
          className={`px-2 py-1 rounded text-white ${className}`}
          onClick={() => handleAction(item._id, onClick)}
        >
          {label}
        </button>
      ));
      return { ...item, actions: <div className="flex gap-2">{actionElements}</div> };
    }
    return item;
  });

  const displayColumns = actions ? [...columns, 'actions'] : columns;

  return (
    <div className="p-6 flex-1">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <Table columns={displayColumns} data={mappedData} />
    </div>
  );
};

export default ResourcePage;