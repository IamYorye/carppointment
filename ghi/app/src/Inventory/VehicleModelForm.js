import { useState, useEffect } from "react";

function VehicleModelForm() {
    const [name, setName] = useState("")
    const [picture_url, setPictureUrl] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [manufacturers, setManufacturers] = useState([])

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value
        setPictureUrl(value)
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value
        setManufacturer(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = name
        data.picture_url = picture_url
        data.manufacturer = manufacturer

        const vehicleModelsUrl = "http://localhost:8100/api/models/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(vehicleModelsUrl, fetchConfig)
        if (response.ok) {
            const newVehicleModel = await response.json()
            console.log(newVehicleModel)

            setName("")
            setPictureUrl("")
            setManufacturer("")
        }
    }

    const fetchData = async () => {
        const manufacturersUrl = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(manufacturersUrl)

        if (response.ok) {
            const data = await response.json()
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='shadow p-4 mt-4'>
                    <h1>Crate a Vehicle Model</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-floating mb-3'>
                            <input onChange={handleNameChange} value={name} placeholder='Name' required type='text' name='name' className='form-control' />
                            <label htmlFor='name'>Manufacturer Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={handlePictureUrlChange} value={picture_url} placeholder='PictureUrl' required type='url' name='picture_url' id="picture_url" className='form-control' />
                            <label htmlFor='picture_url'>Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleManufacturerChange} value={manufacturer} required id="manufacturer" name="manufacturer" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}</option>
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

export default VehicleModelForm
