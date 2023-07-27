import { useState, useEffect } from "react";


function CustomerList() {
    const [customers, setCustomer] = useState([])

    const getCustomerData = async () => {
        const customerUrl = "http://localhost:8090/api/customer/"
        const response = await fetch(customerUrl)
        if (response.ok) {
            const customerData = await response.json()
            setCustomer(customerData.customer)
        }
    }
    useEffect(() => {
        getCustomerData()
    }, [])

    return (
        <div>
            <h1>customer</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => {
                        return (
                            <tr key={customer.id}>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phone_number}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default CustomerList
