import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Discover from "./pages/DiscoverPage";
import StyleGuide from "./pages/styleguide/StyleGuide";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element= {<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/style-guide" element={<StyleGuide />} />
      {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/discover" element={<Discover />} />
        </Route>
    </Routes>
  )
}

export default App;