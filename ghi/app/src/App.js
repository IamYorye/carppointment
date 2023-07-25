import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './Service/TechnicianForm';
import TechnicianList from './Service/TechnicianList';
import AppointmentForm from './Service/AppointmentForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians/new" element={<TechnicianForm />} />
          <Route path="technicians" element={<TechnicianList />} />
          <Route path="appointments/new" element={<AppointmentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
