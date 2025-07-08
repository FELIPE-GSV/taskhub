import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"
import { Group } from "./useListGroups"

export const useCreateGroup = () => {

    return useMutation({
        mutationFn: async (payload: {
            name: string,
            description: string,
            privacy: number,
            user_ids: number[]
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
            }
        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, error?.response?.data?.detail)
        }
    })

}