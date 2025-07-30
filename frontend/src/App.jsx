import {  Navigate, Route, Routes } from "react-router"
import { LoginPage } from "./pages/auth/LoginPage"
import { RegistrationPage } from "./pages/auth/RegistrationPage"
import { Dashboard } from "./pages/dashboard/Dashboard"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"


function App() {

  return (

    <>
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegistrationPage/>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/login" replace/>} />
    </Routes>
    </>
  )
}

export default App
