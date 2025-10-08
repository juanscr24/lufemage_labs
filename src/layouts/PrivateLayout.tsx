import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { Navbar } from "../components/Navbar";

export const PrivateLayout = () => {
    const user = useAuthStore((state) => state.user);
    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="min-h-screen bg-[#f3f4f6] 
            dark:bg-[#101828]">
            <Navbar />
            <Outlet />
        </div>
    )
}
