import { Routes, Route } from "react-router-dom"
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Discover from "./pages/DiscoverPage";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/descubre" element={<Discover />} />
        </Route>
    </Routes>
  )
}

export default App;