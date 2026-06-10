import type { User } from '../../../types/auth.types'
import Button from '../Button'
import { postFollowRequest, cancelFollowRequest } from '../../../services/followRequest.services'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type UserSearchCardProps = User & { isPending?: boolean; isFriend?: boolean }

const UserSearchCard = ({ id, name, username, lastName, avatarUrl, isPending = false, isFriend = false }: UserSearchCardProps) => {
  const navigate = useNavigate()
  const [followRequestSended, setfollowRequestSended] = useState(isPending)

  const handleClickFollowRequest = async () => {
    try {
      if (followRequestSended) {
        await cancelFollowRequest(id)
        setfollowRequestSended(false)
      } else {
        await postFollowRequest(id)
        setfollowRequestSended(true)
      }
    } catch (e: any) {
      if (e?.response?.status === 409) {
        setfollowRequestSended(true)
      } else {
        console.log('Se ha producido un error con la solicitud')
      }
    }
  }

  return (
    <div className="user-search-card">
      <div
        className="user-search-card__avatar"
        onClick={() => navigate(`/usuario/${id}`)}
        style={{ cursor: 'pointer' }}
      >
        {avatarUrl
          ? <img src={avatarUrl} alt={name} />
          : name.charAt(0).toUpperCase()
        }
      </div>
      <div className="user-search-card__info" style={{ cursor: 'pointer' }} onClick={() => navigate(`/usuario/${id}`)}>
        <span className="user-search-card__name">
          {name} {lastName}
        </span>
        <span className="user-search-card__username">@{username}</span>
      </div>
      <div className="user-search-card__btn">
        {isFriend ? (
          <span className="user-search-card__friends-label">Amigos</span>
        ) : (
          <Button
            label={followRequestSended ? 'Pendiente' : 'Solicitar'}
            variant={followRequestSended ? 'outline-blue' : 'outline'}
            size="md"
            onClick={handleClickFollowRequest}
          />
        )}
      </div>
    </div>
  )
}
export default UserSearchCard
