import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Guides from './pages/Guides';
import Bookings from './pages/Bookings';
import Destinations from './pages/Destinations';
import Translators from './pages/Translators';
import Accommodations from './pages/Accommodations';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/guides" element={<Guides />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/translators" element={<Translators />} />
            <Route path="/accommodations" element={<Accommodations />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;