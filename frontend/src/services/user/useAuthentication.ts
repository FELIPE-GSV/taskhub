"use client"
import API from '@/api/api'
import { LoginFormData } from '@/app/pages/login/form/form_login'
import { ToastService, TypeToast } from '@/components/toast_service/toast_service'
import { useUser } from '@/contexts/userContext'
import { queryClient } from '@/lib/queryClient'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'


export function useAuthentication() {
    const router = useRouter()
    const now = new Date().getTime();

    const { setUser } = useUser()


    return useMutation({
        mutationFn: async (payload: LoginFormData) => {
            const response = await API.post('/login/', payload)
            return response.data
        },
        onSuccess: async (data) => {
            localStorage.setItem('token', data.access);
            localStorage.setItem('tokenTimestamp', now.toString());

            const response = await API.get('/user/get-user/', {
                headers: {
                    Authorization: `Bearer ${data.access}`
                }
            })
            if (response.data) {
                setUser(response.data)
                ToastService(TypeToast.SUCCESS, 'Login realizado com sucesso!')
                queryClient.invalidateQueries({ queryKey: ['notifications'] })
                router.push('/pages/dashboard')
            }

        },
        onError: (error: any) => {
            ToastService(TypeToast.WARNING, error?.response?.data?.detail)
        },
    })
}
