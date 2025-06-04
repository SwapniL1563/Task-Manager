import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/Taskcontext';

const Signin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/signin", form);
      const token = res.data.token;

      if (token) {
        login(token);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Signin error:", error);
      alert("Signin failed");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-purple-200 flex justify-center items-center">
      <div className="bg-purple-100 p-8 rounded-xl shadow-lg w-80 md:w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
            type="email" name="email" placeholder="Enter email"
            onChange={handleChange} className="p-3 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

        <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            className="p-3 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        <button type="submit" className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200">Log In</button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-purple-700 underline hover:text-purple-900"
          >
            Click here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signin;
