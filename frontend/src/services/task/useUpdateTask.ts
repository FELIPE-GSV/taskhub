import API from "@/api/api"
import { TaskFormData } from "@/app/pages/tasks/form_task/form_task"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { Task } from "@/contexts/userContext"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"

interface UpdateTaskProps {
    id?: number,
    closeModalCreateTask: Dispatch<SetStateAction<boolean>>
}
export const useUpdateTask = ({ id, closeModalCreateTask }: UpdateTaskProps) => {
    return useMutation({
        mutationFn: async (data_update?: TaskFormData) => {
            const response = await API.put(`task/${id}/`, data_update,{
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
                queryClient.invalidateQueries({ queryKey: ['tasks']})
                queryClient.invalidateQueries({ queryKey: ['dashboard']})
                ToastService(TypeToast.SUCCESS, "Tarefa atualizada com sucesso!")
                closeModalCreateTask(false)
            }
        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, error?.response?.data?.detail)
        }
    })
}