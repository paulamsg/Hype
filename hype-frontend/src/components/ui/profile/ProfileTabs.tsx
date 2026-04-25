export type ProfileTab = 'fotos' | 'proximos-eventos' | 'mis-eventos' | 'guardados' | 'archivo'

export interface ProfileTabsProps {
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <div className="profile__content-tabs">
      <button
        className={`profile__tab${activeTab === 'fotos' ? ' profile__tab--active' : ''}`}
        onClick={() => onTabChange('fotos')}
      >
        Fotos
      </button>
      <button
        className={`profile__tab${activeTab === 'proximos-eventos' ? ' profile__tab--active' : ''}`}
        onClick={() => onTabChange('proximos-eventos')}
      >
        Próximos eventos
      </button>
      <button
        className={`profile__tab${activeTab === 'mis-eventos' ? ' profile__tab--active' : ''}`}
        onClick={() => onTabChange('mis-eventos')}
      >
        Mis eventos
      </button>
      <button
        className={`profile__tab${activeTab === 'guardados' ? ' profile__tab--active' : ''}`}
        onClick={() => onTabChange('guardados')}
      >
        Guardados
      </button>
      <button
        className={`profile__tab${activeTab === 'archivo' ? ' profile__tab--active' : ''}`}
        onClick={() => onTabChange('archivo')}
      >
        Archivo
      </button>
    </div>
  )
}
export default ProfileTabs
