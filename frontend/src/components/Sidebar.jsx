import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white h-screen p-4">
    <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
    <nav className="flex flex-col gap-2">
      <Link to="/guides" className="hover:bg-gray-700 p-2 rounded">Guides</Link>
      <Link to="/bookings" className="hover:bg-gray-700 p-2 rounded">Bookings</Link>
      <Link to="/destinations" className="hover:bg-gray-700 p-2 rounded">Destinations</Link>
      <Link to="/translators" className="hover:bg-gray-700 p-2 rounded">Translators</Link>
      <Link to="/accommodations" className="hover:bg-gray-700 p-2 rounded">Accommodations</Link>
    </nav>
  </div>
);

export default Sidebar;