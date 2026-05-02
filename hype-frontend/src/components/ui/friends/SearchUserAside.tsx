import Input from '../Input'
import UserSearchCard from './UserSearchCard'
import { useState } from 'react'
import type { User } from '../../../types/auth.types'
import { searchUser } from '../../../services/user.services'

const SearchUserAside = () => {
  const [searchValue, setSearchValue] = useState('')
  const [searchUsers, setSearchUsers] = useState<User[]>([])

  const searchUserByValue = async () => {
    try {
      const users = await searchUser(searchValue)
      setSearchUsers(users)
    } catch (e) {
      console.log(e)
      setSearchUsers([])
    }
  }
  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <h1>Buscar usuarios</h1>
      <Input
        label=""
        name="userSearch"
        type="search"
        placeholder="Email o @username"
        value={searchValue}
        onChange={handleUserSearch}
      />
      {searchUsers.map((user) => (
        <UserSearchCard {...user} />
      ))}
    </div>
  )
}

export default SearchUserAside
