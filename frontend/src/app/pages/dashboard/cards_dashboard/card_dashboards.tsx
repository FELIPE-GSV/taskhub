import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/userContext";
import { AlertCircle, CheckCircle2, CheckSquare, Clock } from "lucide-react";

export function CardsDashboard() {

    const { dashboardUser } = useUser()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Total de Tarefas
                    </CardTitle>
                    <CheckSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{dashboardUser?.total_tasks?.tasks}</div>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            {dashboardUser?.total_tasks?.message}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                        Concluídas
                    </CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                            {dashboardUser?.tasks_done?.tasks}
                        </div>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300">
                            {dashboardUser?.tasks_done?.message}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        Em Andamento
                    </CardTitle>
                    <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                            {dashboardUser?.tasks_in_progress?.tasks}
                        </div>
                        <p className="text-xs text-amber-700 dark:text-amber-300">
                            {dashboardUser?.tasks_in_progress?.message}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-red-800 dark:text-red-200">
                        Pendentes
                    </CardTitle>
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="text-2xl font-bold text-red-900 dark:text-red-100">
                            {dashboardUser?.tasks_pending?.tasks}
                        </div>
                        <p className="text-xs text-red-700 dark:text-red-300">
                            {dashboardUser?.tasks_pending?.message}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}