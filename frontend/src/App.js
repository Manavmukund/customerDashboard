import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/customers", formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
      });

      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Customer Management</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(customer.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;