import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useTheme } from '../store/themeColor';

export const PublicLayout = () => {
    const { theme, toggleTheme } = useTheme();

    const user = useAuthStore((state) => state.user);
    if (user) return <Navigate to="/" replace />;

    return (
        <div className="relative bg-[#f7f8f9] dark:bg-[#23272f]">
            <button className="absolute right-0" onClick={toggleTheme}>{theme == 'light' ? 'Oscuro' : 'Claro'}</button>
            <Outlet />
        </div>
    )
}
