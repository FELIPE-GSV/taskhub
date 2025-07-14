import { User, useUser } from "@/contexts/userContext"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Badge } from "../../ui/badge"
import { Crown, X } from "lucide-react"
import { Button } from "../../ui/button"

type CardListMemberProps = {
    member: User | null
    handleRemoveMember: (id?: number) => void
}

export function CardListMember({ member, handleRemoveMember }: CardListMemberProps) {

    const { user } = useUser()

    return (
        <div
            key={member?.id}
            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border"
        >
            <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={member?.profile_picture as string} alt={member?.id.toString()} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        {member?.first_name.charAt(0).toUpperCase()}
                        {member?.last_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100">
                        {member?.first_name + ` ` + member?.last_name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {member?.email}
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                {member && member.id === user?.id && (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                        <Crown className="w-3 h-3 mr-1" />
                        Criador
                    </Badge>
                )}
                {member && member.id !== user?.id && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member?.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </div>
    )
}