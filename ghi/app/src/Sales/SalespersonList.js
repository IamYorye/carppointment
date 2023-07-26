import { useState, useEffect } from "react";


function SalespersonList() {
    const [salespeople, setSalespeople] = useState([])

    const getSalespersonData = async () => {
        const salespersonUrl = "http://localhost:8090/api/salespeople/"
        const response = await fetch(salespersonUrl)
        if (response.ok) {
            const salespeopleData = await response.json()
            setSalespeople(salespeopleData.salespeople)
        }
    }
    useEffect(() => {
        getSalespersonData()
    }, [])

    return (
        <div>
            <h1>Salespeople</h1>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(salesperson => {
                        <tr>
                            <td>{salesperson.employee_id}</td>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default SalespersonList
