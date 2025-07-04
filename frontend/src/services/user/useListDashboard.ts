import API from '@/api/api'
import { DashboardUser } from '@/contexts/userContext'
import { useQuery } from '@tanstack/react-query'


export const useListDashboard = () => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: async (): Promise<DashboardUser> => {
            const { data } = await API.get('/user/dashboard-user/',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            return data
        },

    })
}