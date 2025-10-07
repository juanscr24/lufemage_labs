import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <nav className='flex justify-around'>
            <h1>Dashboard</h1>
            <div className='flex items-center gap-10'>
                {user && <p>Bienvenido, {user.email_user}</p>}
                <Button onClick={handleLogout} variant="outlined">Cerrar sesión</Button>
            </div>
        </nav>
    )
}
