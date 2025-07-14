"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

type FiltersGroupsProps = {
    name: string
    setName: Dispatch<SetStateAction<string>>

    privacy: string
    setPrivacy: Dispatch<SetStateAction<string>>

    role: string
    setRole: Dispatch<SetStateAction<string>>
}

export function FiltersGroups({
    name,
    setName,
    privacy,
    setPrivacy,
    role,
    setRole
}: FiltersGroupsProps) {
    return (
        <Card className="w-full col-span-3">
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                placeholder="Buscar por nome ou descrição..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <Select value={privacy} onValueChange={setPrivacy}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filtrar por privacidade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as privacidades</SelectItem>
                            <SelectItem value="1">Público</SelectItem>
                            <SelectItem value="2">Privado</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={role} onValueChange={setRole}>
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