import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useTheme } from '../store/themeColor';
import { Brightness4, Brightness7 } from "@mui/icons-material"

export const PublicLayout = () => {
    const { theme, toggleTheme } = useTheme();

    const user = useAuthStore((state) => state.user);
    if (user) return <Navigate to="/" replace />;

    return (
        <div className="
            relative bg-[#f3f4f6] 
            dark:bg-[#101828]"
        >
            <button
                className="
                absolute right-5 top-5 cursor-pointer rounded-lg bg-white hover:bg-white/60 p-2
                dark:text-white dark:bg-[#1e2939] dark:hover:bg-[#1e2939]/60"
                onClick={toggleTheme}>
                {theme == 'light' ? <Brightness4 /> : <Brightness7 />}
            </button>
            <Outlet />
        </div>
    )
}
