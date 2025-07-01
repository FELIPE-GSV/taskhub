import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Task } from "@/contexts/userContext";
import { cn } from "@/lib/utils";
import { getPriorityColor, getStatusColor, getStatusIcon } from "@/utils/utils";
import { MoreHorizontal } from "lucide-react";

interface CardListTaskProps {
    task: Task
}
export function CardListTask({ task }: CardListTaskProps) {
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
                <Badge variant={"outline"} className={getPriorityColor(task.priority)}>
                    Alta
                </Badge>
                <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}