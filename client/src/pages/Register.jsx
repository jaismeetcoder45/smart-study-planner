import { useState } from "react";
import API from "../services/api";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] =
  useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
  !formData.name ||
  !formData.email ||
  !formData.password
) {
  toast.error(
    "Please fill all fields"
  );

  return;
}

if (formData.password.length < 6) {
  toast.error(
    "Password must be at least 6 characters"
  );

  return;
}

    try {
      const response = await API.post(
        "/auth/register",
        formData
      );

      console.log(response.data);

      toast.success("Registration Successful!");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Registration failed!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Register
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>
        </form>
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;