"use client"
import { useUser } from "@/contexts/userContext"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ProfileFormData, profileSchema } from "./page"
import { zodResolver } from "@hookform/resolvers/zod"
import { ToastService, TypeToast } from "@/components/toast_service/toast_service"

export const useProfile = () => {

    const [isEditing, setIsEditing] = useState(false)
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const { user } = useUser()

    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            email: user?.email,
            phone: user?.phone || '',
            bio: user?.bio || '',
        },
    });

    const handleCancelEdit = () => {
        profileForm.reset({
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            email: user?.email,
            phone: user?.phone || '',
            bio: user?.bio || '',
        });
        setIsEditing(false);
        setAvatarFile(null);
        setAvatarPreview(null);
    }

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        ToastService(TypeToast.WARNING, 'O arquivo deve ter no máximo 5MB!')
        return
      }

      if (!file.type.startsWith('image/')) {
        ToastService(TypeToast.WARNING, 'O arquivo deve ser uma imagem!')
        return
      }

      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      };
      reader.readAsDataURL(file)
    }
  }

    return {
        isEditing,
        setIsEditing,
        profileForm,
        handleCancelEdit,
        avatarFile,
        setAvatarFile,
        avatarPreview,
        setAvatarPreview,
        handleAvatarChange
    }
}