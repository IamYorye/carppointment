import React, { useEffect, useState } from "react";

function CreateSales() {
  const [automobile, setAutomobile] = useState('');
  const [customer, setCustomer] = useState('');
  const [salesperson, setSalesperson] = useState('');
  const [price, setPrice] = useState('');
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [availableAutomobiles, setAvailableAutomobiles] = useState([]);

  async function fetchAutomobileData() {
    const Url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(Url);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    } else {
      console.error(response);
    }
  }

  const fetchCustomerData = async () => {
    const response = await fetch('http://localhost:8090/api/customer/');
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customer);
    } else {
      console.error(response);
    }
  }

  async function fetchSalespersonData() {
    const Url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(Url);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salesperson);
    } else {
      console.error(response);
    }
  }

  useEffect(() => {
    fetchAutomobileData();
    fetchCustomerData();
    fetchSalespersonData();
  }, []);

  useEffect(() => {
    const filteredAutomobiles = automobiles.filter(automobile => !automobile.sold);
    setAvailableAutomobiles(filteredAutomobiles);
  }, [automobiles]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {}
      data.automobile = automobile
      data.customer = customer
      data.salesperson = salesperson
      data.price = price

    const url = 'http://localhost:8090/api/sales/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const soldUrl = `http://localhost:8100/api/automobiles/${automobile}/sold/`;
      const soldFetchConfig = {
        method: "put",
      };
      const soldResponse = await fetch(soldUrl, soldFetchConfig);
      window.location.href = window.location.href;

      setAutomobile('');
      setCustomer('');
      setSalesperson('');
      setPrice('');
    }
    // } else {
    //   console.log("You've sinned and now you're being banished to the shadow realm.");
    //   console.error(response);
    // }
  }

  function handleSetAutomobile(event) {
    setAutomobile(event.target.value);
  }

  function handleSetCustomer(event) {
    setCustomer(event.target.value);
  }

  function handleSetSalesperson(event) {
    setSalesperson(event.target.value);
  }

  function handleSetPrice(event) {
    setPrice(event.target.value);
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Sale</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="vin">Choose an automobile...</label>
              <select
                onChange={handleSetAutomobile}
                value={automobile}
                required
                id="automobile"
                name="automobile"
                className="form-select"
              >
                <option value="">Select a VIN...</option>
                {availableAutomobiles?.map((automobile) => (
                  <option key={automobile.vin} value={automobile.vin}>
                    {automobile.vin}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="customer">Choose a customer...</label>
              <select
                onChange={handleSetCustomer}
                value={customer}
                required
                id="customers"
                name="customers"
                className="form-select"
              >
                <option value="">Select an option...</option>
                {customers?.map((customers) => (
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
                {salespeople.map((salesperson) => (
                  <option key={salesperson.id} value={salesperson.id}>
                    {salesperson.first_name} {salesperson.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleSetPrice}
                value={price}
                placeholder="Price"
                required
                type="text"
                name="price"
                id="price"
                min="0"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSales;
