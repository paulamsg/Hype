import { LogOut } from 'lucide-react';
import Button from '../Button';
import { useAuth } from "../../../context/useAuth";
const Logout = ({ onCancel }: { onCancel: () => void }) => {
    const {logout} = useAuth()
    return (
        <>
        <div className="profile__logout">
            <div className="profile__logout-header">
                <LogOut  size={64} />
                <h3>Oh no! Te quieres ir...</h3>
                <p>¿Estás seguro de que quieres cerrar sesión?</p>
            </div>
            <div className="profile__logout-footer">
                <Button
                    label="Nah, solo estaba bromeando"
                    variant="primary"
                    size="md"
                    onClick={onCancel}
                />
                <Button
                    label="Sí, deja que me vaya..." 
                    variant="outline-blue" 
                    size="md"
                    onClick ={logout}
                />
            </div>
        </div>
        </>
    );
}
export default Logout;