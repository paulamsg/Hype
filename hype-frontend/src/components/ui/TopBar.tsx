import { useState } from 'react'
import Logo from '../ui/Logo'
import { useAuth } from '../../context/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Descubre', path: '/descubre' },
  { label: 'Amigos', path: '/amigos' },
  { label: 'Grupos', path: '/grupos' },
  { label: 'Perfil', path: '/perfil' },
  { path: 'notificaciones' },
]

const Topbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const goTo = (path: string) => {
    navigate(path)
    setMenuOpen(false)
  }

  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <header className="topbar">
      <div className="topbar__left">
        <Logo />
      </div>

      <nav className="topbar__nav">
        {NAV_ITEMS.map(({ label, path }) => (
          <div key={path} className={`topbar__tab-wrapper${isActive(path) ? ' topbar__tab-wrapper--active' : ''}`}>
            <button className="topbar__tab" onClick={() => goTo(path)}>
              {label}
            </button>
          </div>
        ))}
      </nav>

      <div className="topbar__right">
        <div className="topbar__bell" onClick={() => goTo('/notificaciones')}>
          <Bell size={18} />
        </div>
        <div className="topbar__avatar" onClick={() => goTo('/perfil')}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <button
          className={`topbar__burger${menuOpen ? ' topbar__burger--open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav className="topbar__mobile-menu">
          {NAV_ITEMS.map(({ label, path }) => (
            <button key={path} className={isActive(path) ? 'active' : ''} onClick={() => goTo(path)}>
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Topbar
