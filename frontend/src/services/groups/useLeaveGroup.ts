import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"


export const useLeaveGroup = () => {
    return useMutation({
        mutationFn: async (id_group: number) => {
            const response = await API.delete(`/groups/${id_group}/leave-group/`, {
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
                queryClient.invalidateQueries({ queryKey: ['groups'] })
                ToastService(TypeToast.SUCCESS, "Usuário removido com sucesso!")
            }
        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, "Error ao sair do grupo.")
        }
    })
}