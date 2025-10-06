import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export const PrivateLayout = () => {
    const user = useAuthStore((state) => state.user);
    if (!user) return <Navigate to="/login" replace />;

    return (
        <>
            <Outlet />
        </>
    )
}
