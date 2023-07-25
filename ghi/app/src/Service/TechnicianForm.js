import React, { useState } from 'react';

function TechnicianForm() {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [technician_id, setTechnicianId] = useState("")

    const handleFirstNameChange = (event) => {
        const value = event.target.value
        setFirstName(value)
    }

    const hanldeLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value)
    }

    const handleTechnicianIdChange = (event) => {
        const value = event.target.value
        setTechnicianId(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.first_name = first_name
        data.last_name = last_name
        data.technician_id = technician_id

        const technicianUrl = "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(technicianUrl, fetchConfig)
        if (response.ok) {
            const newTechnician = await response.json()
            console.log(newTechnician)

            setFirstName("")
            setLastName("")
            setTechnicianId("")
        }

    }

    return (
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='shadow p-4 mt-4'>
                    <h1>Add a Technician</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFirstNameChange} value={first_name} placeholder='First Name' required type='text' name='first_name' className='form-control' />
                            <label htmlFor='first_name'>First Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={hanldeLastNameChange} value={last_name} placeholder='Last Name' required type='text' name='last_name' className='form-control' />
                            <label htmlFor='last_name'>Last Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={handleTechnicianIdChange} value={technician_id} placeholder='Technician Id' required type='text' name='technician_id' className='form-control' />
                            <label htmlFor='technician_id'>Technician Identification</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TechnicianForm
