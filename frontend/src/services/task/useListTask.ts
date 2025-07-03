import API from '@/api/api'
import { Task } from '@/contexts/userContext'
import { useQuery } from '@tanstack/react-query'

interface UseListTasksProps {
    filter?: {
        title: string
        status: string
        priority: string
    }
}

export const useListTasks = ({ filter }: UseListTasksProps) => {
    return useQuery({
        queryKey: ['tasks', filter],
        queryFn: async (): Promise<Task[]> => {
            const { data } = await API.get('/task/user-tasks/',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: filter
            })
            return data
        },

    })
}