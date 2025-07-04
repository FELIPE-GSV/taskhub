import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useDeleteTask } from "@/services/task/useDeleteTask"
import { Trash2 } from "lucide-react"

interface ConfirmDialogExcludeTaskProps {
    idTask?: number
}
export function ConfirmDialogExcludeTask({ idTask }: ConfirmDialogExcludeTaskProps) {

    const { mutate: deleteTask } = useDeleteTask()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    className="text-red-600 dark:text-red-400"
                    onSelect={(e) => e.preventDefault()}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center text-slate-800 dark:text-slate-100">
                        <Trash2 className="w-5 h-5 mr-2 text-red-600" />
                        Excluir tarefa
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir essa tarefa?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => deleteTask(idTask)}
                        className="bg-white text-red-600 dark:text-red-400 border-1"
                    >
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}