import API from "@/api/api"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { useUser } from "@/contexts/userContext"
import { useMutation } from "@tanstack/react-query"
import { Dispatch } from "react"

type UpdateUserProps = {
    reset: () => void,
}
export const useUpdateUser = ({ reset }: UpdateUserProps) => {

    const { setUser, user } = useUser()

    return useMutation({
        mutationFn: async (form_data: FormData) => {
            const response = await API.patch(`/user/${user?.id}/`, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data) {
                return response.data
            }
        },
        onSuccess: (data) => {
            if (data) {
                setUser({
                    ...data,
                    profile_picture: data.profile_picture || null
                })
                ToastService(TypeToast.SUCCESS, "Usuário atualizado com sucesso!")
                reset()
            }
        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, error?.response?.data?.detail)
        }
    })
}