"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardsDashboard } from "./cards_dashboard/card_dashboards";
import { Activity, AlertCircle, CheckCircle2, Clock, Search, Tag, Target, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/userContext";
import { CardListTask } from "../../../components/card_list_task/card_list_task";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const { dashboardUser } = useUser()
    const router = useRouter()

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center px-16 py-4">
            <div className="w-[85%] lg:w-full h-full flex flex-col justify-start">
                <CardsDashboard />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center">
                                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                                Atividade Recente
                            </CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-300">
                                Suas últimas 4 tarefas
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                {dashboardUser?.last_tasks.map((task, index) => (
                                    <CardListTask
                                        key={index}
                                        task={task}
                                        isDashboard
                                    />
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <Button
                                    variant="outline"
                                    onClick={() => router.push('/pages/tasks')}
                                    className="text-blue-600 cursor-pointer border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/20"
                                >
                                    Ver todas as tarefas
                                </Button>
                            </div>
                        </CardContent>
                        {/* <CardFooter>Card Footer</CardFooter> */}
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center">
                                <Target className="w-5 h-5 mr-2 text-blue-600" />
                                Metas da Semana
                            </CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-300">
                                Progresso dos objetivos
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-300">Tarefas Concluídas</span>
                                    <span className="font-medium text-slate-800 dark:text-slate-100">
                                        {/* {tasks.filter(t => t.status === 'completed').length}/{tasks.length} */}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                        style={{
                                            // width: `${(tasks.filter(t => t.status === 'completed').length / tasks.length) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-300">Produtividade</span>
                                    <span className="font-medium text-slate-800 dark:text-slate-100">85%</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: '85%' }}></div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">Meta semanal</span>
                                    <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp className="w-4 h-4 mr-1" />
                                        <span className="text-sm font-medium">+12%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                <Button
                                    variant="outline"
                                    onClick={() => router.push('/pages/goals')}
                                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/20 cursor-pointer"
                                >
                                    Ver todas as metas
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </main>
    );
}