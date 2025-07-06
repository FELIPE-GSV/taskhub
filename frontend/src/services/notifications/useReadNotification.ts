import API from "@/api/api"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"


export const useReadNotification = () => {
    return useMutation({
        mutationFn: async ({id}: {id: number}) => {
            const response = await API.patch(`/notification/${id}/read-notification/`, {}, {
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
                queryClient.invalidateQueries({ queryKey: ['notifications'] })
            }
        },
    })
}