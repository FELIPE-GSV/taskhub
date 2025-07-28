import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Group } from "@/services/groups/tasks/useListGroups";
import { useRemoveMemberGroup } from "@/services/groups/users/useRemoveMemberGroup";
import { Trash2 } from "lucide-react";

type ConfirmDialogExcludeMemberProps = {
    group: Group
    id_user: number
}

export function ConfirmDialogExcludeMember({group, id_user}: ConfirmDialogExcludeMemberProps) {

    const {mutateAsync: removeMember} = useRemoveMemberGroup()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    className="text-red-600 dark:text-red-400"
                    onSelect={(e) => e.preventDefault()}
                >
                    <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                    Remover membro
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center text-slate-800 dark:text-slate-100">
                        <Trash2 className="w-5 h-5 mr-2 text-red-600" />
                        Remover Membro
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja remover este membro?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => removeMember({id_group: group.id, id_user: id_user})}
                        className="bg-white text-red-600 dark:text-red-400 border-1"
                    >
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}