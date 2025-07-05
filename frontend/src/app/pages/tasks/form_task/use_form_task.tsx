import { useState } from "react";

export const useFormTask = () => {

    const [open, setOpen] = useState(false);
    const statusOptions = [
        { value: '1', label: 'Pendente', color: 'text-amber-600' },
        { value: '2', label: 'Em Andamento', color: 'text-blue-600' },
        { value: '3', label: 'Concluída', color: 'text-emerald-600' },
    ];

    const priorityOptions = [
        { value: '1', label: 'Baixa', color: 'text-green-600' },
        { value: '2', label: 'Média', color: 'text-yellow-600' },
        { value: '3', label: 'Alta', color: 'text-red-600' },
    ];


    return {
        priorityOptions,
        statusOptions,
        open,
        setOpen
    }
}