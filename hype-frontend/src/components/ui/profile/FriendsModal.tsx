import { useState, useEffect } from 'react'
import { getFriends, removeFollow, type Friend } from '../../../services/follow.services'

type Props = {
  onClose: () => void
  onFriendRemoved: () => void
}

const FriendsModal = ({ onClose, onFriendRemoved }: Props) => {
  const [friends, setFriends] = useState<Friend[]>([])
  const [confirmId, setConfirmId] = useState<number | null>(null)

  useEffect(() => {
    getFriends().then(setFriends).catch(console.error)
  }, [])

  const handleRemove = async (friendId: number) => {
    try {
      await removeFollow(friendId)
      setFriends((prev) => prev.filter((f) => f.id !== friendId))
      setConfirmId(null)
      onFriendRemoved()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <div className="friends-modal">
          <div className="friends-modal__header">
            <h2 className="friends-modal__title">Amigos</h2>
            <button className="friends-modal__close" onClick={onClose}>✕</button>
          </div>
          {friends.length === 0 ? (
            <p className="friends-modal__empty">No tienes amigos aún</p>
          ) : (
            <ul className="friends-modal__list">
              {friends.map((friend) => (
                <li key={friend.id} className="friends-modal__item">
                  <div className="friends-modal__avatar">{friend.name.charAt(0).toUpperCase()}</div>
                  <div className="friends-modal__info">
                    <span className="friends-modal__name">{friend.name} {friend.lastName}</span>
                    <span className="friends-modal__username">@{friend.username}</span>
                  </div>
                  {confirmId === friend.id ? (
                    <div className="friends-modal__confirm">
                      <span>¿Eliminar?</span>
                      <button className="friends-modal__confirm-yes" onClick={() => handleRemove(friend.id)}>Sí</button>
                      <button className="friends-modal__confirm-no" onClick={() => setConfirmId(null)}>No</button>
                    </div>
                  ) : (
                    <span className="link-red" onClick={() => setConfirmId(friend.id)}>Eliminar amigo</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default FriendsModal
