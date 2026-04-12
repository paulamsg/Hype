import type {ProfileTabsProps} from '../../../types/components.types'; 

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
    
    return (
        <>
        <button className={`profile__tab${activeTab === 'fotos' ? 'profile__tab--active' : ''}`}
                                onClick={() =>onTabChange('fotos')}
                        >
                            Fotos
                        </button>
                        <button className={`profile__tab${activeTab === 'he-ido' ? 'profile__tab--active' : ''}`}
                                onClick={() =>onTabChange('he-ido')}
                        >
                            He ido
                        </button>
                        <button className={`profile__tab${activeTab === 'quiero-ir' ? 'profile__tab--active' : ''}`}
                                onClick={() =>onTabChange('quiero-ir')}
                        >
                            Quiero ir
                        </button>
                        <button className={`profile__tab${activeTab === 'expirados' ? 'profile__tab--active' : ''}`}
                                onClick={() =>onTabChange('expirados')}
                        >
                            Expirados
                        </button>
        </>
    );
}
export default ProfileTabs;