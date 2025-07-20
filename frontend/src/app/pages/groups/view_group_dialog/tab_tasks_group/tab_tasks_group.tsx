import { TabsContent } from "@/components/ui/tabs"
import { CheckSquare, Tag } from "lucide-react"
import { CreateGroupTaskDialog } from "./create_group_task_dialog/create_group_task_dialog"
import { Group } from "@/services/groups/tasks/useListGroups"
import { useListTaskGroup } from "@/services/groups/tasks/useListTaskGroups"
import { CardListTaskGroup } from "@/components/cards/card_list_task_group/card_list_task_group"

export type TabGroupProps = {
    isCreator: boolean
    userRole: number | null,
    group: Group
}
export const TabTasksGroup = ({ isCreator, userRole, group }: TabGroupProps) => {

    const { data: tasks_group } = useListTaskGroup({ id_group: group.id })

    return (
        <TabsContent value="tasks" className="space-y-4 m-0">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Tarefas do Grupo</h3>
                {userRole === 1 && isCreator && (
                    <CreateGroupTaskDialog group={group} />
                )}
            </div>
            {tasks_group?.length === 0 ?
                <div className="text-center py-8">
                    <div className="text-center py-8">
                        <CheckSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
                            Nenhuma tarefa encontrada
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                            Comece criando a primeira tarefa do grupo.
                        </p>
                        {userRole === 1 && isCreator && (
                            <CreateGroupTaskDialog
                                group={group}
                            />
                        )}
                    </div>
                </div>
                :
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {tasks_group?.map((task, index) => {
                        return (
                            <CardListTaskGroup
                                task={task}
                                key={index}
                                isCreator={isCreator}
                                userRole={userRole}
                            />
                        )
                    })}
                </div>
            }
        </TabsContent>
    )
}