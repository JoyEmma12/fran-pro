import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const Navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Handle form submission
  // This function sends a POST request to the server to register a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.message || data.error);
    if (data.user_id) {
      localStorage.setItem("userId", data.user_id);
      Navigate("/products");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Sign Up</h3>
      <form
        className="mx-auto"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="btn btn-success w-100" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
