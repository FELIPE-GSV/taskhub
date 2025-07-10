import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"

type UseAccpetInviteGroupProps = {
    setIsOpen: (prop: boolean) => void
}
export const useAccpetInviteGroup = ({ setIsOpen }: UseAccpetInviteGroupProps) => {
    return useMutation({
        mutationFn: async (data: {
            id_notification: number
            id_group: number
        }) => {
            const response = await API.patch(`/groups/accept-invite/`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data) {
                queryClient.refetchQueries({ queryKey: ['notifications'] })
                queryClient.refetchQueries({ queryKey: ['groups'] })
                setIsOpen(false)
                ToastService(TypeToast.SUCCESS, "Convite aceito com sucesso!")
                return response.data
            }
        }
    })
}