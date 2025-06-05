import React, { useState } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useNavigate } from 'react-router-dom'
import UserStats from '../components/UserStats'

const Dashboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  return (
    <div className="min-h-screen bg-purple-100 flex flex-col  items-center p-6">
    <div className='flex justify-between gap-4 md:gap-2 md:w-[40%] items-center '>
    <h1 className="text-lg md:text-2xl font-bold text-purple-800 ">Welcome to Dashboard</h1>
    <button type="button" onClick={() => navigate("/signin")} className="bg-purple-600 text-white py-1 px-2 md:py-2 md:px-3 rounded-md hover:bg-purple-700 transition duration-200 text-purple-700  font-semibold "> Log out</button>
    </div>
    <TaskForm />
    <UserStats/>

    {/* Filter dropdown */}
     <div className='flex items-center justify-end  md:w-[40%]'>
     <div className="mt-2">
        <label htmlFor="filter" className="mr-4 text-lg">Filter Tasks:</label>
         <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-white  p-2 rounded border border-purple-500 outline:none text-black">
          <option value="All">All</option>
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>
     </div>

    <div className="w-full md:w-[43%]">
      <TaskList filter={filter} />
    </div>
  </div>
  )
}

export default Dashboard