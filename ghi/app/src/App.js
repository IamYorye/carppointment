import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './Service/TechnicianForm';
import TechnicianList from './Service/TechnicianList';
import AppointmentForm from './Service/AppointmentForm';
import AppointmentsList from './Service/AppointmentList';
import ServiceHistory from './Service/ServiceHistory';
import ManufacturerForm from './Inventory/ManufacturerForm';
import ManufacturerList from './Inventory/ManufacturerList';
import VehicleModelForm from './Inventory/VehicleModelForm';
import VehicleModelList from './Inventory/VehicleModelList';
import AutomobileForm from './Inventory/AutomobileForm';
import AutomobileList from './Inventory/AutomobileList';
import SalespersonList from './Sales/SalespersonList';
import SalespersonForm from './Sales/SalespersonForm';
import CustomerForm from "./Sales/CustomerForm";
import CustomerList from './Sales/CustomerList';
import CreateSales from './Sales/NewSaleForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* inventory */}
          <Route path="manufacturers/new" element={<ManufacturerForm />} />
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="vehiclemodel/new" element={<VehicleModelForm />} />
          <Route path="vehiclemodels" element={<VehicleModelList />} />
          <Route path="automobiles/new" element={<AutomobileForm />} />
          <Route path="automobiles" element={<AutomobileList />} />
          {/* Services */}
          <Route path="technicians/new" element={<TechnicianForm />} />
          <Route path="technicians" element={<TechnicianList />} />
          <Route path="appointments/new" element={<AppointmentForm />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="servicehistory" element={<ServiceHistory />} />
          {/* Sales */}
          <Route path="salespeople" element={<SalespersonList />} />
          <Route path="salespeople/new" element={<SalespersonForm />} />
          <Route path="customer/new" element={<CustomerForm />} />
          <Route path="customer" element={<CustomerList />} />
          <Route path="sales/new" element={<CreateSales />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
