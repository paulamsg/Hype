import Logo from "../ui/Logo"
import { useAuth } from "../../context/useAuth"
import { useNavigate } from "react-router-dom"

const Topbar = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <header className="topbar">
            <div className="topbar__left">
                <Logo />
            </div>
            <nav className="topbar__nav">
                <button 
                    className="topbar__tab topbar__tab--active"
                    onClick={() => navigate("/descubre")}
                >
                    Descubre
                </button>
                <button 
                    className="topbar__tab"
                    onClick={() => navigate("/amigos")}
                >
                    Amigos
                </button>
                <button 
                    className="topbar__tab"
                    onClick={() => navigate("/grupos")}
                >
                    Grupos
                </button>
                <button 
                    className="topbar__tab"
                    onClick={() => navigate("/perfil")}
                >
                    Perfil
                </button>
            </nav>

            <div className="topbar__right">
                <div className="topbar__avatar" onClick={() => navigate("/perfil")}>
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    )
}

export default Topbar