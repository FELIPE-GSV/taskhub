import API from "@/api/api";
import { SignupFormData } from "@/app/pages/login/form/form_register";
import { ToastService, TypeToast } from "@/components/toast_service/toast_service";
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

type Props = {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}
export function useUserRegister({ setIsLogin }: Props) {
    const now = new Date().getTime();

    return useMutation({
        mutationFn: async (payload: SignupFormData) => {
            const response = await API.post('/user/', payload)
            if (response.data){
                setIsLogin(true)
                return response.data
            }
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.access);
            localStorage.setItem('tokenTimestamp', now.toString());
            ToastService(TypeToast.SUCCESS, 'Usuário registrado com sucesso!')
        },
        onError: (error: any) => {
            console.log(error)
            if (error.response.data.email){
                ToastService(TypeToast.WARNING, "Já existe um usuário com esse email.")
            } else {
                ToastService(TypeToast.WARNING, error?.response?.data?.detail)
            }
        },
    })
}