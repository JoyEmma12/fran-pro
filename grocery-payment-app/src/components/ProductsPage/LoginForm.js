import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.user_id) {
        localStorage.setItem("userId", data.user_id);
        alert("Login successful");
        navigate("/");
      } else {
        alert(data.error);
      }
    };

    return (
      <div className="container mt-5">
        <h3 className="text-center">Login</h3>
        <form className="mx-auto" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    );
  };

  export default LoginForm;
