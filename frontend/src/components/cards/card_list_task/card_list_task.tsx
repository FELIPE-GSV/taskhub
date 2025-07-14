import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Task } from "@/contexts/userContext";
import { cn } from "@/lib/utils";
import { getPriorityColor, getStatusColor, getStatusIcon } from "@/utils/utils";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { ConfirmDialogExcludeTask } from "../../modals/confirm_dialog_exclude_task/confirm_dialog_exclude_task";
import { FormTask } from "@/app/pages/tasks/form_task/form_task";

interface CardListTaskProps {
    task: Task
    isDashboard?: boolean
}
export function CardListTask({ task, isDashboard }: CardListTaskProps) {
    return (
        <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center space-x-4">
                <div className={cn(
                    "p-2 rounded-lg",
                    getStatusColor(task.status)
                )}>
                    {getStatusIcon(task.status)}
                </div>
                <div className="flex-1">
                    <h4 className=" text-xl font-medium text-slate-800 dark:text-slate-100">{task.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{task.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                        <Badge variant={"outline"} className="text-sm">
                            {task.responsible}
                        </Badge>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            Vence em {task.expiration_date}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Badge variant={"outline"} className={getPriorityColor(task.priority.id)}>
                    {task.priority.label}
                </Badge>
                {!isDashboard && (
                    <div className="flex items-center space-x-2 ml-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <FormTask
                                    isEdit
                                    task={task}
                                />
                                <ConfirmDialogExcludeTask
                                    idTask={task?.id}
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </div>
        </div>
    )
}