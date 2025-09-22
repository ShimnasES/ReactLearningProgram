import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Edit() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    setFormData(userInfo);
  },[]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const user = {
        name: formData.name,
        email: formData.email,
      };
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>User Profile</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
