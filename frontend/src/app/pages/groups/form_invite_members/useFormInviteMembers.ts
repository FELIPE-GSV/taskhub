import { ToastService, TypeToast } from "@/components/toast_service/toast_service"
import { User, useUser } from "@/contexts/userContext"
import { useInviteMembersGroup } from "@/services/groups/useInviteMembersGroup";
import { useGetUserByEmail } from "@/services/user/useGetUserByEmail"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";

const inviteSchema = z.object({
    message: z.string().optional(),
});
type InviteFormData = z.infer<typeof inviteSchema>;

export const useFormInviteMembers = ({id_group}: { id_group: number }) => {

    const form = useForm<InviteFormData>({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            message: '',
        },
    });

    const { user } = useUser()
    const [members, setMembers] = useState<User[]>([])
    const [inviteEmail, setInviteEmail] = useState('')
    const { mutateAsync: fetchUserByEmail, isPending } = useGetUserByEmail()
    const [idsUsers, setIdsUsers] = useState<number[]>([])
    const [open, setOpen] = useState(false)
    
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            form.reset();
        }
    };
    const {mutateAsync: inviteMembers} = useInviteMembersGroup({setIsOpen: setOpen})
    
    const handleInviteByEmail = () => {
        if (members.some(member => member.email === inviteEmail)) {
            ToastService(TypeToast.WARNING, 'Este usuário já foi convidado.')
            return
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

    const onSubmit = (data: InviteFormData) => {
        inviteMembers({
            message: data.message,
            users: idsUsers,
            id_group: id_group
        })
    }

    return {
        members,
        inviteEmail,
        setInviteEmail,
        handleInviteByEmail,
        handleRemoveMember,
        form,
        onSubmit,
        handleOpenChange,
        open,
        isPending
    }
}