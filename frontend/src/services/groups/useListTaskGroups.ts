import API from "@/api/api";
import { useQuery } from "@tanstack/react-query"

export interface TaskMember {
    id: number;
    name: string;
    email: string;
    status_task: number;
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
    created_by: {
        name: string,
        avatar: string
    };
    group: {
        id: number;
        name: string;
    };
    user_status: {
        id: number;
        status: string;
    }
    created_at: string;
    is_late: boolean;
    expiration_date: string
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