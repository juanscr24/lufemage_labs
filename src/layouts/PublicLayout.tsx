import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export const PublicLayout = () => {
    const user = useAuthStore((state) => state.user);
    if (user) return <Navigate to="/" replace />;

    return (
        <>
            <Outlet />
        </>
    )
}
