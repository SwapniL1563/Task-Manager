import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [form,setForm] = useState({email:'',password:'',username:''});
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    axios.post("/api/auth/signup",form)
    navigate("/signin");
  }

  const handleChange = e => {
    setForm({...form,[e.target.name]:e.target.value})
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-purple-200'>
      <div className='bg-purple-100 p-8 rounded-xl shadow-lg w-80 md:w-96'>
        <h1 className='text-2xl font-bold text-center mb-6 text-purple-800'>Sign Up</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type="text" name="username" placeholder='Enter username' onChange={handleChange} className='p-3 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500'/>
      <input type="email" name="email" placeholder='Enter email' onChange={handleChange} className='p-3 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500'/>
      <input type="text" name="password" placeholder='Enter password' onChange={handleChange} className='p-3 rounded-md border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500'/>
      <button type="submit" className='bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200'>Sign Up </button>
    </form>
    <p className="mt-4 text-center text-sm">
      Already have an account?{" "}
      <button type="button" onClick={() => navigate("/signin")} className="text-purple-700 underline hover:text-purple-900"> Log in here</button>
    </p>
    </div>
    </div>
  )
}

export default Signup;