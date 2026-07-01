import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserProfile, getUserPhotos, getUserGoneEvents, type PublicProfile } from '../services/user.services'
import { postFollowRequest } from '../services/followRequest.services'
import { removeFollow } from '../services/follow.services'
import Topbar from '../components/ui/TopBar'
import Button from '../components/ui/Button'
import { ArrowLeft, MapPin, Lock, Camera, Sparkles } from 'lucide-react'
import type { Photo } from '../types/photo.types'
import type { Event } from '../types/event.types'
import { getDay, getMonthAbbr } from '../utils/date.utils'

type UserTab = 'fotos' | 'asistidos'

const ReadOnlyPhotoGallery = ({ userId }: { userId: number }) => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserPhotos(userId)
        setPhotos(data.photos)
      } catch {
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [userId])

  if (loading) return <p className="photo-gallery__loading">Cargando fotos...</p>
  if (photos.length === 0) return <div className="photo-gallery__empty"><p>Aún no hay fotos.</p></div>

  return (
    <div className="photo-gallery">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-gallery__item">
          <img className="photo-gallery__item-img" src={photo.url} alt={photo.savedEvent?.name || 'Foto'} />
          <div className="photo-gallery__item-footer">
            <p className="photo-gallery__item-name">{photo.savedEvent?.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const ReadOnlyEventList = ({ userId }: { userId: number }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserGoneEvents(userId)
        setEvents(data.savedEvents)
      } catch {
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [userId])

  if (loading) return <p className="photo-gallery__loading">Cargando eventos...</p>
  if (events.length === 0) return <div className="photo-gallery__empty"><p>Aún no hay eventos asistidos.</p></div>

  return (
    <div className="display">
      {events.map((event) => (
        <div key={event.id} className="event-profile-card">
          <img className="event-profile-card__img" src={event.image} alt={event.name} />
          <div className="event-profile-card__info">
            <p className="event-profile-card__title">{event.name}</p>
            <p className="event-profile-card__city">{event.city}</p>
            <p className="event-profile-card__venue">{event.venue}</p>
          </div>
          <div className="event-profile-card__date">
            <p className="event-profile-card__day">{getDay(event.date)}</p>
            <p className="event-profile-card__month">{getMonthAbbr(event.date)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const TABS: { id: UserTab; label: string; icon: React.ReactNode }[] = [
  { id: 'fotos',     label: 'Fotos',     icon: <Camera size={13} /> },
  { id: 'asistidos', label: 'Asistidos', icon: <Sparkles size={13} /> },
]

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<PublicProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [activeTab, setActiveTab] = useState<UserTab>('fotos')
  const [confirmUnfollow, setConfirmUnfollow] = useState(false)

  useEffect(() => {
    if (!userId) return
    const load = async () => {
      try {
        const data = await getUserProfile(Number(userId))
        setProfile(data)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [userId])

  const handleUnfollow = async () => {
    if (!profile) return
    try {
      await removeFollow(profile.user.id)
      setProfile((prev) => prev ? { ...prev, isFriend: false } : prev)
    } catch {
      setConfirmUnfollow(false)
    }
  }

  const handleRequest = async () => {
    if (!profile) return
    try {
      await postFollowRequest(profile.user.id)
      setRequestSent(true)
    } catch {
      setRequestSent(true)
    }
  }

  if (loading) return (
    <>
      <Topbar />
      <div className="user-profile-page__empty">Cargando perfil...</div>
    </>
  )

  if (notFound || !profile) return (
    <>
      <Topbar />
      <div className="user-profile-page__empty">Usuario no encontrado.</div>
    </>
  )

  const { user, isFriend, stats } = profile

  if (!isFriend) {
    return (
      <>
        <Topbar />
        <div className="user-profile-page">
          <button className="user-profile-page__back" onClick={() => navigate(-1)}>
            <ArrowLeft size={15} /> Volver
          </button>
          <div className="user-profile-page__card">
            <div className="user-profile-page__avatar">
              {user.avatarUrl ? <img src={user.avatarUrl} alt={user.name} /> : user.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="user-profile-page__name">{user.name} {user.lastName}</h1>
            <p className="user-profile-page__handle">@{user.username}</p>
          </div>
          <div className="user-profile-page__gate">
            <Lock size={28} className="user-profile-page__gate-icon" />
            <p className="user-profile-page__gate-msg">
              No puedes visitar el perfil de <strong>@{user.username}</strong> porque no sois amigos.
            </p>
            <Button
              label={requestSent ? 'Solicitud enviada' : 'Solicitar amistad'}
              variant={requestSent ? 'outline-blue' : 'primary'}
              size="md"
              onClick={requestSent ? () => {} : handleRequest}
              disabled={requestSent}
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <aside className="profile__aside">
          <button className="user-profile-page__back" onClick={() => navigate(-1)}>
            <ArrowLeft size={15} /> Volver
          </button>
          <section className="profile__identity">
            <div className="profile__avatar" style={user.avatarUrl ? { overflow: 'hidden' } : {}}>
              {user.avatarUrl
                ? <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : user.name.charAt(0).toUpperCase()
              }
            </div>
            <div className="profile__bio">
              <p className="profile__name">{user.name} {user.lastName}</p>
              <p className="profile__handle">@{user.username}</p>
              {user.bio && <p className="profile__desc">{user.bio}</p>}
              {user.location && (
                <div className="profile__location">
                  <MapPin size={15} color="#d22d2d" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </section>
          <div className="profile__stats">
            <div className="profile__stat">
              <span className="profile__stat-n profile__stat-n--blue">{stats.photosCount}</span>
              <span className="profile__stat-l">Fotos</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-n">{stats.friendsCount}</span>
              <span className="profile__stat-l">Amigos</span>
            </div>
          </div>

          <div className="profile__logout">
            {confirmUnfollow ? (
              <div className="friends-modal__confirm">
                ¿Seguro?
                <button className="friends-modal__confirm-yes" onClick={handleUnfollow}>Sí</button>
                <button className="friends-modal__confirm-no" onClick={() => setConfirmUnfollow(false)}>No</button>
              </div>
            ) : (
              <Button label="Dejar de seguir" variant="danger-outline" size="md" onClick={() => setConfirmUnfollow(true)} />
            )}
          </div>
        </aside>
        <section className="profile__content">
          <div className="profile__content-tabs">
            {TABS.map(({ id, label, icon }) => (
              <button
                key={id}
                className={`profile__tab${activeTab === id ? ' profile__tab--active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
          {activeTab === 'fotos'     && <ReadOnlyPhotoGallery userId={Number(userId)} />}
          {activeTab === 'asistidos' && <ReadOnlyEventList userId={Number(userId)} />}
        </section>
      </div>
    </>
  )
}

export default UserProfilePage
