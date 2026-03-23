import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/useAuth"

const ProtectedRoute = () => {
  const { token, loading } = useAuth()

  if (loading) return null

  return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
