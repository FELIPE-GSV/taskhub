// hooks/useDeleteTask.ts
import API from '@/api/api'
import { ToastService, TypeToast } from '@/components/toast_service/toast_service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (taskId?: number) => {
      const { data } = await API.delete(`/task/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (data) {
        return data
      }
    },
    onSuccess: (data) => {
      if (data) {
        ToastService(TypeToast.SUCCESS, "Tarefa excluida com sucesso!")
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
        queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      }
    },

    onError: (error: any) => {
      ToastService(TypeToast.WARNING, error?.response?.data?.detail)
    }
  })
}
