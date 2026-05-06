import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import Discover from './pages/DiscoverPage'
import StyleGuide from './pages/styleguide/StyleGuide'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/ProfilePage'
import Friends from './pages/FriendsPage'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/style-guide" element={<StyleGuide />} />
      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/descubre" element={<Discover />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/amigos" element={<Friends />} />
      </Route>
    </Routes>
  )
}

export default App
