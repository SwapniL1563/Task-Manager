// src/components/TaskForm.jsx
import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/Taskcontext'
import { toast } from 'react-toastify';

const TaskForm = () => {
  const { createTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority,setPriority] = useState("Medium")

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title, description , priority});
    setTitle('');
    setDescription('');
    setPriority("Medium");
  };

  const notify = () => {
      toast("New Task Added Successfully!")
  }

  return (
    <form onSubmit={handleSubmit} className='bg-purple-100 p-6 rounded-xl'>
      <h2 className='text-xl font-semibold mb-4 text-purple-800'>Create Task</h2>
      <input type="text" placeholder="Title" value={title} required onChange={(e) => setTitle(e.target.value)} className='w-full p-2 mb-3 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400'/>
      <textarea placeholder="Description" value={description} required onChange={(e) => setDescription(e.target.value)} className='w-full p-2 mb-3 border border-purple-300 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400'/>
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full text-gray-800 p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 border border-purple-300">
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <button type="submit" onClick={notify} className='w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition'>Add Task
      
      </button>
    </form>
  );
};

export default TaskForm;
