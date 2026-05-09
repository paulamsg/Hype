import Input from '../Input'
import UserSearchCard from './UserSearchCard'
import { useState, useEffect } from 'react'
import type { User } from '../../../types/auth.types'
import { searchUser, getAllUsers } from '../../../services/user.services'

const SearchUserAside = () => {
  const [searchValue, setSearchValue] = useState('')
  const [searchUsers, setSearchUsers] = useState<User[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const listUsers = async () => {
    try {
      const users = await getAllUsers()
      setIsSearching(false)
      setSearchUsers(users)
      console.log('solo  se muestran 3', searchUsers)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listUsers()
  }, [])

  const searchUserByValue = async (value: string) => {
    try {
      const users = await searchUser(value)
      setSearchUsers(users)
    } catch (e) {
      console.log(e)
      setSearchUsers([])
    }
  }

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    searchUserByValue(e.target.value)
  }

  const showUsers = () => {
    if (searchValue === '') {
      setIsSearching(false)
      listUsers()
      return
    }
    setIsSearching(true)
  }

  useEffect(() => {
    showUsers()
  }, [searchValue])

  return (
    <div className="search-aside">
      <h1 className="search-aside__title">Buscar amigos</h1>
      <Input
        label=""
        name="userSearch"
        type="search"
        placeholder="Email o @username"
        value={searchValue}
        onChange={handleUserSearch}
      />
      {!isSearching && (
        <div className="search-aside__results">
          {searchUsers.map((user) => (
            <UserSearchCard key={user.id} {...user} />
          ))}
        </div>
      )}
      {isSearching && searchUsers.length !== 0 && (
        <div className="search-aside__results">
          {searchUsers.map((user) => (
            <UserSearchCard key={user.id} {...user} />
          ))}
        </div>
      )}
      {isSearching && searchUsers.length === 0 && (
        <div className="search-aside__results">
          <p>No existen usuarios com ese email o username</p>
        </div>
      )}
    </div>
  )
}

export default SearchUserAside
