import Input from '../Input'
import UserSearchCard from './UserSearchCard'
import { useState, useEffect } from 'react'
import type { User } from '../../../types/auth.types'
import { searchUser } from '../../../services/user.services'
import { getPendingRequests } from '../../../services/followRequest.services'
import { getFriendIds } from '../../../services/follow.services'

const SearchUserAside = () => {
  const [searchValue, setSearchValue] = useState('')
  const [searchUsers, setSearchUsers] = useState<User[]>([])
  const [pendingIds, setPendingIds] = useState<number[]>([])
  const [friendIds, setFriendIds] = useState<number[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const [pending, friends] = await Promise.all([getPendingRequests(), getFriendIds()])
        setPendingIds(pending)
        setFriendIds(friends)
      } catch {}
    }
    load()
  }, [])

  useEffect(() => {
    if (searchValue.trim() === '') { setSearchUsers([]); return }
    const search = async () => {
      try {
        const results = await searchUser(searchValue)
        setSearchUsers(results)
      } catch {
        setSearchUsers([])
      }
    }
    search()
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
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue.trim() !== '' && (
        <div className="search-aside__results">
          {searchUsers.length === 0 ? (
            <p>No existen usuarios con ese email o username</p>
          ) : (
            searchUsers.map((user) => (
              <UserSearchCard key={user.id} {...user} isPending={pendingIds.includes(user.id)} isFriend={friendIds.includes(user.id)} />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default SearchUserAside
