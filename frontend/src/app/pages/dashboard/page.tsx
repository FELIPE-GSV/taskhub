"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardsDashboard } from "./cards_dashboard/card_dashboards";
import { AlertCircle, CheckCircle2, Clock, Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/userContext";
import { CardListTask } from "./cards_dashboard/card_list_task";

export default function Dashboard() {

    const { dashboardUser } = useUser()

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
                        <div className="flex flex-col gap-4">
                            {dashboardUser?.last_tasks.map((task, index) => (
                                <CardListTask
                                    key={index}
                                    task={task}
                                />
                            ))}
                        </div>
                    </CardContent>
                    {/* <CardFooter>Card Footer</CardFooter> */}
                </Card>
            </div>
        </main>
    );
}