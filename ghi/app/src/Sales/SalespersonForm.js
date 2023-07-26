import React, { useState } from "react"

function CreateSalesperson(){
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [employee_id, setEmployeeId] = useState('')


    async function handleSubmit(event) {
        event.preventDefault()
        const data = {
            first_name,
            last_name,
            employee_id,
        };

        const url = 'http://localhost:8090/api/salespeople/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();
            console.log(newSalesperson);
            setFirstName('')
            setLastName('')
            setEmployeeId('')
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

    function handleSetEmployeeId(event) {
        const { value } = event.target;
        setEmployeeId(value);
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a Salesperson</h1>
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
                  <input value={employee_id} onChange={handleSetEmployeeId} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
                  <label htmlFor="employee_id">Employee ID</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
}

export default CreateSalesperson
