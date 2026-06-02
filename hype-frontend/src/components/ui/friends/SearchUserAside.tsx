import Input from '../Input'
import UserSearchCard from './UserSearchCard'
import { useState, useEffect } from 'react'
import type { User } from '../../../types/auth.types'
import { searchUser, getAllUsers } from '../../../services/user.services'
import { getPendingRequests } from '../../../services/followRequest.services'
import { getFriendIds } from '../../../services/follow.services'

const SearchUserAside = () => {
  const [searchValue, setSearchValue] = useState('')
  const [searchUsers, setSearchUsers] = useState<User[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [pendingIds, setPendingIds] = useState<number[]>([])
  const [friendIds, setFriendIds] = useState<number[]>([])

  const listUsers = async () => {
    try {
      const [users, pending, friends] = await Promise.all([getAllUsers(), getPendingRequests(), getFriendIds()])
      setIsSearching(false)
      setSearchUsers(users)
      setPendingIds(pending)
      setFriendIds(friends)
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
            <UserSearchCard key={user.id} {...user} isPending={pendingIds.includes(user.id)} isFriend={friendIds.includes(user.id)} />
          ))}
        </div>
      )}
      {isSearching && searchUsers.length !== 0 && (
        <div className="search-aside__results">
          {searchUsers.map((user) => (
            <UserSearchCard key={user.id} {...user} isPending={pendingIds.includes(user.id)} isFriend={friendIds.includes(user.id)} />
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
