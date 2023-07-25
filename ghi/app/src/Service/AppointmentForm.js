import { useState, useEffect } from "react";
import App from "../App";

function AppointmentForm() {
    const [vin, setVin] = useState("")
    const [date_time, setDateTime] = useState("")
    const [reason, setReason] = useState("")
    const [customer, setCustomer] = useState("")
    const [technician, setTechnician] = useState("")
    const [technicians, setTechnicians] = useState([])

    const handleVinChange = (event) => {
        const value = event.target.value
        setVin(value)
    }

    const handleDateTimeChange = (event) => {
        const value = event.target.value
        setDateTime(value)
    }

    const handleReasonChange = (event) => {
        const value = event.target.value
        setReason(value)
    }

    const hanldeCustomerChange = (event) => {
        const value = event.target.value
        setCustomer(value)
    }

    const handleTechnicianChange = (event) => {
        const value = event.target.value
        setTechnician(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.vin = vin
        data.date_time = date_time
        data.reason = reason
        data.customer = customer
        data.technician = technician

        const appointmentUrl = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(appointmentUrl, fetchConfig)
        if (response.ok) {
            const newAppointment = await response.json()
            console.log(newAppointment)

            setVin("")
            setDateTime("")
            setReason("")
            setCustomer("")
            setTechnician("")
        }
    }

    const fetchData = async () => {
        const technicianUrl = "http://localhost:8080/api/technicians/"
        const response = await fetch(technicianUrl)
        if (response.ok) {
            const data = await response.json()
            setTechnicians(data.technicians)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create an appointment</h1>
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleVinChange} value={vin} placeholder="Vin" required type="text" minLength="17" maxLength="17" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleDateTimeChange} value={date_time} placeholder="Date-Time" required type="datetime-local" name="date_time" id="date_time" className="form-control" />
                            <label htmlFor="date_time">Date/Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleReasonChange} value={reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={hanldeCustomerChange} value={customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleTechnicianChange} value={technician} required id="technician" name="technician" className="form-select">
                                <option value="">Choose a Technician</option>
                                {technicians.map(technician => {
                                    return (
                                        <option key={technician.technician_id} value={technician.technician_id}>
                                            {technician.first_name + " " + technician.last_name}</option>
                                    )
                                })}
                            </select>
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AppointmentForm
