import React, { useState } from "react"

function CreateSales() {
    const [vin, setVin] = useState([])
    const [customer, setCustomer] = useState([])
    const [salesperson, setSalesperson] = useState('')
    const [price, setPrice] = useState('')
    const [salespeople, setSalespeople] = useState([])


    async function handleSubmit(event) {
        event.preventDefault()
        const data = {
            vin,
            customer,
            salesperson,
            price,
        };

        const url = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale);
            setVin('')
            setCustomer('')
            setSalesperson('')
            setPrice('')
        } else {
            console.log("You've sinned and now you're being banished to the shadow realm.")
        }
    }

    function handleSetVin(event) {
        const { value } = event.target;
        setVin(value);
    }

    function handleSetCustomer(event) {
        const { value } = event.target;
        setCustomer(value);
    }

    function handleSetSalesperson(event) {
        const { value } = event.target;
        setSalesperson(value);
    }

    function handleSetPrice(event) {
        const { value } = event.target;
        setPrice(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <select required value={vin} onChange={handleSetVin} placeholder="Automobile VIN" type="text" name="vin" id="vin" className="form-control">
                                <option value="">Choose an automobile VIN...</option>
                                {vin?.map(car => {
                                    return (
                                        <option key={car} value={car}>{car}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customer">Choose a customer...</label>
                            <select
                                onChange={handleSetCustomer}
                                value={customer}
                                required
                                id="customer"
                                name="customer"
                                className="form-select"
                            >
                                <option value="">Select an option...</option>
                                {customer.map((customers) => (
                                    <option key={customers.id} value={customers.id}>
                                        {customers.first_name + " " + customers.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="salesperson">Choose a salesperson...</label>
                            <select
                                onChange={handleSetSalesperson}
                                value={salesperson}
                                required
                                id="salesperson"
                                name="salesperson"
                                className="form-select"
                            >
                                <option value="">Select an option...</option>
                                {salespeople.map((sp) => (
                                    <option key={sp.id} value={sp.id}>
                                        {sp.first_name + " " + sp.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleSetPrice} value={price} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                            <label htmlFor="price">Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateSales
