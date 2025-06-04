import React, { useContext } from 'react';
import { TaskContext } from '../context/Taskcontext';
import { toast } from 'react-toastify';

const TaskList = ({filter}) => {
  const { task, deleteTask, updateTask } = useContext(TaskContext);

  const toggleComplete = async (task) => {
    await updateTask(task._id, {
      ...task,
      completed: !task.completed,
    });
  };

  const filteredTasks = task.filter((t) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return t.completed === true;
    if (filter === 'Incomplete') return t.completed === false;
    return t.priority === filter;
  });

  if (!Array.isArray(task)) {
    return <p>Loading tasks...</p>;
  }

  const notify = () => {
        toast("Task Deleted Successfully!")
   }

  return (
    <div className=" bg-purple-100 p-6 rounded-xl">
     <h2 className="text-xl font-semibold mb-4 text-purple-800">Your Tasks</h2>
      {filteredTasks.length === 0 ? (<p>No tasks found.</p>) : (
        <ul className='flex flex-col gap-2'>
          {filteredTasks.map((task) => (
            <li key={task._id} className='bg-white p-4 rounded-xl shadow border border-purple-200 '>
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800' }`}>{task.title} -  <span className="italic text-sm font-normal text-gray-600 "> {task.priority} priority</span></h3>
            <p className='text-sm text-gray-600 mb-2'>{task.description}</p>
            <button  onClick={() => toggleComplete(task)} className={`px-3 py-1 rounded text-white mr-2 ${task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}>
             {task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
              <button onClick={() => deleteTask(task._id) && notify()} className='px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white'>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
