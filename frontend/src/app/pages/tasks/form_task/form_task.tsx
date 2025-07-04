import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, Clock, AlertTriangle, User, FileText, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useCreateTask } from '@/services/task/useCreateTask';

const taskSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório').max(100, 'Título deve ter no máximo 100 caracteres'),
    description: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição deve ter no máximo 500 caracteres'),
    expiration_date: z.date({
        required_error: 'Data de vencimento é obrigatória',
    }),
    status: z.enum(['1', '2', '3'], {
        required_error: 'Status é obrigatório',
    }),
    priority: z.enum(['1', '2', '3'], {
        required_error: 'Prioridade é obrigatória',
    }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

const statusOptions = [
    { value: '1', label: 'Pendente', color: 'text-amber-600' },
    { value: '2', label: 'Em Andamento', color: 'text-blue-600' },
    { value: '3', label: 'Concluída', color: 'text-emerald-600' },
];

const priorityOptions = [
    { value: '1', label: 'Baixa', color: 'text-green-600' },
    { value: '2', label: 'Média', color: 'text-yellow-600' },
    { value: '3', label: 'Alta', color: 'text-red-600' },
];

export function FormTask() {
    const [open, setOpen] = useState(false);
    const { mutate: createTask, isPending } = useCreateTask({closeModalCreateTask: setOpen})

    const form = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            status: '1',
            priority: '2',
        },
    });

    const onSubmit = async (data: TaskFormData) => {
        createTask(data);
        form.reset()
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            form.reset();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Tag className="w-4 h-4 mr-2" />
                    Nova Tarefa
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-slate-800 dark:text-slate-100">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        Criar Nova Tarefa
                    </DialogTitle>
                    <DialogDescription className="text-slate-600 dark:text-slate-300">
                        Preencha os detalhes da nova tarefa. Todos os campos são obrigatórios.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                <FileText className="w-4 h-4 mr-2 text-slate-500" />
                                Título da Tarefa
                            </Label>
                            <Input
                                id="title"
                                placeholder="Ex: Revisar documentação do projeto"
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
                                placeholder="Descreva os detalhes da tarefa..."
                                className="border-2 focus:border-blue-500 transition-colors min-h-[100px] resize-none"
                                {...form.register('description')}
                            />
                            {form.formState.errors.description && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {form.formState.errors.description.message}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-slate-500" />
                                    Status
                                </Label>
                                <Select
                                    value={form.watch('status')}
                                    onValueChange={(value) => form.setValue('status', value as '1' | '2' | '3')}
                                >
                                    <SelectTrigger className="border-2 focus:border-blue-500 transition-colors w-full">
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
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-2 text-slate-500" />
                                    Prioridade
                                </Label>
                                <Select
                                    value={form.watch('priority')}
                                    onValueChange={(value) => form.setValue('priority', value as '1' | '2' | '3')}
                                >
                                    <SelectTrigger className="border-2 focus:border-blue-500 transition-colors w-full">
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
                        </div>
                    </div>

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
                            disabled={isPending}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isPending ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Criando...
                                </>
                            ) : (
                                <>
                                    <Tag className="w-4 h-4 mr-2" />
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