import { Route, Routes } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import NotFound from "../pages/NotFound"
import { PublicLayout } from "../layouts/PublicLayout"
import { PrivateLayout } from "../layouts/PrivateLayout"

export const AppRouter = () => {

    const privateRoute = [
        { path: '/', element: <Dashboard /> }
    ]

    const publicRoute = [
        { path: '/login', element: <LoginPage /> },
        { path: '/register', element: <RegisterPage /> },
        { path: '/*', element: <NotFound /> },
    ]

    return (
        <Routes>
            <Route element={<PublicLayout />}>
                {publicRoute.map((item) => (
                    <Route element={item.element} path={item.path} />
                ))}
            </Route>
            <Route element={<PrivateLayout />}>
                {privateRoute.map((item) => (
                    <Route element={item.element} path={item.path} />
                ))}
            </Route>
        </Routes>
    )
}
