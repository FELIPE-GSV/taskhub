import API from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export interface GroupMember {
    id: number;
    name: string;
    avatar: string | null;
    role: number;
    id_user: number;
}

export interface Group {
    id: number;
    name: string;
    description: string;
    privacy: number;
    createdAt: string;
    members: GroupMember[];
    completedTasks: number;
    tasksCount: number;
    creatorId: number;
}

interface ListGroupsProps {
    filters: {
        name: string,
        privacy: string,
        role: string
    }
}
export const useListGroups = ({ filters }: ListGroupsProps) => {
    return useQuery({
        queryKey: ['groups', filters],
        queryFn: async (): Promise<Group[] | null> => {
            const response = await API.get('/groups/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: filters
            })
            if (response.data) {
                return response.data
            }
            return null
        }
    })
}