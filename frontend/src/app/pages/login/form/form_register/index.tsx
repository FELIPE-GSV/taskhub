import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useUserRegister } from "@/services/user/useUserRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const signupSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
    first_name: z.string().min(1, 'Este campo é obrigatório.').max(50, 'Tamanho máximo de 50 caracteres'),
    last_name: z.string().min(1, 'Este campo é obrigatório.').max(50, 'Tamanho.maxcdn de 50 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;
type FormRegisterProps = {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};
export function FormRegister({ setIsLogin }: FormRegisterProps) {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const register = useUserRegister({setIsLogin: setIsLogin});
    const signupForm = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            first_name: '',
            last_name: '',
        },
    });

    const onSignupSubmit = (data: SignupFormData) => {
        register.mutate(data);
    };

    return (
        <TabsContent value="signup">
            <CardHeader className="space-y-1 mb-3 mt-2">
                <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Criar conta</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                    Preencha os dados abaixo para criar sua conta
                </CardDescription>
            </CardHeader>
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
                <CardContent className="space-y-4 mb-6">
                    <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-slate-700 dark:text-slate-200 font-medium">Primeiro nome</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <Input
                                id="signup-first-name"
                                type="text"
                                placeholder="Seu primeiro nome"
                                className="pl-10 border-2 focus:border-blue-500 transition-colors text-slate-800 dark:text-slate-100"
                                {...signupForm.register('first_name')}
                            />
                        </div>
                        {signupForm.formState.errors.first_name && (
                            <p className="text-sm text-destructive">{signupForm.formState.errors.first_name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-slate-700 dark:text-slate-200 font-medium">Último nome</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <Input
                                id="signup-last-name"
                                type="text"
                                placeholder="Seu último nome"
                                className="pl-10 border-2 focus:border-blue-500 transition-colors text-slate-800 dark:text-slate-100"
                                {...signupForm.register('last_name')}
                            />
                        </div>
                        {signupForm.formState.errors.last_name && (
                            <p className="text-sm text-destructive">{signupForm.formState.errors.last_name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-slate-700 dark:text-slate-200 font-medium">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <Input
                                id="signup-email"
                                type="email"
                                placeholder="seu@email.com"
                                className="pl-10 border-2 focus:border-blue-500 transition-colors text-slate-800 dark:text-slate-100"
                                {...signupForm.register('email')}
                            />
                        </div>
                        {signupForm.formState.errors.email && (
                            <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-slate-700 dark:text-slate-200 font-medium">Senha</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <Input
                                id="signup-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10 border-2 focus:border-blue-500 transition-colors text-slate-800 dark:text-slate-100"
                                {...signupForm.register('password')}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                                ) : (
                                    <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                                )}
                            </Button>
                        </div>
                        {signupForm.formState.errors.password && (
                            <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signup-confirm-password" className="text-slate-700 dark:text-slate-200 font-medium">Confirmar senha</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <Input
                                id="signup-confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10 border-2 focus:border-blue-500 transition-colors text-slate-800 dark:text-slate-100"
                                {...signupForm.register('confirmPassword')}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                                ) : (
                                    <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                                )}
                            </Button>
                        </div>
                        {signupForm.formState.errors.confirmPassword && (
                            <p className="text-sm text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        Criar conta
                    </Button>
                </CardFooter>
            </form>
        </TabsContent>
    )
}