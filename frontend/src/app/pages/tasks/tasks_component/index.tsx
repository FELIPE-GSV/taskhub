import { CardListTask } from "@/components/cards/card_list_task/card_list_task";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Task, useUser } from "@/contexts/userContext";
import { cn } from "@/lib/utils";
import { useListTasks } from "@/services/task/useListTask";
import { CheckCircle2 } from "lucide-react";
import { use } from "react";

export function TaskComponent() {

    const {
        filterPriorityTask,
        filterStatusTask,
        filterTitleTask
    } = useUser()


    const { data: tasks } = useListTasks({filter:{
        title: filterTitleTask,
        priority: filterPriorityTask,
        status: filterStatusTask
    }});

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-slate-800 dark:text-slate-100">
                            Lista de Tarefas
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {tasks?.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
                            Nenhuma tarefa encontrada
                        </h3>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {tasks?.map((task, index) => (
                            <CardListTask
                                key={index}
                                task={task}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}