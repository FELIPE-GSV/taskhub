import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useUser } from "@/contexts/userContext"
import { GroupMember } from "@/services/groups/tasks/useListGroups"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Badge, CheckCircle2, Crown, Shield, Target, User } from "lucide-react"

type CardListMemberGroupProps = {
    member: GroupMember,
    isCreator: boolean
}

export function CardListMemberGroup({ member, isCreator }: CardListMemberGroupProps) {

    const { user } = useUser()
    const isCurrentUser = member.id_user === user?.id

    return (
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
            <div className="flex items-center justify-between w-ful">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar as string} alt={member.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                            {member.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start justify-between">
                        <div className="flex items-center space-x-2 w-full bg-red-500">
                            <h4 className="font-medium text-slate-800 dark:text-slate-100">
                                {member.name} {isCurrentUser && '(Você)'}
                            </h4>
                            {isCreator ? (
                                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Criador
                                </Badge>
                            ) : (
                                <Badge className={member.role === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' : 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300'}>
                                    {member.role === 1 ? (
                                        <>
                                            <Shield className="w-3 h-3 mr-1" />
                                            Admin
                                        </>
                                    ) : (
                                        <>
                                            <User className="w-3 h-3 mr-1" />
                                            Membro
                                        </>
                                    )}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}