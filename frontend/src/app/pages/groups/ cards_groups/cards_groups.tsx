"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Shield, Users } from "lucide-react";

export function CardGroups() {
    return (
        <>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Total de Grupos
                    </CardTitle>
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{5}</div>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            Participando ativamente
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                        Como Admin
                    </CardTitle>
                    <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{2}</div>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300">
                            Gerenciando grupos
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">
                        Criados por Mim
                    </CardTitle>
                    <Crown className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{3}</div>
                        <p className="text-xs text-purple-700 dark:text-purple-300">
                            Grupos fundados
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}