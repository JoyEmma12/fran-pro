import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.message || data.error);
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
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default SignupForm;
