import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Group } from "@/services/groups/tasks/useListGroups";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Mail, Send, UserPlus } from "lucide-react";
import { useFormInviteMembers } from "./useFormInviteMembers";
import { CardListMember } from "@/components/cards/card_list_member/card_list_member";
import { Textarea } from "@/components/ui/textarea";

type FormInviteMembersProps = {
    group: Group
    isGroup?: boolean
}

export function FormInviteMembers({ group, isGroup }: FormInviteMembersProps) {

    const {
        handleInviteByEmail,
        inviteEmail,
        members,
        setInviteEmail,
        handleRemoveMember,
        form,
        onSubmit,
        handleOpenChange,
        open, isPending
    } = useFormInviteMembers({ id_group: group.id })

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {isGroup ?
                    <Button size="sm" variant="outline">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Convidar Membro
                    </Button>
                    :
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                    >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Convidar Membros
                    </DropdownMenuItem>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-slate-800 dark:text-slate-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <span>Convidar Membros</span>
                                <p className="text-sm font-normal text-slate-600 dark:text-slate-300 mt-1">
                                    {group.name}
                                </p>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-slate-600 dark:text-slate-300">
                        Convide novos membros para colaborar no grupo. Os convites serão enviados por email.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <Label className="text-slate-700 dark:text-slate-200 font-medium">
                            Convidar por Email
                        </Label>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Input
                                    placeholder="Digite o email do usuário..."
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleInviteByEmail())}
                                    className="border-2 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <Button
                                type="button"
                                onClick={handleInviteByEmail}
                                variant="outline"
                                className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
                            >
                                <Mail className="w-4 h-4 mr-2" />
                                Adicionar
                            </Button>
                        </div>
                    </div>
                    {members.length > 0 && (
                        <div className="space-y-3">
                            <Label className="text-slate-700 dark:text-slate-200 font-medium">
                                Convites Pendentes ({members.length})
                            </Label>
                            <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                                {members.map((member, index) => {
                                    return (
                                        <CardListMember
                                            key={index}
                                            member={member}
                                            handleRemoveMember={handleRemoveMember}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-slate-700 dark:text-slate-200 font-medium">
                            Mensagem Personalizada (Opcional)
                        </Label>
                        <Textarea
                            id="message"
                            placeholder="Descreva um convite para os membros..."
                            className="border-2 focus:border-blue-500 transition-colors min-h-[80px] resize-none"
                            {...form.register('message')}
                        />
                        {form.formState.errors.message && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                                {form.formState.errors.message.message}
                            </p>
                        )}
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
                            disabled={isPending || members.length === 0}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isPending ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Enviar {members.length} Convite(s)
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}