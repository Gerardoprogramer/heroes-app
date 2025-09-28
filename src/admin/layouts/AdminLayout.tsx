import { Outlet } from "react-router"

export const AdminLayout = () => {
    return (
        <div className="bg-emerald-700">
            <Outlet />
        </div>
    )
}
