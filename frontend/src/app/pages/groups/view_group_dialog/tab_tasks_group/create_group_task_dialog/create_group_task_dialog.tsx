import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { useCreateTaskGroupDialog } from "./useCreateTaskGroupDialog"
import { AlertTriangle, CalendarIcon, Clock, FileText, Tag, UserCheck, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Group } from "@/services/groups/tasks/useListGroups"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardListMemberBindTask } from "@/components/cards/card_list_member_bind_task/card_list_member_bind_task"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type CreateGroupTaskDialog = {
    group: Group
}

export function CreateGroupTaskDialog({ group }: CreateGroupTaskDialog) {

    const {
        handleOpenChange,
        open,
        form,
        onSubmit,
        statusOptions,
        priorityOptions,
        handleMemberToggle,
        selectedMembers,
        handleSelectAll,
        handleClearAll,
        getSelectedMembersInfo, isPending
    } = useCreateTaskGroupDialog({ group: group })

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Tag className="w-4 h-4 mr-2" />
                    Nova Tarefa
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-slate-800 dark:text-slate-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <span>Criar Tarefa no Grupo</span>
                                <p className="text-sm font-normal text-slate-600 dark:text-slate-300 mt-1">
                                    {group.name}
                                </p>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-slate-600 dark:text-slate-300">
                        Crie uma nova tarefa e atribua aos membros do grupo. Todos os campos são obrigatórios.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-slate-500" />
                            Título da Tarefa
                        </Label>
                        <Input
                            id="title"
                            placeholder="Ex: Implementar sistema de autenticação"
                            className="border-2 focus:border-blue-500 transition-colors"
                            {...form.register('title')}
                        />
                        {form.formState.errors.title && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                                {form.formState.errors.title.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-slate-500" />
                            Descrição
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Descreva os detalhes da tarefa e o que precisa ser feito..."
                            className="border-2 focus:border-blue-500 transition-colors min-h-[100px] resize-none"
                            {...form.register('description')}
                        />
                        {form.formState.errors.description && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                                {form.formState.errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* <div className="space-y-2">
                            <Label className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-slate-500" />
                                Status
                            </Label>
                            <Select
                                value={form.watch('status')}
                                onValueChange={(value) => form.setValue('status', value as '1' | '2' | '3')}
                            >
                                <SelectTrigger className="w-full border-2 focus:border-blue-500 transition-colors">
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <div className="flex items-center">
                                                <div className={cn("w-2 h-2 rounded-full mr-2", {
                                                    'bg-amber-500': option.value === '1',
                                                    'bg-blue-500': option.value === '2',
                                                    'bg-emerald-500': option.value === '3',
                                                })} />
                                                <span className={option.color}>{option.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.formState.errors.status && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {form.formState.errors.status.message}
                                </p>
                            )}
                        </div> */}
                        <div className="space-y-2">
                            <Label className=" text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-2 text-slate-500" />
                                Prioridade
                            </Label>
                            <Select
                                value={form.watch('priority')}
                                onValueChange={(value) => form.setValue('priority', value as '1' | '2' | '3')}
                            >
                                <SelectTrigger className="w-full border-2 focus:border-blue-500 transition-colors">
                                    <SelectValue placeholder="Selecione a prioridade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {priorityOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <div className="flex items-center">
                                                <AlertTriangle className={cn("w-3 h-3 mr-2", {
                                                    'text-green-500': option.value === '1',
                                                    'text-yellow-500': option.value === '2',
                                                    'text-red-500': option.value === '3',
                                                })} />
                                                <span className={option.color}>{option.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.formState.errors.priority && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {form.formState.errors.priority.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-2 text-slate-500" />
                                Data de Vencimento
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal border-2 hover:border-blue-500 transition-colors",
                                            !form.watch('expiration_date') && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {form.watch('expiration_date') ? (
                                            format(form.watch('expiration_date'), "PPP", { locale: ptBR })
                                        ) : (
                                            <span>Selecione uma data</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={form.watch('expiration_date')}
                                        onSelect={(date) => form.setValue('expiration_date', date!)}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                        locale={ptBR}
                                    />
                                </PopoverContent>
                            </Popover>
                            {form.formState.errors.expiration_date && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {form.formState.errors.expiration_date.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                <UserCheck className="w-4 h-4 mr-2 text-slate-500" />
                                Atribuir a Membros ({selectedMembers.length} selecionados)
                            </Label>
                            <div className="flex space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectAll}
                                    className="text-xs"
                                >
                                    Selecionar Todos
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleClearAll}
                                    className="text-xs"
                                >
                                    Limpar
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                        {group.members.map((member, index) => {
                            return (
                                <CardListMemberBindTask
                                    key={index}
                                    handleMemberToggle={handleMemberToggle}
                                    member={member}
                                    selectedMembers={selectedMembers}
                                />
                            )
                        })}
                    </div>

                    {selectedMembers.length > 0 && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    Membros Selecionados ({selectedMembers.length})
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {getSelectedMembersInfo().map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-2 py-1 rounded-md border"
                                    >
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage src={member.avatar as string} alt={member.name} />
                                            <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xs">
                                                {member.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                                            {member.name}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleMemberToggle(member.id)}
                                            className="h-4 w-4 p-0 text-slate-500 hover:text-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {form.formState.errors.assignedTo && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {form.formState.errors.assignedTo.message}
                        </p>
                    )}

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            className="w-full sm:w-auto"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending || selectedMembers.length === 0}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isPending ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Criando...
                                </>
                            ) : (
                                <>
                                    <Users className="w-4 h-4 mr-2" />
                                    Criar Tarefa
                                </>
                            )}
                        </Button>
                    </DialogFooter>

                </form>


            </DialogContent>
        </Dialog>
    )
}