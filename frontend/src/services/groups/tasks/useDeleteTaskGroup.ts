import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"

export const useDeleteTaskGroup = () => {
    return useMutation({
        mutationFn: async ({ id_group, id_task }: { id_group: number, id_task?: number }) => {
            const response = await API.delete(`/groups/${id_group}/delete-task-group/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    task_id: id_task
                }
            })
            if (response.data) {
                return response.data
            }
        },
        onSuccess: (data) => {
            if (data) {
                ToastService(TypeToast.SUCCESS, "Tarefa excluida com sucesso!")
                queryClient.invalidateQueries({ queryKey: ['tasks_group'] })
            }
        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, error?.response?.data?.detail)
        }
    })
}