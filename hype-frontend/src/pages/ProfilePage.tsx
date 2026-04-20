import Topbar from '../components/ui/TopBar'
import { useState } from 'react'
import ProfileTabs from '../components/ui/profile/ProfileTabs'
import ProfileAside from '../components/ui/profile/ProfileAside'
import PhotoUploader from '../components/ui/profile/PhotoUploader'
import PhotoUploadModal from '../components/ui/profile/PhotoUploadModal'
import type { ProfileTab } from '../types/components.types'
import PhotoGallery from '../components/ui/profile/PhotoGallery'
import UserEventList from '../components/ui/profile/UserEventList'

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('fotos')
  const [pendingPhotos, setPendingPhotos] = useState<File[]>([])
  const [galleryKey, setGalleryKey] = useState(0)

  return (
    <>
      <Topbar />
      <div className="profile">
        <ProfileAside />
        <section className="profile__content">
          <ProfileTabs activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
          {activeTab === 'fotos' && (
            <>
              <PhotoUploader onPhotosSelected={setPendingPhotos} />
              <PhotoGallery key={galleryKey} />
            </>
          )}
          {pendingPhotos.length > 0 && (
            <PhotoUploadModal
              photos={pendingPhotos}
              onClose={() => setPendingPhotos([])}
              onUpload={() => {
                setPendingPhotos([])
                setGalleryKey((k) => k + 1)
              }}
            />
          )}

          {activeTab === 'mis-eventos' && <UserEventList folder="GONE" />}
          {activeTab === 'guardados' && <UserEventList folder="WANT_GO" />}
          {activeTab === 'archivo' && <UserEventList folder="EXPIRED" />}
        </section>
      </div>
    </>
  )
}

export default Profile
