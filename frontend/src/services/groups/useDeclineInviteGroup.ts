import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"


type UseDeclineInviteGroupProps = {
    setIsOpen: (prop: boolean) => void
}

export const useDeclineInviteGroup = ({ setIsOpen }: UseDeclineInviteGroupProps) => {
    return useMutation({
        mutationFn: async (data: {
            id_notification: number
        }) => {
            const response = await API.patch(`/groups/decline-invite/`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return response.data
        },
        onSuccess: (data) => {
            if (data) {
                queryClient.refetchQueries({ queryKey: ['notifications'] })
                queryClient.refetchQueries({ queryKey: ['groups'] })
                setIsOpen(false)
                ToastService(TypeToast.SUCCESS, "Convite recusado com sucesso!")
            }
        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, error?.response?.data?.detail)
        }
    })
}