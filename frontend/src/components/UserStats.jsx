// src/pages/UserPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/Taskcontext';

const UserStats = () => {
  const { task, fetchTasks } = useContext(TaskContext);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    priorityCount: {
      High: 0,
      Medium: 0,
      Low: 0
    }
  });

  useEffect(() => {
    fetchTasks();
  }, []);  

  useEffect(() => {
    const total = task.length;
    const completed = task.filter(t => t.completed).length;
    const pending = total - completed;

    const priorityCount = {
      High: task.filter(t => t.priority === 'High').length,
      Medium: task.filter(t => t.priority === 'Medium').length,
      Low: task.filter(t => t.priority === 'Low').length,
    };

    setStats({ total, completed, pending, priorityCount });
  }, [task]);

  return (
    <div className="p-6 w-[80%] md:w-[40%] mt-1 mb-4 text-white bg-purple-900 rounded-lg shadow">
      <h1 className="md:text-2xl font-bold mb-6">User Task Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-600 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
          <p className="text-2xl">{stats.total}</p>
        </div>

        <div className="bg-purple-600 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Completed</h2>
          <p className="text-2xl text-green-400">{stats.completed}</p>
          <h2 className="text-xl font-semibold mt-2">Pending</h2>
          <p className="text-2xl text-yellow-400">{stats.pending}</p>
        </div>

        <div className="bg-purple-600 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Tasks by Priority</h2>
          <p className="text-red-400 font-semibold">High: {stats.priorityCount.High}</p>
          <p className="text-yellow-300 font-semibold">Medium: {stats.priorityCount.Medium}</p>
          <p className="text-green-400 font-semibold">Low: {stats.priorityCount.Low}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
