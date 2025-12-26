const StatsCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-gray-500">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default StatsCard;