import { Group } from "@/services/groups/useListGroups"
import { Crown, Eye, LogOut, MoreHorizontal, Settings, Shield, Trash2, User, UserPlus, Users } from "lucide-react"
import { Badge } from "../ui/badge"
import { getPrivacyGroupColor, getRoleGroupColor } from "@/utils/utils"
import { useUser } from "@/contexts/userContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type CardListGroupProps = {
    group: Group
}
export function CardListGroup({ group }: CardListGroupProps) {

    const { user } = useUser()
    const isCreator = group.creatorId === user?.id

    const getUserRole = (group: Group) => {
        const member = group.members.find(m => m.id_user === user?.id);
        return member?.role || null;
    };
    const userRole = getUserRole(group);
    console.log(userRole)

    return (
        <div
            className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3 flex-1">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                            {group.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                            {group.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge className={getPrivacyGroupColor(group.privacy)}>
                                {group.privacy === 2 ? 'Privado' : 'Público'}
                            </Badge>
                            {isCreator ? (
                                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Criador
                                </Badge>
                            ) : userRole && (
                                <Badge className={getRoleGroupColor(userRole)}>
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                // handleViewGroup(group)
                            }}
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                        </DropdownMenuItem>
                        {(userRole === 1 || isCreator) && (
                            <>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Configurações
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        // handleInviteMembers(group)
                                    }}
                                >
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Convidar Membros
                                </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuSeparator />
                        {isCreator ? (
                            <DropdownMenuItem
                                className="text-red-600 dark:text-red-400"
                                onClick={() => {
                                    // handleDeleteGroup(group.id)
                                }}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir Grupo
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem
                                className="text-red-600 dark:text-red-400"
                                onClick={() => {
                                    // handleLeaveGroup(group.id)
                                }}
                            >
                                <LogOut className="mr-2 h-4 w-4 text-red-600" />
                                Sair do Grupo
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Membros ({group.members.length})
                    </span>
                </div>
                <div className="flex -space-x-2">
                    {group.members.slice(0, 5).map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-white dark:border-slate-800">
                            <AvatarImage src={member.avatar as string} alt={member.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xs">
                                {member.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    ))}
                    {group.members.length > 5 && (
                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                +{group.members.length - 5}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}