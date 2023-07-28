import { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";

function SalesList() {
    const [sales, setSales] = useState([]);
    const [search, setSearch] = useState('');

    const getSalesData = async () => {
        const salesUrl = "http://localhost:8090/api/sales/";
        const response = await fetch(salesUrl);
        if (response.ok) {
            const salesData = await response.json();
            setSales(salesData.sale);
        }
    };

    useEffect(() => {
        getSalesData();
    }, []);

    return (
        <div>
            <h1>Sales</h1>
            <form>
                <InputGroup className="mb-3">
                    <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Filter by Salesperson First name"
                    />
                </InputGroup>
            </form>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Salesperson ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>VIN #</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.filter((item) => {
                        return search.toLowerCase() === '' ||
                            item.salesperson.first_name.toLowerCase().includes(search.toLowerCase());
                    })
                        .map((sale) => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.employee_id}</td>
                                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>${sale.price}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default SalesList;
