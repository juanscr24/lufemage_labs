import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Dashboard = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="p-4">
            <h1>Dashboard</h1>
            {user && <p>Bienvenido, {user.email_user}</p>}
            <Button onClick={handleLogout} variant="outlined">Cerrar sesión</Button>
        </div>
    )
}

export default Dashboard
