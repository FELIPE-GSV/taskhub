import API from "@/api/api"
import { useUser } from "@/contexts/userContext"
import { useQuery } from "@tanstack/react-query"

export type Notification = {
    id: number
    receiver: number
    sender: number | null
    sender_name: string | null
    title: string
    message: string
    type: number
    type_display: 'Reminder' | 'GroupInvite' | 'GroupEvent'
    read: boolean
    created_at: string
    time_since_created: string
}

export const useListNotification = () => {

    const { setNotifications } = useUser()

    return useQuery({
        queryKey: ['notifications'],
        queryFn: async (): Promise<Notification[] | null> => {
            const { data } = await API.get('/notification/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (data) {
                setNotifications(data)
            }
            return data
        },
    })
}