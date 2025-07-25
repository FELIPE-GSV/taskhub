import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/userContext";
import { Group } from "@/services/groups/tasks/useListGroups";
import { CalendarDays, CheckSquare, Crown, Eye, Shield, User, Users } from "lucide-react";
import { useState } from "react";
import { TabTasksGroup } from "./tab_tasks_group/tab_tasks_group";
import { TabUsersGroup } from "./tab_users_group/tab_users_group";

type ViewGroupDialogProps = {
    group: Group
}
export function ViewGroupDialog({ group }: ViewGroupDialogProps) {
    const { user } = useUser()
    const isCreator = group.creatorId === user?.id
    const getUserRole = (group: Group) => {
        const member = group.members.find(m => m.id_user === user?.id)
        return member?.role || null
    }
    const userRole = getUserRole(group)
    const [activeTab, setActiveTab] = useState('tasks')

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[60%] max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <DialogTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                                    {group.name}
                                </DialogTitle>
                                <DialogDescription className="text-slate-600 dark:text-slate-300 mt-1">
                                    {group.description}
                                </DialogDescription>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge className={group.privacy === 2 ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'}>
                                        {group.privacy === 2 ? 'Privado' : 'Público'}
                                    </Badge>
                                    {isCreator ? (
                                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                                            <Crown className="w-3 h-3 mr-1" />
                                            Criador
                                        </Badge>
                                    ) : userRole && (
                                        <Badge className={userRole === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' : 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300'}>
                                            {userRole === 1 ? (
                                                <>
                                                    <Shield className="w-3 h-3 mr-1" />
                                                    Admin
                                                </>
                                            ) : (
                                                <>
                                                    <User className="w-3 h-3 mr-1" />
                                                    Membro
                                                </>
                                            )}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
                            <TabsTrigger value="tasks" className="flex items-center data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium transition-all duration-200">
                                <CheckSquare className="w-4 h-4 mr-2" />
                                Tarefas
                            </TabsTrigger>
                            <TabsTrigger value="events" className="flex items-center data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium transition-all duration-200">
                                <CalendarDays className="w-4 h-4 mr-2" />
                                Eventos
                            </TabsTrigger>
                            <TabsTrigger value="members" className="flex items-center data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium transition-all duration-200">
                                <Users className="w-4 h-4 mr-2" />
                                Membros
                            </TabsTrigger>
                        </TabsList>
                        <div className="flex-1 overflow-y-auto mt-4">
                            <TabTasksGroup
                                isCreator={isCreator}
                                userRole={userRole}
                                group={group}
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto mt-4">
                            <TabUsersGroup
                                isCreator={isCreator}
                                userRole={userRole}
                                group={group}
                            />
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}