import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"

export const useToggleTaskGroup = () => {
    return useMutation({
        mutationFn: async (payload: {
            id_group: number,
            task_id: number,
            is_in_progress: boolean
        }) => {
            const { data } = await API.patch(`/groups/${payload.id_group}/toggle-task-group/`, {
                task_id: payload.task_id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    is_in_progress: payload.is_in_progress ? true : null
                }
            },
            )
            return data
        },
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries({ queryKey: ['tasks_group'] })
            }
        },
        onError: (error) => {
            console.log(error)
            ToastService(TypeToast.ERROR, "Error ao atualizar tarefa!")

        }
    })
}