"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardsDashboard } from "./cards_dashboard/card_dashboards";
import { Activity, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/userContext";
import { CardListTask } from "../../../components/card_list_task/card_list_task";
import { useRouter } from "next/navigation";
import { useListDashboard } from "@/services/user/useListDashboard";
import { useEffect } from "react";

export default function Dashboard() {

    const router = useRouter()
    const { data: dashboardUser } = useListDashboard()
    const { setDashboardUser } = useUser()
    const progress =
        dashboardUser && dashboardUser.total_tasks > 0
            ? (dashboardUser.tasks_done / dashboardUser.total_tasks) * 100
            : 0;

    useEffect(() => {
        setDashboardUser(dashboardUser)
    }, [setDashboardUser, dashboardUser])

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center py-4">
            <div className="w-full px-[15%] lg:w-full h-full flex flex-col justify-start">
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
                                        {dashboardUser?.tasks_done}/{dashboardUser?.total_tasks}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${progress}%`
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-300">Produtividade</span>
                                    <span className="font-medium text-slate-800 dark:text-slate-100">{dashboardUser?.weekly_progress}%</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${dashboardUser?.weekly_progress}%` }}></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </main>
    );
}