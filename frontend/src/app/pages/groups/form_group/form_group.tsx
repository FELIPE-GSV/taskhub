"use client";
import { Button } from "@/components/ui/button";
import { useFormGroup } from "./useFormGroup";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Shield, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardListMember } from "@/components/card_list_member/card_list_member";

export function FormGroup() {

    const {
        open,
        handleOpenChange,
        form,
        onSubmit,
        inviteEmail, setInviteEmail,
        members, handleInviteByEmail,
        handleRemoveMember, isPending
    } = useFormGroup()


    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Novo Grupo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-slate-800 dark:text-slate-100">
                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                        Criar Novo Grupo
                    </DialogTitle>
                    <DialogDescription className="text-slate-600 dark:text-slate-300">
                        Crie um grupo para colaborar em tarefas com sua equipe. Os convites serão enviados após a criação.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                Informações do Grupo
                            </h3>
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-slate-700 dark:text-slate-200 font-medium">
                                    Nome do Grupo
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Ex: Equipe de Desenvolvimento"
                                    className="border-2 focus:border-blue-500 transition-colors"
                                    {...form.register('name')}
                                />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {form.formState.errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-slate-700 dark:text-slate-200 font-medium">
                                    Descrição
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Descreva o propósito do grupo..."
                                    className="border-2 focus:border-blue-500 transition-colors min-h-[80px] resize-none"
                                    {...form.register('description')}
                                />
                                {form.formState.errors.description && (
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {form.formState.errors.description.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-200 font-medium">
                                    Privacidade
                                </Label>
                                <Select
                                    value={form.watch('privacy')}
                                    onValueChange={(value) => form.setValue('privacy', value as "1" | "2")}
                                >
                                    <SelectTrigger className="border-2 w-full focus:border-blue-500 transition-colors">
                                        <SelectValue placeholder="Selecione a privacidade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">
                                            <div className="flex items-center">
                                                <Users className="w-4 h-4 mr-2 text-slate-600" />
                                                <div>
                                                    <p className="font-medium">Público</p>
                                                    <p className="text-xs text-slate-500">Qualquer um pode solicitar entrada</p>
                                                </div>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="2">
                                            <div className="flex items-center">
                                                <Shield className="w-4 h-4 mr-2 text-slate-600" />
                                                <div>
                                                    <p className="font-medium">Privado</p>
                                                    <p className="text-xs text-slate-500">Apenas membros convidados</p>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.privacy && (
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {form.formState.errors.privacy.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                    Adicionar Membros
                                </h3>
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
                            </div>
                            <div className="space-y-3">
                                <Label className="text-slate-700 dark:text-slate-200 font-medium">
                                    Membros do Grupo ({members?.length})
                                </Label>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {members?.map((member, index) => {
                                        return (
                                            <CardListMember
                                                key={index}
                                                member={member}
                                                handleRemoveMember={handleRemoveMember}
                                            />
                                        )
                                    })}
                                </div>
                                {members && members?.length > 1 && (
                                    <div className="flex flex-col gap-2">
                                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                                <Mail className="w-4 h-4 inline mr-1" />
                                                Os convites serão enviados automaticamente após a criação do grupo.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
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
                                    </div>
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
                                    <Users className="w-4 h-4 mr-2" />
                                    Criar Grupo
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}