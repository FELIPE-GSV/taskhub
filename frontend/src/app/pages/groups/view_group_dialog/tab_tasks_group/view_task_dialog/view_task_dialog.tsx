import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { TaskGroup } from "@/services/groups/useListTaskGroups";
import { getPriorityConfig, getStatusColor, getStatusConfig, getStatusIcon } from "@/utils/utils";
import { AlertCircle, Building, Calendar, Eye, FileText, Target, User, Users } from "lucide-react";
import { CardListMember } from "./card_list_member_task/card_list_member";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ViewTaskDialogProps = {
    task: TaskGroup
}

export function ViewTaskDialog({ task }: ViewTaskDialogProps) {

    const completePercentage = task.members.filter((member) => member.status_task === 3).length / task.members.length * 100
    const formattedCompletePercentage = completePercentage.toFixed(2)

    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                            <div className={cn("p-2 rounded-lg", getStatusColor(task?.status?.id))}>
                                {getStatusIcon(task?.status?.id)}
                            </div>
                            <div className="flex-1">
                                <DialogTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                                    {task.title}
                                </DialogTitle>
                                <DialogDescription className="text-slate-600 dark:text-slate-300 mt-1">
                                    Tarefa do grupo "{task?.group?.name}"
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>
                <div className="space-y-6 mt-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className={cn(
                            "p-4 rounded-lg border-2",
                            getStatusColor(task?.status?.id),
                            getStatusConfig(task?.status?.id).borderColor
                        )}>
                            <div className="flex items-center space-x-3">
                                <div className={cn("w-3 h-3 rounded-full", getStatusConfig(task?.status?.id).dotColor)} />
                                <div>
                                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                                        Status
                                    </p>
                                    <p className={cn("font-semibold", getStatusColor(task?.status?.id))}>
                                        {task?.status?.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cn(
                            "p-4 rounded-lg border-2",
                            getPriorityConfig(task?.priority).bgColor,
                            getPriorityConfig(task?.priority).borderColor
                        )}>
                            <div className="flex items-center space-x-3">
                                <AlertCircle className={cn("w-4 h-4", getPriorityConfig(task?.priority).iconColor)} />
                                <div>
                                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                                        Prioridade
                                    </p>
                                    <p className={cn("font-semibold", getPriorityConfig(task?.priority).color)}>
                                        {task?.priority === 1 ? 'Baixa' : task?.priority === 2 ? 'Média' : 'Alta'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 col-span-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                                    Progresso da Equipe
                                </h3>
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                                    {task.members.filter((member) => member.status_task === 3).length}/{task.members.length} concluído(s)
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-400">Conclusão da tarefa</span>
                                    <span className="font-medium text-slate-800 dark:text-slate-100">
                                        {formattedCompletePercentage}%
                                    </span>
                                </div>
                                <Progress value={completePercentage} className="h-3" />
                            </div>
                        </div>

                        <div className="space-y-3 col-span-2">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                                <Users className="w-5 h-5 mr-2 text-blue-600" />
                                Membros Atribuídos ({task?.members?.length})
                            </h3>
                            <div className="space-y-3">
                                {task?.members?.map((member, index) => {
                                    return (
                                        <CardListMember
                                            member={member}
                                            key={index}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <Separator className="col-span-2" />
                        <div className="space-y-3 col-span-2">
                            <div className="flex items-center space-x-2">
                                <FileText className="w-5 h-5 text-slate-500" />
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Descrição</h3>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border">
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {task.description}
                                </p>
                            </div>
                        </div>
                        <Separator className="col-span-2" />
                        <div className="space-y-3 col-span-2">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-slate-500" />
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Prazo</h3>
                            </div>
                            <div className={cn(
                                "p-4 rounded-lg border-2",
                                task.is_late
                                    ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                            )}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-slate-100">
                                            {task.expiration_date}
                                        </p>
                                        <p className={cn(
                                            "text-sm font-medium",
                                            task.is_late
                                                ? "text-red-600 dark:text-red-400"
                                                : "text-slate-600 dark:text-slate-400"
                                        )}>
                                            {task.daysLate}
                                        </p>
                                    </div>
                                    <Calendar className={cn(
                                        "w-5 h-5",
                                        task.is_late
                                            ? "text-red-500"
                                            : "text-slate-400"
                                    )} />
                                </div>
                            </div>
                        </div>
                        <Separator className="col-span-2" />
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-slate-500" />
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Criado Por</h3>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={task.created_by.avatar as string} alt={task.created_by.name as string} />
                                        <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                            {task.created_by?.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-slate-800 dark:text-slate-100">
                                            {task.created_by?.name}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {task.created_at}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Building className="w-5 h-5 text-slate-500" />
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Grupo</h3>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-800 dark:text-slate-100">
                                            {task.group.name}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {task.members.length} membros
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}