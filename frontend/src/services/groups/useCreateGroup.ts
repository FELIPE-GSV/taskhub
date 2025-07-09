import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"
import { Group } from "./useListGroups"

type UseCreateGroupProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const useCreateGroup = ({ setIsOpen }: UseCreateGroupProps) => {

    return useMutation({
        mutationFn: async (payload: {
            name: string,
            description: string,
            privacy: number,
            user_ids: number[],
            message: string
        }): Promise<Group | null> => {
            const response = await API.post('/groups/', payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data) {
                return response.data
            }
            return null
        },
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
                queryClient.refetchQueries({ queryKey: ['notifications'] })
                ToastService(TypeToast.SUCCESS, "Grupo criado com sucesso!")
                setIsOpen(false)
            }
        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, error?.response?.data?.detail)
        }
    })

}