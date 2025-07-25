import API from "@/api/api"
import { GroupTaskFormData } from "@/app/pages/groups/view_group_dialog/tab_tasks_group/create_group_task_dialog/useCreateTaskGroupDialog"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"

type UseCreateTaskGroup = {
    setIsOpen: (prop: boolean) => void
}

export const useCreateTaskGroup = ({ setIsOpen }: UseCreateTaskGroup) => {
    return useMutation({
        mutationFn: async ({ group_id, task_data }: {
            group_id: number,
            task_data: GroupTaskFormData
        }) => {
            const response = await API.post(`/groups/${group_id}/create-task-group/`, task_data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data) {
                return response.data
            }
        },
        onSuccess: (data) => {
            if (data) {
                queryClient.refetchQueries({ queryKey: ['tasks_group'] })
                ToastService(TypeToast.SUCCESS, "Tarefa criada com sucesso!")
                setIsOpen(false)
            }
        }
    })
}