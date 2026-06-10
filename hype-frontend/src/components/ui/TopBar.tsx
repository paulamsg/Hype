import { useState, useEffect } from 'react'
import Logo from '../ui/Logo'
import { useAuth } from '../../context/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { getUnreadCount } from '../../services/notifications.services'

const NAV_ITEMS = [
  { label: 'Descubre', path: '/descubre' },
  { label: 'Amigos', path: '/amigos' },
  { label: 'Grupos', path: '/grupos' },
  { label: 'Perfil', path: '/perfil' },
]

const Topbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const isActive = (path: string) => location.pathname.startsWith(path)
  const onNotifications = isActive('/notificaciones')

  const fetchUnread = async () => {
    try {
      const count = await getUnreadCount()
      setUnreadCount(count)
    } catch {}
  }

  useEffect(() => {
    fetchUnread()
    const handleVisibility = () => { if (document.visibilityState === 'visible') fetchUnread() }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const goTo = (path: string) => {
    navigate(path)
    setMenuOpen(false)
    if (path === '/notificaciones') setUnreadCount(0)
  }

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
        <div
          className={`topbar__bell${onNotifications ? ' topbar__bell--active' : ''}`}
          onClick={() => goTo('/notificaciones')}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="topbar__bell-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
          )}
        </div>
        <div className="topbar__avatar" onClick={() => goTo('/perfil')}>
          {user?.avatarUrl
            ? <img src={user.avatarUrl} alt={user.name} />
            : user?.name?.charAt(0).toUpperCase()
          }
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
          <button className={onNotifications ? 'active' : ''} onClick={() => goTo('/notificaciones')}>
            Notificaciones {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </nav>
      )}
    </header>
  )
}

export default Topbar
