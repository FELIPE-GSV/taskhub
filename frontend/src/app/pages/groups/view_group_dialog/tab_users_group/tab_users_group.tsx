import { TabsContent } from "@radix-ui/react-tabs"
import { TabGroupProps } from "../tab_tasks_group/tab_tasks_group"
import { FormInviteMembers } from "../../form_invite_members/form_invite_members"
import { CardListMemberGroup } from "@/components/cards/card_list_member_group/card_list_member_group"

export function TabUsersGroup({ group, isCreator, userRole }: TabGroupProps) {
    return (
        <TabsContent value="members" className="space-y-4 m-0">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Tarefas do Grupo</h3>
                {userRole === 1 && isCreator && (
                    <FormInviteMembers group={group} isGroup />
                )}
            </div>
            <div className="space-y-3">
                {group.members.map((member, index) => (
                    <CardListMemberGroup key={index} member={member} isCreator={isCreator} />
                ))}
            </div>
        </TabsContent>
    )
}