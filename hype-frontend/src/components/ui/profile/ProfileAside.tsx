import { useState } from 'react'
import { useAuth } from '../../../context/useAuth'
import Button from '../Button'
import Logout from './Logout'
import EditProfileModal from './EditProfileModal'
import { useUserContext } from '../../../context/userContext'
const ProfileAside = () => {
  const { user } = useAuth()
  const [showLogout, setShowLogout] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const { photosCount, eventsCount } = useUserContext()

  return (
    <aside className="profile__aside">
      <section className="profile__identity">
        <div className="profile__avatar">{user?.name?.charAt(0).toUpperCase()}</div>
        <div className="profile__bio">
          <p className="profile__name">{user?.name}</p>
          <p className="profile__handle">@{user?.username}</p>
          <p className="profile__desc">{user?.bio}</p>
          <div className="profile__location">
            <span className="profile__loc-dot" />
            <span>{user?.location}</span>
          </div>
        </div>
      </section>

      <div className="profile__stats">
        <div className="profile__stat">
          <span className="profile__stat-n profile__stat-n--blue">{photosCount}</span>
          <span className="profile__stat-l">Fotos</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-n">128</span>
          <span className="profile__stat-l">Seguidores</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-n">94</span>
          <span className="profile__stat-l">Siguiendo</span>
        </div>
      </div>

      <Button
        label="Editar perfil"
        variant="outline"
        size="md"
        onClick={() => {
          setShowEditModal(true)
        }}
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
        <p className="profile__folders-label">Mis carpetas</p>
        <div className="profile__folder">
          <div className="profile__folder-ico profile__folder-ico--heart">♥</div>
          <span className="profile__folder-name">Guardados</span>
          <span className="profile__folder-cnt">{eventsCount.wantGo}</span>
        </div>
        <div className="profile__folder">
          <div className="profile__folder-ico profile__folder-ico--check">✓</div>
          <span className="profile__folder-name">Mis eventos</span>
          <span className="profile__folder-cnt">{eventsCount.gone}</span>
        </div>
        <div className="profile__folder">
          <div className="profile__folder-ico profile__folder-ico--clock">⏱</div>
          <span className="profile__folder-name">Archivo</span>
          <span className="profile__folder-cnt">{eventsCount.expired}</span>
        </div>
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
    </aside>
  )
}

export default ProfileAside
