import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { ButtonMode } from "../components/ButtonMode";

export const PublicLayout = () => {

    const user = useAuthStore((state) => state.user);
    if (user) return <Navigate to="/" replace />;

    return (
        <div className="
            relative bg-[#f3f4f6] 
            dark:bg-[#101828]"
        >
            <ButtonMode />
            <Outlet />
        </div>
    )
}
