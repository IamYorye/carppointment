import { useState, useEffect } from "react";

function TechnicianList() {
    const [technicians, setTechnicians] = useState([])

    const getTechnicianData = async () => {
        const technicianlUrl = "http://localhost:8080/api/technicians/"
        const response = await fetch(technicianlUrl)
        if (response.ok) {
            const technicianData = await response.json()
            setTechnicians(technicianData.technicians)
        }
    }

    useEffect(() => {
        getTechnicianData()
    }, [])

    return (
        <table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Technician Identification</th>
                </tr>
            </thead>
            <tbody>
                {technicians.map(technician => {
                    return (
                        <tr key={technician.technician_id}>
                            <td>{technician.first_name}</td>
                            <td>{technician.last_name}</td>
                            <td>{technician.technician_id}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TechnicianList
