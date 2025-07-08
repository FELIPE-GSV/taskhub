import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Group } from "@/services/groups/useListGroups";

type GroupsComponentProps = {
    groups: Group[] | undefined | null
}
export function GroupsComponent({ groups }: GroupsComponentProps) {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-slate-800 dark:text-slate-100">
                            Lista de Grupos
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-300">
                            {2} de {2} grupos
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}