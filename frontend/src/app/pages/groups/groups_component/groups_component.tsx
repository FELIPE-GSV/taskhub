import { CardListGroup } from "@/components/cards/card_list_group/card_list_group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Group } from "@/services/groups/useListGroups";
import { Users } from "lucide-react";

type GroupsComponentProps = {
    groups: Group[] | undefined | null
}
export function GroupsComponent({ groups }: GroupsComponentProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-slate-800 dark:text-slate-100">
                            Lista de Grupos
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {groups?.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
                            Nenhum grupo encontrado
                        </h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {groups?.map((group) => (
                            <CardListGroup
                                key={group.id}
                                group={group}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}