"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/contexts/userContext"
import { Search } from "lucide-react"

export function FiltersTasks() {

    const {
        filterPriorityTask,
        filterStatusTask,
        filterTitleTask,
        setFilterPriorityTask,
        setFilterStatusTask,
        setFilterTitleTask
    } = useUser()

    return (
        <Card>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                placeholder="Buscar por título"
                                value={filterTitleTask}
                                onChange={(e) => setFilterTitleTask(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <Select value={filterStatusTask} onValueChange={setFilterStatusTask}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filtrar por status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Todos os status</SelectItem>
                            <SelectItem value="1">Pendente</SelectItem>
                            <SelectItem value="2">Em Andamento</SelectItem>
                            <SelectItem value="3">Concluída</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterPriorityTask} onValueChange={setFilterPriorityTask}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filtrar por prioridade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Todas as prioridades</SelectItem>
                            <SelectItem value="1">Baixa</SelectItem>
                            <SelectItem value="2">Média</SelectItem>
                            <SelectItem value="3">Alta</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}