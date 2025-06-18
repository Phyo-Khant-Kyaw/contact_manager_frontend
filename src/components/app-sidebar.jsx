import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "./ui/sidebar";

import { Link, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";

export function AppSidebar() {
    const navigate = useNavigate();
    const user = {
        name: "Phyo Khant Kyaw",
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="p-4 flex items-center gap-2 text-lg font-semibold">
                    {user.name}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-200 rounded"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                    <LogOut className="w-4 h-4" />
                    Log Out
                </button>
            </SidebarFooter>
        </Sidebar>
    );
}
