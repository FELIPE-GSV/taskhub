import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { User } from "@/contexts/userContext"
import { useMutation } from "@tanstack/react-query"

interface UseGetUserByEmailProps {
  email: string
}

export const useGetUserByEmail = () => {
  return useMutation({
    mutationFn: async ({ email }: UseGetUserByEmailProps): Promise<User | null> => {
      const { data } = await API.get('/user/get-user-by-email/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: { email }
      })
      return data
    },
    onError (error: any) {
      ToastService(TypeToast.WARNING, error?.response?.data?.message)
    }
  })
}