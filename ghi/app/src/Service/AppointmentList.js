import React, { useState, useEffect } from "react";
function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const getAppointmentData = async () => {
        const appointmentsUrl = "http://localhost:8080/api/appointments/";
        const response = await fetch(appointmentsUrl);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
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
        getAppointmentData();
        getTechnicianData();
    }, []);

    const cancelAppointment = async (id) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify({ status: "Cancelled" }),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointment) => appointment.id !== id)
            );
        }
    };

    const finishAppointment = async (id) => {
        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify({ status: "Finished" }),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointment) => appointment.id !== id)
            );
        }
    };

    return (
        <>
            <div>
                <h1>Appointments List</h1>
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
                        {appointments.map((appointment) => {
                            const technician = technicians.find(
                                (tech) => tech.technician_id === appointment.technician
                            );
                            const technicianFirstName = technician
                                ? technician.first_name
                                : "N/A";
                            const technicianLastName = technician
                                ? technician.last_name
                                : "N/A";

                            return (
                                <tr key={appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{appointment.date_time}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.customer}</td>
                                    <td>{appointment.vip ? "Yes" : "No"}</td>
                                    <td>
                                        {technicianFirstName} {technicianLastName}
                                    </td>
                                    <td>
                                        <button
                                            onClick={(e) => cancelAppointment(appointment.id)}
                                            className="btn btn-danger"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={(e) => finishAppointment(appointment.id)}
                                            className="btn btn-primary"
                                        >
                                            Finish
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AppointmentsList;
