"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardsDashboard } from "./cards_dashboard/card_dashboards";
import { AlertCircle, CheckCircle2, Clock, MoreHorizontal, Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
            case 'pending':
                return 'bg-red-100 text-red-700 dark:bg-amber-900/20 dark:text-amber-300';
            default:
                return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-xl text-red-800 dark:bg-red-900/20 dark:text-red-300';
            case 'medium':
                return 'bg-yellow-100 text-xl text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
            case 'low':
                return 'bg-green-100 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-300';
            default:
                return 'bg-slate-100 text-xl text-slate-800 dark:bg-slate-900/20 dark:text-slate-300';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="w-6 h-6" />;
            case 'in-progress':
                return <Clock className="w-6 h-6" />;
            case 'pending':
                return <AlertCircle className="w-6 h-6" />;
            default:
                return <Clock className="w-6 h-6" />;
        }
    };

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center px-16 py-4">
            <div className="w-[85%] lg:w-full h-full flex flex-col justify-start">
                <CardsDashboard />
                <Card>
                    <CardHeader>
                        <div className="w-full h-full flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">Tarefas Recentes</CardTitle>
                                <CardDescription className="text-slate-600 dark:text-slate-300">
                                    Suas últimas tarefas e atualizações
                                </CardDescription>
                            </div>
                            <div className="flex gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <Input
                                        placeholder="Buscar tarefas..."
                                        className="pl-10 w-64 lg:w-80 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                                    />
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Tag className="w-4 h-4 mr-2" />
                                    Nova Tarefa
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className={cn(
                                    "p-2 rounded-lg",
                                    getStatusColor("completed")
                                )}>
                                    {getStatusIcon("completed")}
                                </div>
                                <div className="flex-1">
                                    <h4 className=" text-xl font-medium text-slate-800 dark:text-slate-100">Fazer o L</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Tem que terminar o projeto mano pprt.</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <Badge variant={"outline"} className="text-sm">
                                            Felipe
                                        </Badge>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            Vence em {new Date().toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Badge variant={"outline"} className={getPriorityColor("low")}>
                                    Alta
                                </Badge>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    {/* <CardFooter>Card Footer</CardFooter> */}
                </Card>
            </div>
        </main>
    );
}