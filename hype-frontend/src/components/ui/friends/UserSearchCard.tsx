import type { User } from '../../../types/auth.types'
import Button from '../Button'
const UserSearchCard = ({ name, username, lastName, avatarUrl }: User) => {
  return (
    <div className="UserSearchCard">
      <div className="topbar__avatar">{name.charAt(0).toUpperCase()}{avatarUrl}</div>
      <div className="UserSearchCard__info">
        {name}
        {lastName}
        {username}
      </div>
      <Button label="Seguir" variant="outline" size="sm" onClick={() => {}} />
    </div>
  )
}
export default UserSearchCard
