import { ViewTaskDialog } from "@/app/pages/groups/view_group_dialog/tab_tasks_group/view_task_dialog/view_task_dialog"
import { ConfirmDialogExcludeTask } from "@/components/modals/confirm_dialog_exclude_task/confirm_dialog_exclude_task"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { TaskGroup } from "@/services/groups/tasks/useListTaskGroups"
import { useToggleTaskGroup } from "@/services/groups/useToggleTaskGroup"
import { getPriorityColor, getStatusColor, getStatusIcon } from "@/utils/utils"
import { BadgeCheck, Calendar, CirclePlay, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"

type UseCardListTaskGroupProps = {
    task: TaskGroup
    isCreator: boolean
    userRole: number | null,
}

export function CardListTaskGroup({ task, isCreator, userRole }: UseCardListTaskGroupProps) {

    const { mutateAsync: toggleTaskGroup } = useToggleTaskGroup()

    return (
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                    <div className={cn("p-2 rounded-lg", getStatusColor(task?.status?.id))}>
                        {getStatusIcon(task?.status?.id)}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-1">
                            {task.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                            {task.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge className={cn(getStatusColor(task?.status?.id))}>
                                {task?.status?.status}
                            </Badge>
                            <Badge className={cn(getPriorityColor(task?.priority))}>
                                {task?.priority === 1 ? 'Baixa' : task?.priority === 2 ? 'Média' : 'Alta'}
                            </Badge>
                            <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {task.daysLate}
                            </span>
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
                        {task.user_status.id === 1 ? (
                            <DropdownMenuItem
                                className="text-blue-600"
                                onClick={() => toggleTaskGroup({ id_group: task?.group?.id, task_id: task.id, is_in_progress: true })}
                            >
                                <CirclePlay className="mr-2 h-4 w-4 text-blue-600" />
                                Iniciar tarefa
                            </DropdownMenuItem>
                        ) : task.user_status.id === 2 ? (
                            <DropdownMenuItem
                                className="text-green-600"
                                onClick={() => toggleTaskGroup({ id_group: task?.group?.id, task_id: task.id, is_in_progress: false })}
                            >
                                <BadgeCheck className="mr-2 h-4 w-4 text-green-600" />
                                Finalizar tarefa
                            </DropdownMenuItem>
                        ) : null}
                        <ViewTaskDialog
                            task={task}
                        />
                        {(userRole === 1 || isCreator) && (
                            <>
                                <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                </DropdownMenuItem>
                                <ConfirmDialogExcludeTask
                                    groupId={task?.group?.id}
                                    idTask={task.id}
                                />
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Atribuída a:</span>
                    <div className="flex -space-x-1">
                        {task.members.map((member, index) => {
                            return (
                                <Avatar key={index} className="h-6 w-6 border-2 border-white dark:border-slate-800">
                                    <AvatarImage src={member?.avatar} alt={member.name} />
                                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xs">
                                        {member.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            );
                        })}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {task.members.map(member => member?.name).filter(Boolean).join(', ')}
                    </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                    Criada por {task?.created_by?.name}
                </span>
            </div>
        </div>
    )
}