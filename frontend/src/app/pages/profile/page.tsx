"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Edit3, Mail, Phone, Save, Upload, User, X } from "lucide-react";
import { useProfile } from "./useProfile";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/contexts/userContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUser } from "@/services/user/useUpdateUser";


export const profileSchema = z.object({
    first_name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(50, 'Nome deve ter no máximo 50 caracteres'),
    last_name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(50, 'Nome deve ter no máximo 50 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().optional(),
    bio: z.string().max(200, 'Bio deve ter no máximo 200 caracteres').optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
export default function Profile() {

    const { user } = useUser()
    const {
        isEditing,
        setIsEditing,
        profileForm,
        avatarFile,
        avatarPreview,
        handleCancelEdit,
        handleAvatarChange,
        setAvatarPreview
    } = useProfile()
    const { mutate: updateUser, isPending } = useUpdateUser({reset: handleCancelEdit})

    const onProfileSubmit = async (data: ProfileFormData) => {
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('phone', data.phone || '');
        formData.append('bio', data.bio || '');
        if (avatarFile) {
            formData.append('profile_picture', avatarFile);
        }
        updateUser(formData)
    }

    return (
        <main className="w-full h-screen px-[15%] lg:w-full flex flex-col justify-start py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
                        <User className="w-7 h-7 mr-3 text-blue-600" />
                        Meu Perfil
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                        Gerencie suas informações pessoais e preferências
                    </p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-slate-800 dark:text-slate-100">
                                Informações Pessoais
                            </CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-300">
                                Atualize suas informações de perfil
                            </CardDescription>
                        </div>
                        {!isEditing ? (
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(true)}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/20 cursor-pointer"
                            >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Editar
                            </Button>
                        ) : (
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={handleCancelEdit}
                                    className="text-slate-600 border-slate-200 hover:bg-slate-50 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={profileForm.handleSubmit(onProfileSubmit)}
                                    disabled={isPending}
                                    className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                >
                                    {isPending ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Salvar
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-lg">
                                <AvatarImage
                                    src={avatarPreview || user?.profile_picture as any}
                                    alt={user?.first_name}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-2xl">
                                    {user?.first_name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {isEditing && (
                                <label className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                                    <Camera className="w-4 h-4" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                                {user?.first_name + ' ' + user?.last_name}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">{user?.email}</p>
                            {avatarFile && (
                                <Alert className="mt-3 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                                    <Upload className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <AlertDescription className="text-blue-700 dark:text-blue-300">
                                        Nova foto selecionada: {avatarFile.name}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </div>
                    <Separator />
                    <form
                        // onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                    <User className="w-4 h-4 mr-2 text-slate-500" />
                                    Primeiro nome
                                </Label>
                                <Input
                                    id="first_name"
                                    disabled={!isEditing}
                                    className={cn(
                                        "border-2 transition-colors",
                                        isEditing ? "focus:border-blue-500" : "bg-slate-50 dark:bg-slate-800/50"
                                    )}
                                    {...profileForm.register('first_name')}
                                />
                                {profileForm.formState.errors.first_name && (
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {profileForm.formState.errors.first_name.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last_name" className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                    <User className="w-4 h-4 mr-2 text-slate-500" />
                                    Último nome
                                </Label>
                                <Input
                                    id="last_name"
                                    disabled={!isEditing}
                                    className={cn(
                                        "border-2 transition-colors",
                                        isEditing ? "focus:border-blue-500" : "bg-slate-50 dark:bg-slate-800/50"
                                    )}
                                    {...profileForm.register('last_name')}
                                />
                                {profileForm.formState.errors.last_name && (
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {profileForm.formState.errors.last_name.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-slate-500" />
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    disabled={!isEditing}
                                    className={cn(
                                        "border-2 transition-colors",
                                        isEditing ? "focus:border-blue-500" : "bg-slate-50 dark:bg-slate-800/50"
                                    )}
                                    {...profileForm.register('email')}
                                />
                                {profileForm.formState.errors.email && (
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {profileForm.formState.errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-slate-700 dark:text-slate-200 font-medium flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-slate-500" />
                                    Telefone
                                </Label>
                                <Input
                                    id="phone"
                                    placeholder="(11) 99999-9999"
                                    disabled={!isEditing}
                                    className={cn(
                                        "border-2 transition-colors",
                                        isEditing ? "focus:border-blue-500" : "bg-slate-50 dark:bg-slate-800/50"
                                    )}
                                    {...profileForm.register('phone')}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio" className="text-slate-700 dark:text-slate-200 font-medium">
                                Biografia
                            </Label>
                            <Textarea
                                id="bio"
                                placeholder="Conte um pouco sobre você..."
                                disabled={!isEditing}
                                className={cn(
                                    "border-2 transition-colors min-h-[100px] resize-none",
                                    isEditing ? "focus:border-blue-500" : "bg-slate-50 dark:bg-slate-800/50"
                                )}
                                {...profileForm.register('bio')}
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {profileForm.watch('bio')?.length || 0}/200 caracteres
                            </p>
                            {profileForm.formState.errors.bio && (
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    {profileForm.formState.errors.bio.message}
                                </p>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}