import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { GroupMember } from "@/services/groups/tasks/useListGroups"

type CardListMemberBindTaskProps = {
    member: GroupMember
    selectedMembers: number[]
    handleMemberToggle: (memberId: number) => void
}

export function CardListMemberBindTask({ member, selectedMembers, handleMemberToggle }: CardListMemberBindTaskProps) {
    return (
        <div className="flex items-center space-x-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
            <Checkbox
                id={`member-${member.id}`}
                checked={selectedMembers.includes(member.id_user)}
                onCheckedChange={() => handleMemberToggle(member.id_user)}
                className="border-2"
            />
            <Avatar className="h-8 w-8">
                <AvatarImage src={member?.avatar as string} alt={member?.id.toString()} />
                <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xs">
                    {member.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <span className="font-medium text-slate-800 dark:text-slate-100">
                        {member.name}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {member.email}
                    </span>
                </div>
            </div>
        </div>
    )
}