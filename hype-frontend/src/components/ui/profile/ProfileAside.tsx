import { useState } from 'react'
import { useAuth } from '../../../context/useAuth'
import Button from '../Button'
import Logout from './Logout'
import EditProfileModal from './EditProfileModal'
import FriendsModal from './FriendsModal'
import { useUserContext } from '../../../context/userContext'
import { Heart, Bookmark, ClockAlert, Sparkles, MapPin } from 'lucide-react'
import type { ProfileTab } from '../../../types/components.types'

interface Props {
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
}

const FOLDERS: { tab: ProfileTab; icon: React.ReactNode; cls: string; label: string; countKey: 'wantGo' | 'going' | 'gone' | 'expired' }[] = [
  { tab: 'voy-a-ir',    icon: <Bookmark size={15} />, cls: 'going',    label: 'Confirmados',    countKey: 'going'    },
  { tab: 'me-interesa', icon: <Heart size={15} />,    cls: 'heart',    label: 'Me interesa', countKey: 'wantGo'   },
  { tab: 'fui',         icon: <Sparkles size={15} />, cls: 'check',    label: 'Asistidos',   countKey: 'gone'     },
  { tab: 'pasados',     icon: <ClockAlert size={15} />, cls: 'clock',  label: 'Pasados',     countKey: 'expired'  },
]

const ProfileAside = ({ activeTab, onTabChange }: Props) => {
  const { user } = useAuth()
  const [showLogout, setShowLogout] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showFriendsModal, setShowFriendsModal] = useState(false)

  const { photosCount, eventsCount, followersCount, refreshProfile } = useUserContext()

  return (
    <aside className="profile__aside">
      <section className="profile__identity">
        <div className="profile__avatar">
          {user?.avatarUrl
            ? <img src={user.avatarUrl} alt={user.name} />
            : user?.name?.charAt(0).toUpperCase()
          }
        </div>
        <div className="profile__bio">
          <p className="profile__name">{user?.name}</p>
          <p className="profile__handle">@{user?.username}</p>
          <p className="profile__desc">{user?.bio}</p>
          <div className="profile__location">
            <MapPin size={15} color="#d22d2d" />
            <span>{user?.location}</span>
          </div>
        </div>
      </section>

      <div className="profile__stats">
        <div className="profile__stat">
          <span className="profile__stat-n profile__stat-n--blue">{photosCount}</span>
          <span className="profile__stat-l">Fotos</span>
        </div>
        <div className="profile__stat profile__stat--clickable" onClick={() => setShowFriendsModal(true)}>
          <span className="profile__stat-n">{followersCount}</span>
          <span className="profile__stat-l">Amigos</span>
        </div>
      </div>

      <Button
        label="Editar perfil"
        variant="outline"
        size="md"
        onClick={() => setShowEditModal(true)}
      />
      {showEditModal && (
        <>
          <div className="modal-overlay" onClick={() => setShowEditModal(false)} />
          <div className="modal">
            <EditProfileModal onClose={() => setShowEditModal(false)} />
          </div>
        </>
      )}

      <div className="profile__folders">
        <p className="profile__folders-label">Mis eventos</p>
        {FOLDERS.map(({ tab, icon, cls, label, countKey }) => (
          <div
            key={tab}
            className={`profile__folder profile__folder--clickable${activeTab === tab ? ' profile__folder--active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            <div className={`profile__folder-ico profile__folder-ico--${cls}`}>
              {icon}
            </div>
            <span className="profile__folder-name">{label}</span>
            <span className="profile__folder-cnt">{eventsCount[countKey]}</span>
          </div>
        ))}
      </div>

      <div className="profile__logout">
        <Button label="Cerrar sesión" variant="danger-outline" size="md" onClick={() => setShowLogout(true)} />
      </div>

      {showLogout && (
        <>
          <div className="modal-overlay" onClick={() => setShowLogout(false)} />
          <div className="modal">
            <Logout onCancel={() => setShowLogout(false)} />
          </div>
        </>
      )}

      {showFriendsModal && (
        <FriendsModal
          onClose={() => setShowFriendsModal(false)}
          onFriendRemoved={refreshProfile}
        />
      )}
    </aside>
  )
}

export default ProfileAside
