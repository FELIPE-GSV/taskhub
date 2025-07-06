// hooks/useCreateTask.ts
import API from '@/api/api'
import { TaskFormData } from '@/app/pages/tasks/form_task/form_task'
import { ToastService, TypeToast } from '@/components/toast_service/toast_service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

interface UseCreateTaskProps {
    closeModalCreateTask: Dispatch<SetStateAction<boolean>>
}

export const useCreateTask = ({ closeModalCreateTask }: UseCreateTaskProps) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (newTask: TaskFormData) => {
            const response = await API.post('/task/', newTask, {
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
                closeModalCreateTask(false)
                ToastService(TypeToast.SUCCESS, "Tarefa criada com sucesso!")
                queryClient.refetchQueries({ queryKey: ['tasks'] })
                queryClient.refetchQueries({ queryKey: ['notifications'] })
            }
        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, error?.response?.data?.detail)
        }
    })
}
