import { useState, useEffect } from "react";

function VehicleModelList() {
    const [models, setModels] = useState([])

    const getModelData = async () => {
        const modelUrl = "http://localhost:8100/api/models/"
        const response = await fetch(modelUrl)

        if (response.ok) {
            const data = await response.json()
            setModels(data.models)
        }
    }

    useEffect(() => {
        getModelData()
    }, [])

    return (
        <table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                    return (
                        <tr key={model.id}>
                            <td>{model.name}</td>
                            <td>{model.manufacturer.name}</td>
                            <td>
                                <img src={model.picture_url} className="img-thumbnail" width={300} height={250} alt="model" />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default VehicleModelList
