import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAccpetInviteGroup } from "@/services/groups/useAcceptInviteGroup"
import { useDeclineInviteGroup } from "@/services/groups/useDeclineInviteGroup"
import { Notification } from "@/services/notifications/useListNotification"
import { Check, X } from "lucide-react"

type ModalAcceptInviteGroup = {
    open: boolean,
    handleOpenChange: (newOpen: boolean) => void
    notification: Notification
}
export function ModalAcceptInviteGroup({ open, handleOpenChange, notification }: ModalAcceptInviteGroup) {

    const {mutate: acceptInvite, isPending: isProcessingAccept} = useAccpetInviteGroup({ setIsOpen: handleOpenChange })
    const {mutate: declineInvite, isPending: isProcessingDecline} = useDeclineInviteGroup({ setIsOpen: handleOpenChange })

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        Convite para Grupo
                    </DialogTitle>
                    <DialogDescription className="text-slate-600 dark:text-slate-300">
                        Você recebeu um convite
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    {/* Quem convidou */}
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={notification.sender.profile_photo as string} alt={notification.sender.id.toString()} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                {notification?.sender_name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-slate-800 dark:text-slate-100">
                                {notification?.sender_name}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                convidou você para um grupo
                            </p>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            {notification.message_invite}
                        </p>
                    </div>
                </div>
                <DialogFooter className="flex gap-2 pt-4">
                    <Button
                        variant="outline"
                        onClick={()=> declineInvite({
                            id_notification: notification.id
                        })}
                        disabled={isProcessingDecline}
                        className="flex-1"
                    >
                        {isProcessingDecline ? (
                            <>
                                <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-2" />
                                Recusando...
                            </>
                        ) : (
                            <>
                                <X className="w-4 h-4 mr-2" />
                                Recusar
                            </>
                        )}
                    </Button>
                    <Button
                        onClick={()=> acceptInvite({
                            id_group: notification.group?.id as number,
                            id_notification: notification.id
                        })}
                        disabled={isProcessingAccept}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white "
                    >
                        {isProcessingAccept ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Aceitando...
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                Aceitar
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}