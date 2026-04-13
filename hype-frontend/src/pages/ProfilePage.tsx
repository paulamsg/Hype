import Topbar from "../components/ui/TopBar";
import { useAuth } from "../context/useAuth";
import Button from '../components/ui/Button';
import { useState } from "react";
import ProfileTabs from '../components/ui/profile/ProfileTabs';
import Logout from '../components/ui/profile/Logout';
import PhotoUploader from '../components/ui/profile/PhotoUploader'
import PhotoUploadModal from '../components/ui/profile/PhotoUploadModal'
import type { ProfileTab } from '../types/components.types';
import PhotoGallery from "../components/ui/profile/PhotoGallery";

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<ProfileTab>('fotos');
    const [showLogout, setShowLogout] = useState(false);
    const [pendingPhotos, setPendingPhotos] = useState<File[]>([]);
    const [galleryKey, setGalleryKey] = useState(0);

    return (
        <>
            <Topbar />
            <div className="profile">
                <aside className="profile__aside">
                    <section className="profile__identity">
                        <div className="profile__avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="profile__bio">
                            <p className="profile__name">{user?.name}</p>
                            <p className="profile__handle">@{user?.username}</p>
                            <p className="profile__desc">{user?.bio}</p>
                            <div className="profile__location">
                                <span className="profile__loc-dot" />
                                <span>{user?.location}</span>
                            </div>
                        </div>
                    </section>
                    <div className="profile__stats">
                        <div className="profile__stat">
                            <span className="profile__stat-n profile__stat-n--blue">34</span>
                            <span className="profile__stat-l">Eventos</span>
                        </div>
                        <div className="profile__stat">
                            <span className="profile__stat-n">128</span>
                            <span className="profile__stat-l">Seguidores</span>
                        </div>
                        <div className="profile__stat">
                            <span className="profile__stat-n">94</span>
                            <span className="profile__stat-l">Siguiendo</span>
                        </div>
                    </div>

                    <Button 
                        label="✎ Editar perfil" 
                        variant="outline" 
                        size="md"
                        onClick = {() => {}}
                    />

                    <div className="profile__folders">
                        <p className="profile__folders-label">Mis carpetas</p>
                        <div className="profile__folder">
                            <div className="profile__folder-ico profile__folder-ico--heart">♥</div>
                            <span className="profile__folder-name">Quiero ir</span>
                            <span className="profile__folder-cnt">12</span>
                        </div>
                        <div className="profile__folder">
                            <div className="profile__folder-ico profile__folder-ico--check">✓</div>
                            <span className="profile__folder-name">He ido</span>
                            <span className="profile__folder-cnt">34</span>
                        </div>
                        <div className="profile__folder">
                            <div className="profile__folder-ico profile__folder-ico--clock">⏱</div>
                            <span className="profile__folder-name">Expirados</span>
                            <span className="profile__folder-cnt">8</span>
                        </div>
                    </div>
                    <Button
                        label="Cerrar sesión"
                        variant="danger-outline"
                        size="md"
                        onClick={() => setShowLogout(true)}
                    />
                    {showLogout && (
                        <>
                            <div className="modal-overlay" onClick={() => setShowLogout(false)} />
                            <div className="modal">
                                <Logout onCancel={() => setShowLogout(false)} />
                            </div>
                        </>
                    )}  

                </aside>
                <section className="profile__content">
                    <ProfileTabs
                        activeTab={activeTab}
                        onTabChange={(tab) => setActiveTab(tab)}
                    />
                    {activeTab === 'fotos' && (
                        <>
                        <PhotoUploader onPhotosSelected={setPendingPhotos} />
                        <PhotoGallery key={galleryKey}/> 
                        </>
                    )}
                    {pendingPhotos.length > 0 && (
                        <PhotoUploadModal
                            photos={pendingPhotos}
                            onClose={() => setPendingPhotos([])}
                            onUpload={() => { setPendingPhotos([]); setGalleryKey(k => k + 1); }}
                        />
                    )}
                    

                    {activeTab === 'he-ido' /* &&  componente de los eventos a los que ha ido */ }
                    {activeTab === 'quiero-ir' /* &&  componente de los eventos guardados*/ }
                    {activeTab === 'expirados' /* &&  componente de los eventos*/ }
                </section>
            </div>
            
        </>
    );
};

export default Profile;
