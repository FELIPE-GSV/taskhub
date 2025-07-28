import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"

export const useRemoveMemberGroup = () => {
    return useMutation({
        mutationFn: async ({id_group, id_user}:{id_user: number, id_group: number}) => {
            const { data } = await API.delete(`/groups/${id_group}/remove-user-group/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    id_user: id_user
                }
            })
            return data
        },
        onSuccess: (data) => {
            if (data) {
                ToastService(TypeToast.SUCCESS, "Usuário removido com sucesso!")
                queryClient.invalidateQueries({ queryKey: ['members_group'] })
            }
        },
        onError: () => {
            ToastService(TypeToast.WARNING, "Error ao remover membro do grupo.")
        }
    })
}