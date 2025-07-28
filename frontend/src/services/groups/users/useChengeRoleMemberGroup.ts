import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"

export const useChangeRoleMemberGroup = () => {
    return useMutation({
        mutationFn: async ({ id_user, id_group }: {
            id_user: number,
            id_group: number
        }) => {
            const { data } = await API.patch(`/groups/${id_group}/change-role-member/`, {
                id_user
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return data
        },
        onSuccess: (data) => {
            if (data) {
                ToastService(TypeToast.SUCCESS, "Cargo alterado com sucesso!")
                queryClient.invalidateQueries({ queryKey: ['members_group'] })
            }
        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, error?.response?.data?.message)
        }
    })
}