import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"

type InviteMembersGroup = {
    id_group: number
    users: number[]
    message?: string
}

type UseInviteMembersGroupProps = {
    setIsOpen: (value: boolean) => void
}

export const useInviteMembersGroup = ({ setIsOpen }: UseInviteMembersGroupProps) => {
    return useMutation({
        mutationFn: async (data: InviteMembersGroup) => {
            const response = await API.post(`/groups/${data.id_group}/invite-members-group/`, data, {
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
                ToastService(TypeToast.SUCCESS, "Convites enviados com sucesso!")
                queryClient.invalidateQueries({ queryKey: ['groups'] })
                setIsOpen(false)
            }
        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, error?.response?.data?.detail)
        }
    })
}