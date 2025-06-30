"use client"
import { CheckSquare, Home, Menu, Users } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation"

export function SideBar() {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const pathname = usePathname()
    const router = useRouter()

    const sidebarItems = [
        { icon: Home, label: 'Dashboard', active: pathname === "/pages/dashboard", pathname: "/pages/dashboard" },
        { icon: Users, label: 'Groups', active: pathname === "/pages/groups", pathname: "/pages/groups" },
    ];

    return (
        <div className={cn(
            `relative h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ${pathname === "/pages/login" ? "hidden" : ""}`,
            sidebarCollapsed ? "w-16" : "w-64"
        )}>
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                {!sidebarCollapsed && (
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                            <CheckSquare className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-800 dark:text-slate-100">TaskHub</span>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                    <Menu className="w-4 h-4" />
                </Button>
            </div>

            <nav className="p-4 space-y-2">
                {sidebarItems.map((item, index) => (
                    <Button
                        key={index}
                        variant={item.active ? "default" : "ghost"}
                        className={cn(
                            "w-full justify-start text-left cursor-pointer",
                            item.active
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
                            sidebarCollapsed && "justify-center px-2"
                        )}
                        onClick={()=> router.push(item.pathname)}
                    >
                        <item.icon className={cn("w-5 h-5", !sidebarCollapsed && "mr-3")} />
                        {!sidebarCollapsed && item.label}
                    </Button>
                ))}
            </nav>
        </div>
    )
}