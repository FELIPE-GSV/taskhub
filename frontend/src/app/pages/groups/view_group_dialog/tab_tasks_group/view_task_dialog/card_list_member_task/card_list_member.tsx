import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { TaskMember } from "@/services/groups/useListTaskGroups"
import { CheckCircle2, Clock } from "lucide-react"

type CardListMemberProps = {
    member: TaskMember
}
export function CardListMember({ member }: CardListMemberProps) {
    return (
        <div
            className={cn(
                "p-4 rounded-lg border-2 transition-colors",
                member.status_task === 3
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                            {member.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium text-slate-800 dark:text-slate-100">
                            {member.name}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {member.email}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    {member.status_task === 3 ? (
                        <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <div className="text-right">
                                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                    Concluído
                                </p>
                            </div>
                        </div>
                    ) : member.status_task === 2 ? (
                        <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                Em andamento
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-amber-600" />
                            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                Pendente
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}