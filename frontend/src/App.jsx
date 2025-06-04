import { TaskContext, TaskContextProvider } from "./context/Taskcontext"
import { BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { useContext } from "react"
import { ToastContainer } from "react-toastify"

function App() {
  
  const ProtectedRoute = ({ children }) => {
    const { token } = useContext(TaskContext);
    return token ?  children : <Navigate to="/login" />
  }

  return (
   <TaskContextProvider>
       <ToastContainer />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      {/* protected route */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      {/* Any other unknown route  */}
      <Route path="*" element={<Navigate to="/signin" />} /> 
    </Routes>
    </BrowserRouter>
   </TaskContextProvider>
  )
}

export default App
