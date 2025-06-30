import { toast } from "sonner";

import { } from "lucide-react"

export enum TypeToast {
    SUCCESS = 0,
    WARNING = 1,
    ERROR = 2,
    INFO = 3
}

export const ToastService = (type: TypeToast, message: string) => {
    switch (type) {
        case TypeToast.SUCCESS:
            toast.success(message, {
                style: {
                    background: '#f8f8f8',
                    color: "#19cd08",
                    border: '1px solid #19cd08',
                },
            })
            break;
        case TypeToast.WARNING:
            toast.warning(
                message,
                {
                    style: {
                        background: '#f8f8f8',
                        color: "#d6bd31",
                        border: '1px solid #d6bd31',
                    },
                }
            )
            break;
        case TypeToast.ERROR:
            toast.error(
                message,
                {
                    style: {
                        background: '#f8f8f8',
                        color: "#e34444",
                        border: '1px solid #e34444',
                    },
                }
            )
            break;
        case TypeToast.INFO:
            toast.info(message, {
                style: {
                    background: '#f8f8f8',
                    color: "#0c82ff",
                    border: '1px solid #0c82ff',
                }
            })
            break;
    }
}