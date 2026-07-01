import type { ProfileTab } from '../../../types/components.types'
import { Ticket, Heart, Sparkles, Clock, Camera } from 'lucide-react'

interface ProfileTabsProps {
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
}

const TABS: { id: ProfileTab; label: string; icon: React.ReactNode }[] = [
  { id: 'fotos',       label: 'Fotos',       icon: <Camera size={13} /> },
  { id: 'voy-a-ir',    label: 'Confirmados',    icon: <Ticket size={13} /> },
  { id: 'me-interesa', label: 'Me interesa', icon: <Heart size={13} /> },
  { id: 'fui',         label: 'Asistidos',   icon: <Sparkles size={13} /> },
  { id: 'pasados',     label: 'Pasados',     icon: <Clock size={13} /> },
]

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <div className="profile__content-tabs">
      {TABS.map(({ id, label, icon }) => (
        <button
          key={id}
          className={`profile__tab${activeTab === id ? ' profile__tab--active' : ''}`}
          onClick={() => onTabChange(id)}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  )
}

export default ProfileTabs
