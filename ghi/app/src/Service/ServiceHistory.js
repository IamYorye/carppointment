import React, { useState, useEffect } from "react";

function ServiceHistory() {
    const [vin, setVin] = useState("");
    const [serviceHistory, setServiceHistory] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    };

    const fetchAppointmentsData = async () => {
        const appointmentsUrl = "http://localhost:8080/api/appointments/";
        const response = await fetch(appointmentsUrl);

        if (response.ok) {
            const data = await response.json();
            setServiceHistory(data.appointments);
        }
    };

    const getTechnicianData = async () => {
        const technicianUrl = "http://localhost:8080/api/technicians/";
        const response = await fetch(technicianUrl);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    };

    useEffect(() => {
        fetchAppointmentsData();
        getTechnicianData()
    }, []);

    useEffect(() => {
        if (vin) {
            const filteredAppointments = serviceHistory.filter(
                (appointment) => appointment.vin === vin
            );
            setServiceHistory(filteredAppointments);
        } else {
            fetchAppointmentsData();
        }
    }, [vin]);

    return (
        <div>
            <h1>Service History</h1>
            <div>
                <label htmlFor="vin">Enter VIN: </label>
                <input
                    type="text"
                    id="vin"
                    value={vin}
                    onChange={handleVinChange}
                />
            </div>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Date/Time</th>
                        <th>Reason</th>
                        <th>Customer</th>
                        <th>VIP</th>
                        <th>Technician</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceHistory.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.date_time}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.customer}</td>
                            <td>{appointment.vip ? "Yes" : "No"}</td>
                            <td>{appointment.technician.first_name}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceHistory;
