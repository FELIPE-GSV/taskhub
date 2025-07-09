import { ToastService, TypeToast } from "@/components/toast_service/toast_service";
import { User, useUser } from "@/contexts/userContext";
import { useCreateGroup } from "@/services/groups/useCreateGroup";
import { useGetUserByEmail } from "@/services/user/useGetUserByEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";

const groupSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome deve ter no máximo 50 caracteres'),
    description: z.string().min(1, 'Descrição é obrigatória').max(200, 'Descrição deve ter no máximo 200 caracteres'),
    privacy: z.enum(['1', '2'], {
        required_error: 'Privacidade é obrigatória',
    }),
    message: z.string().min(1, 'Mensagem é obrigatória').max(200, 'Mensagem deve ter no.maxcdn 200 caracteres'),
})
type GroupFormData = z.infer<typeof groupSchema>;

export const useFormGroup = () => {
    const { user } = useUser()
    const [members, setMembers] = useState<User[]>([])
    const [open, setOpen] = useState(false)
    const [idsUsers, setIdsUsers] = useState<number[]>([])
    const { mutateAsync: fetchUserByEmail } = useGetUserByEmail()
    const {mutate: createGroup, isPending} = useCreateGroup({setIsOpen: setOpen})
    const form = useForm<GroupFormData>({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            name: '',
            description: '',
            privacy: '1',
        },
    });
    const [inviteEmail, setInviteEmail] = useState('')

    const handleInviteByEmail = () => {
        if (members.some(member => member.email === inviteEmail)) {
            ToastService(TypeToast.WARNING, 'Este usuário já foi convidado.')
            return;
        }
        fetchUserByEmail({ email: inviteEmail }).then((user) => {
            setMembers([...members, user as User])
            setIdsUsers([...idsUsers, user?.id as number])
            setInviteEmail('')
        })
    }

    const handleRemoveMember = (id?: number) => {
        if (!id) return;
        if (id === user?.id) {
            ToastService(TypeToast.WARNING, 'Você não pode se remover do grupo.');
            return;
        }
        setMembers(prev => prev.filter(member => member.id !== id));
        setIdsUsers(prev => prev.filter(userId => userId !== id));
    }

    useEffect(() => {
        if (user) {
            setMembers([user])
            setIdsUsers([user.id])
        }
    }, [user, setMembers, setIdsUsers])


    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            form.reset();
            setMembers([user as User]);
            setInviteEmail('');
        }
    };

    const onSubmit = (data: GroupFormData) => {
        createGroup({
            privacy: data.privacy === "1" ? 1 : 2 ,
            name: data.name,
            description: data.description,
            user_ids: idsUsers,
            message: data.message
        })
    }

    return {
        open,
        setOpen,
        handleOpenChange,
        form,
        members,
        setMembers,
        inviteEmail,
        setInviteEmail, setIdsUsers,
        idsUsers,
        onSubmit,
        user,
        handleInviteByEmail,
        handleRemoveMember,
        isPending
    }
}