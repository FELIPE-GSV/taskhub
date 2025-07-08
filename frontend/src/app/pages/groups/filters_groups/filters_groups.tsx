"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function FiltersGroups() {
    return (
        <Card className="w-full col-span-3">
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                placeholder="Buscar por nome ou descrição..."
                                // value={searchTerm}
                                // onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <Select >
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filtrar por privacidade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as privacidades</SelectItem>
                            <SelectItem value="private">Privado</SelectItem>
                            <SelectItem value="public">Público</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filtrar por função" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as funções</SelectItem>
                            <SelectItem value="creator">Criador</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Membro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}