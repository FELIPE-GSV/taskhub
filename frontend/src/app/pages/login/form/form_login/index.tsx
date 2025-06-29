import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'Senha deve ter pelo menos 1 caracter'),
});
type LoginFormData = z.infer<typeof loginSchema>;
export function FormLogin() {

    const [showPassword, setShowPassword] = useState(false);
    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onLoginSubmit = (data: LoginFormData) => {
        console.log('Login:', data);
        // Aqui você implementaria a lógica de login
    };

    return (
        <TabsContent value="login">
            <CardHeader className="space-y-1 mb-3 mt-2">
                <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Bem-vindo de volta</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                    Digite suas credenciais para acessar sua conta
                </CardDescription>
            </CardHeader>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <CardContent className="space-y-4 mb-6">
                    <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-slate-700 dark:text-slate-200 font-medium">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <Input
                                id="login-email"
                                type="email"
                                placeholder="seu@email.com"
                                className="pl-10 border-2 focus:border-blue-500 transition-colors text-slate-800 dark:text-slate-100"
                                {...loginForm.register('email')}
                            />
                        </div>
                        {loginForm.formState.errors.email && (
                            <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-slate-700 dark:text-slate-200 font-medium">Senha</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <Input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10 border-2 focus:border-blue-500 transition-colors text-slate-800 dark:text-slate-100"
                                {...loginForm.register('password')}
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
                        {loginForm.formState.errors.password && (
                            <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        Entrar
                    </Button>
                    <Button
                        variant="link"
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline-offset-4"
                    >
                        Esqueceu sua senha?
                    </Button>
                </CardFooter>
            </form>
        </TabsContent>
    )
}