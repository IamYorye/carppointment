import { useState, useEffect } from "react";

function AutomobileList() {
    const [autos, setAutos] = useState([])


    const getAutosData = async () => {
        const automobilesUrl = "http://localhost:8100/api/automobiles/"
        const response = await fetch(automobilesUrl)
        if (response.ok) {
            const data = await response.json()
            setAutos(data.autos)
        }
    }


    useEffect(() => {
        getAutosData()
    }, [])

    return (
        <div>
            <h1>Automobiles</h1>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map(auto => {
                        return (
                            <tr key={auto.id}>
                                <td>{auto.vin}</td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                                <td>{auto.sold}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default AutomobileList
