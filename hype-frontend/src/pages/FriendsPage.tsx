import SearchUserAside from '../components/ui/friends/SearchUserAside'
import FriendsFeed from '../components/ui/friends/FriendsFeed'
import GroupsAside from '../components/ui/friends/GroupsAside'
import Topbar from '../components/ui/TopBar'

const FriendsPage = () => {
  return (
    <>
      <Topbar />
      <div className="friends">
        <div className="friends__col friends__col--feed">
          <FriendsFeed />
        </div>
        <div className="friends__col friends__col--aside">
          <SearchUserAside />
          <GroupsAside />
        </div>
      </div>
    </>
  )
}

export default FriendsPage
