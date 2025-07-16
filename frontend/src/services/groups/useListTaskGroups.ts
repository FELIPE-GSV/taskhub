import API from "@/api/api";
import { useQuery } from "@tanstack/react-query"

export interface TaskMember {
    id: number;
    name: string;
    email: string;
    complete: boolean;
    avatar: string ;
}

export interface TaskGroup {
    id: number;
    title: string;
    description: string;
    status: {
        id: number;
        status: string;
    };
    priority: number;
    daysLate: string;
    members: TaskMember[];
}

type UseListTaskGroup = {
    id_group: number
}

export const useListTaskGroup = ({ id_group }: UseListTaskGroup) => {
    return useQuery({
        queryKey: ['tasks_group'],
        queryFn: async (): Promise<TaskGroup[]> => {
            const { data } = await API.get(`/groups/${id_group}/tasks/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return data
        },
    })
}