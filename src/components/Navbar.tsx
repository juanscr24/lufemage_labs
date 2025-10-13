import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from './ButtonComponent';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import LogoutIcon from '@mui/icons-material/Logout';
import { ButtonMode } from './ButtonMode';

export const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <nav className='flex px-12 py-4 justify-between items-center shadow mb-1 text-[#6b7280] dark:text-white'>
            <div className='flex items-center gap-4 text-black dark:text-white'>
                <QrCodeScannerIcon />
                <h1 className='text-2xl font-bold'>Lufemage Labs</h1>
            </div>
            <p className='cursor-pointer hover:text-[#1e84ec]'>Productos</p>
            <div className='flex items-center gap-10'>
                <ButtonMode variant='dashboard' />
                {user && <p>Bienvenido, {user.email_user}</p>}
                <ButtonComponent variant='empty' fit type='button' onClick={handleLogout} icon={<LogoutIcon />} />
            </div>
        </nav>
    )
}
