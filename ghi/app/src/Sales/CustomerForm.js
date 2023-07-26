import React, { useState } from "react"

function CreateCustomer(){
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phone_number, setPhoneNumber] = useState('')


    async function handleSubmit(event) {
        event.preventDefault()
        const data = {
            first_name,
            last_name,
            address,
            phone_number
        };

        const url = 'http://localhost:8090/api/customer/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);
            setFirstName('')
            setLastName('')
            setAddress('')
            setPhoneNumber('')
        } else {
            console.log("You've sinned and now you're being banished to the shadow realm.")
        }
    }

    function handleSetFirstName(event) {
        const { value } = event.target;
        setFirstName(value);
      }

    function handleSetLastName(event) {
        const { value } = event.target;
        setLastName(value);
    }

    function handleSetAddress(event) {
        const { value } = event.target;
        setAddress(value);
    }

    function handleSetPhoneNumber(event) {
        const { value } = event.target;
        setPhoneNumber(value);
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a Customer</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input value={first_name} onChange={handleSetFirstName} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={last_name} onChange={handleSetLastName} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={address} onChange={handleSetAddress} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                  <label htmlFor="address">Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={phone_number} onChange={handleSetPhoneNumber} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                  <label htmlFor="phone_number">Phone Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
}

export default CreateCustomer
