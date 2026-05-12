import type { User } from '../../../types/auth.types'
import Button from '../Button'
import { postFollowRequest } from '../../../services/followRequest.services'
import { useState } from 'react'
const UserSearchCard = ({ id, name, username, lastName, avatarUrl }: User) => {
  const [followRequestSended, setfollowRequestSended] = useState(false)
  const sendFollowRequest = async () => {
    try {
      await postFollowRequest(id)
      setfollowRequestSended(true)
    } catch (e) {
      console.log('Se ha producido un error al enviar la solicitud')
    }
  }
  const handleClickFollowRequest = () => {
    sendFollowRequest()
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
        <Button
          label={followRequestSended ? 'Pendiente' : 'Solicitar'}
          variant="outline"
          size="md"
          onClick={handleClickFollowRequest}
        />
      </div>
    </div>
  )
}
export default UserSearchCard
