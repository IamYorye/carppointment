import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Inventory */}
            <li className='nav-item'>
              <NavLink className="nav-link" to="/manufacturers/new"> Create a Manufacturer</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/manufacturers">Manufacturers List</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/vehiclemodel/new">Create a Vehicle Model</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/vehiclemodels">Vehicle Model List</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/automobiles/new">Create a Automobile</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/automobiles">Automobiles List</NavLink>
            </li>
            {/* Services */}
            <li className='nav-item'>
              <NavLink className="nav-link" to="/technicians/new">Add a Technician</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/technicians">Technician List</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/appointments/new">Create an appointment</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/appointments">Appointment List</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/servicehistory">Service History</NavLink>
            </li>
            {/* Sales */}

            <li className='nav-item'>
              <NavLink className="nav-link" to="/sales/new">Log Sale</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
