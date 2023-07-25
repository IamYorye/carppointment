import { useState, useEffect } from "react";

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([])

    const getManufacturerData = async () => {
        const manufacturersUrl = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(manufacturersUrl)

        if (response.ok) {
            const data = await response.json()
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        getManufacturerData()
    }, [])

    return (
        <table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th>First Name</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id}>
                            <td>{manufacturer.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ManufacturerList
