"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { FormLogin } from './form_login';
import { FormRegister } from './form_register';


export function Form() {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-4 shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    TaskHub
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mt-2 font-medium">
                    Organize suas tarefas de forma inteligente
                </p>
            </div>

            <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
                <Tabs value={isLogin ? "login" : "signup"} onValueChange={(value) => setIsLogin(value === "login")}>
                    <TabsList className="grid w-full grid-cols-2 bg-blue-50 dark:bg-blue-950/30">
                        <TabsTrigger
                            value="login"
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium transition-all duration-200"
                        >
                            Entrar
                        </TabsTrigger>
                        <TabsTrigger
                            value="signup"
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium transition-all duration-200"
                        >
                            Cadastrar
                        </TabsTrigger>
                    </TabsList>
                    <FormLogin />
                    <FormRegister />
                </Tabs>
            </Card>
        </div>
    )
}