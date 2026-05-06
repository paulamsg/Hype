import type { User } from '../../../types/auth.types'
import Button from '../Button'
const UserSearchCard = ({ name, username, lastName, avatarUrl }: User) => {
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
        <Button label="Seguir" variant="outline" size="md" onClick={() => {}} />
      </div>
    </div>
  )
}
export default UserSearchCard
