import { ConfirmDialogExcludeMember } from "@/components/modals/confirm_dialog_exclude_member/confirm_dialog_exclude_member"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/contexts/userContext"
import { Group } from "@/services/groups/tasks/useListGroups"
import { useChangeRoleMemberGroup } from "@/services/groups/users/useChengeRoleMemberGroup"
import { GroupUser } from "@/services/groups/users/useListMembersGroup"
import { AvatarImage } from "@radix-ui/react-avatar"
import { CheckCircle2, Crown, MoreHorizontal, Shield, Target, Trash2, User } from "lucide-react"

type CardListMemberGroupProps = {
    member: GroupUser,
    userRole: number | null
    group: Group
}

export function CardListMemberGroup({ member, userRole, group }: CardListMemberGroupProps) {

    const { user } = useUser()
    const isCurrentUser = member.id === user?.id
    const {mutateAsync: changeRole} = useChangeRoleMemberGroup()


    return (
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar as string} alt={member.id.toString()} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                            {member.first_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-slate-800 dark:text-slate-100">
                                {member.first_name} {member.last_name} {isCurrentUser && '(Você)'}
                            </h4>
                            {member.is_creator ? (
                                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Criador
                                </Badge>
                            ) : (
                                <Badge className={member.role === "1" ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' : 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300'}>
                                    {member.role === "1" ? (
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
                        <p className="text-sm text-slate-600 dark:text-slate-400">{member.email}</p>
                        <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                <Target className="w-3 h-3 inline mr-1" />
                                {member.total_tasks} tarefas atribuídas
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                <CheckCircle2 className="w-3 h-3 inline mr-1" />
                                {member.completed_tasks} concluídas
                            </span>
                        </div>
                    </div>
                </div>
                {(member.is_creator || userRole === 1) && !isCurrentUser && !member.is_creator && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações do Membro</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {!member.is_creator && (
                                <>
                                    <DropdownMenuItem onSelect={() => changeRole({id_group: group.id, id_user: member.id})}>
                                        <Shield className="mr-2 h-4 w-4" />
                                        {member.role === '1' ? 'Remover Admin' : 'Tornar Admin'}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <ConfirmDialogExcludeMember
                                        group={group}
                                        id_user={member.id}
                                    />
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
            {member.total_tasks > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600 dark:text-slate-400">Progresso das tarefas</span>
                        <span className="font-medium">{Math.round((member.completed_tasks / member.total_tasks) * 100)}%</span>
                    </div>
                    <Progress value={(member.completed_tasks / member.total_tasks) * 100} className="h-2" />
                </div>
            )}
        </div>
    )
}