import API from "@/api/api"
import { useQuery } from "@tanstack/react-query"

type useListMembersGroup = {
    group_id: number
}

export type GroupUser = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string | null;
  total_tasks: number;
  completed_tasks: number;
  role: string;
  is_creator: boolean;
  email: string
};
export const useListUsersGroup = ({ group_id }: useListMembersGroup) => {
    return useQuery({
        queryKey: ['members_group'],
        queryFn: async (): Promise<GroupUser[] | null> => {
            const { data } = await API.get(`/groups/${group_id}/get-users-group/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return data
        },
    })
}