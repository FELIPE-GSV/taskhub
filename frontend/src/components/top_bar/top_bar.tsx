import { Bell, LogOut, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/contexts/userContext";
import { usePathname, useRouter } from "next/navigation";


export function TopBar() {

    const { user } = useUser()
    const router = useRouter()
    const pathname = usePathname()

    const titles: { [key: string]: string } = {
        "/pages/dashboard": "Dashboard",
        "/pages/groups": "Grupos",
        "/pages/tasks": "Tarefas",
        "/pages/profile": "Perfil",
    };

    const getTitle = () => {
        return titles[pathname] || "Página";
    };
    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        router.push("/pages/login");
    }

    return (
        <header className={`bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 ${pathname === "/pages/login" ? "hidden" : ""}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{getTitle()}</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="relative">
                                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                {/* {unreadNotifications > 0 && (
                                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                                        {unreadNotifications}
                                    </Badge>
                                )} */}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* {notifications.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className="flex flex-col items-start p-4 cursor-pointer"
                                    onClick={() => markNotificationAsRead(notification.id)}
                                >
                                    <div className="flex items-start justify-between w-full">
                                        <div className="flex-1">
                                            <p className={cn(
                                                "font-medium text-sm",
                                                !notification.read && "text-blue-600 dark:text-blue-400"
                                            )}>
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-2">{notification.time}</p>
                                        </div>
                                        {!notification.read && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                                        )}
                                    </div>
                                </DropdownMenuItem>
                            ))} */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src={user?.profile_picture as any}
                                        alt={user?.first_name}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 gap-2">
                                        {user?.first_name?.substring(0, 1)?.toLocaleUpperCase()}
                                        {user?.last_name?.substring(0, 1)?.toLocaleUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{user?.first_name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => router.push("/pages/profile")}
                            >
                                <User className="mr-2 h-4 w-4" />
                                Perfil
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={() => signOut()}>
                                <LogOut className="mr-2 h-4 w-4 text-red-600 dark:text-red-400" />
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}