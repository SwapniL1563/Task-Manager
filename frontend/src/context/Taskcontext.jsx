import { createContext, useEffect, useState } from "react";
import axios from 'axios'

// creating the context
export const TaskContext = createContext();

const API_BASE = "https://task-manager-backend-lyt7.onrender.com/";


// create contextprovider
export const TaskContextProvider = ({children}) => {
    const [task,setTask] = useState([]);
    const [token,setToken] = useState(localStorage.getItem('token') || '');

    // config 
    const config = {
            headers: { Authorization:`Bearer ${token}` }
    }

    // fetch task for user
    const fetchTasks = async() => {
        const res = await axios.get(`${API_BASE}/api/task/gettask`,config);
        setTask(res.data);
    }

    // create task for user
    const createTask = async(taskdata) => {
        await axios.post(`${API_BASE}/api/task/createtask`,taskdata,config);

        fetchTasks();
    }

    // delete task for user
    const deleteTask = async(id) => {
        await axios.delete(`${API_BASE}/api/task/deletetask/${id}`,config);
        fetchTasks();
    }

    // update task for user
    const updateTask = async(id,taskdata) => {
        await axios.put(`${API_BASE}/api/task/updatetask/${id}`,taskdata,config);
        fetchTasks();
    }

    // whenever user logins
    const login = async(token) => {
        await localStorage.setItem('token',token);
        setToken(token);
    }

    // whenever user logs out
    const logout = async() => {
        await localStorage.removeItem('token');
        setTask([]);
        setToken('');
    }
    
    //  fetch task whenever we get jwt token
    useEffect( () => {
      if(token){
        fetchTasks();
      }
       }  
    ,[token]);

    return (
    <TaskContext.Provider value={{ task,setTask,token,setToken,fetchTasks,createTask,deleteTask,updateTask,login,logout}}>
        {children}
    </TaskContext.Provider> 
    )
}