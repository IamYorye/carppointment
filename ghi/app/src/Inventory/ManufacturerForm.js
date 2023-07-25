import { useState } from "react"

function ManufacturerForm() {
    const [name, setName] = useState("")

    const hanldeNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = name

        const manufacturersUrl = "http://localhost:8100/api/manufacturers/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(manufacturersUrl, fetchConfig)
        if (response.ok) {
            const newManufacturer = await response.json()
            console.log(newManufacturer)

            setName("")
        }
    }

    return (
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='shadow p-4 mt-4'>
                    <h1>Crate a Manufacturer</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-floating mb-3'>
                            <input onChange={hanldeNameChange} value={name} placeholder='Name' required type='text' name='name' className='form-control' />
                            <label htmlFor='name'>Manufacturer Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManufacturerForm
