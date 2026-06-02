import type { User } from '../../../types/auth.types'
import Button from '../Button'
import { postFollowRequest, cancelFollowRequest } from '../../../services/followRequest.services'
import { useState } from 'react'

type UserSearchCardProps = User & { isPending?: boolean; isFriend?: boolean }

const UserSearchCard = ({ id, name, username, lastName, avatarUrl, isPending = false, isFriend = false }: UserSearchCardProps) => {
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
      <div className="user-search-card__avatar">
        {name.charAt(0).toUpperCase()}
        {avatarUrl}
      </div>
      <div className="user-search-card__info">
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
            variant="outline"
            size="md"
            onClick={handleClickFollowRequest}
          />
        )}
      </div>
    </div>
  )
}
export default UserSearchCard
