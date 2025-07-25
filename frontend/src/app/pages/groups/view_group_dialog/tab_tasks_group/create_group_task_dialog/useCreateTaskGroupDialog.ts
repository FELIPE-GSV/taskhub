import { useCreateTaskGroup } from "@/services/groups/tasks/useCreateTaskGroup";
import { Group } from "@/services/groups/tasks/useListGroups";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";


const groupTaskSchema = z.object({
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
    assignedTo: z.array(z.number()).min(1, 'Pelo menos um membro deve ser atribuído'),
});

export type GroupTaskFormData = z.infer<typeof groupTaskSchema>;

type UseCreateTaskGroupDialog = {
    group: Group
}

export const useCreateTaskGroupDialog = ({ group }: UseCreateTaskGroupDialog) => {

    const [open, setOpen] = useState(false)
    const [selectedMembers, setSelectedMembers] = useState<number[]>([])

    const statusOptions = [
        { value: '1', label: 'Pendente', color: 'text-amber-600' },
        { value: '2', label: 'Em Andamento', color: 'text-blue-600' },
        { value: '3', label: 'Concluída', color: 'text-emerald-600' },
    ];

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
        }
    };

    const { mutateAsync: createTaskGroup , isPending} = useCreateTaskGroup({setIsOpen: handleOpenChange})

    const priorityOptions = [
        { value: '1', label: 'Baixa', color: 'text-green-600' },
        { value: '2', label: 'Média', color: 'text-yellow-600' },
        { value: '3', label: 'Alta', color: 'text-red-600' },
    ];

    const form = useForm<GroupTaskFormData>({
        resolver: zodResolver(groupTaskSchema),
        defaultValues: {
            title: '',
            description: '',
            status: '1',
            priority: '2',
            assignedTo: [],
        },
    });

    const onSubmit = async (data: GroupTaskFormData) => {
        await createTaskGroup({
            group_id: group.id,
            task_data: data
        })
    }

    const handleMemberToggle = (memberId: number) => {
        setSelectedMembers(prev => {
            const newSelection = prev.includes(memberId)
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId];

            form.setValue('assignedTo', newSelection);
            return newSelection;
        });
    };

    const handleSelectAll = () => {
        const allMemberIds = group.members.map(m => m.id_user);
        setSelectedMembers(allMemberIds);
        form.setValue('assignedTo', allMemberIds);
    };

    const handleClearAll = () => {
        setSelectedMembers([]);
        form.setValue('assignedTo', []);
    };

    const getSelectedMembersInfo = () => {
        return group.members.filter(member => selectedMembers.includes(member.id_user));
    };

    return {
        open,
        setOpen,
        handleOpenChange,
        form,
        onSubmit,
        statusOptions,
        priorityOptions,
        handleMemberToggle,
        selectedMembers,
        handleSelectAll,
        handleClearAll,
        getSelectedMembersInfo,
        isPending
    }
}