import { Group } from "@/services/groups/tasks/useListGroups";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import type { JSX } from "react";

const statusColorMap: Record<number, string> = {
  3: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300',
  2: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  1: 'bg-red-100 text-red-700 dark:bg-amber-900/20 dark:text-amber-300',
};

const priorityColorMap: Record<number, string> = {
  3: 'bg-red-100 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-300',
  2: 'bg-yellow-100 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  1: 'bg-green-100 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-300',
};

const statusIconMap: Record<number, JSX.Element> = {
  3: <CheckCircle2 className="w-6 h-6" />,
  2: <Clock className="w-6 h-6" />,
  1: <AlertCircle className="w-6 h-6" />,
};


export const getStatusColor = (status: number): string =>
  statusColorMap[status] ?? 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300';

export const getPriorityColor = (priority: number): string =>
  priorityColorMap[priority] ?? 'bg-slate-100 text-xl text-slate-800 dark:bg-slate-900/20 dark:text-slate-300';

export const getStatusIcon = (status: number): JSX.Element =>
  statusIconMap[status] ?? <Clock className="w-6 h-6" />;

const privacyGroupColorMap: Record<number, string> = {
  2: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  1: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
};

const roleGroupColorMap: Record<number, string> = {
  1: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  2: 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300',
};

const defaultColor = 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300';

export const getPrivacyGroupColor = (privacy: number): string =>
  privacyGroupColorMap[privacy] ?? defaultColor;

export const getRoleGroupColor = (role: number): string =>
  roleGroupColorMap[role] ?? defaultColor;

export const getStatusConfig = (status: number) => {
  switch (status) {
    case 3:
      return {
        label: 'Concluída',
        color: 'text-emerald-700 dark:text-emerald-300',
        bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        icon: CheckCircle2,
        dotColor: 'bg-emerald-500'
      };
    case 2:
      return {
        label: 'Em Andamento',
        color: 'text-blue-700 dark:text-blue-300',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        icon: Clock,
        dotColor: 'bg-blue-500'
      };
    case 1:
      return {
        label: 'Pendente',
        color: 'text-amber-700 dark:text-amber-300',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        borderColor: 'border-amber-200 dark:border-amber-800',
        icon: AlertCircle,
        dotColor: 'bg-amber-500'
      };
    default:
      return {
        label: 'Desconhecido',
        color: 'text-slate-700 dark:text-slate-300',
        bgColor: 'bg-slate-50 dark:bg-slate-900/20',
        borderColor: 'border-slate-200 dark:border-slate-800',
        icon: Clock,
        dotColor: 'bg-slate-500'
      };
  }
};

export const getPriorityConfig = (priority: number) => {
  switch (priority) {
    case 3:
      return {
        label: 'Alta',
        color: 'text-red-700 dark:text-red-300',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        iconColor: 'text-red-500'
      };
    case 2:
      return {
        label: 'Média',
        color: 'text-yellow-700 dark:text-yellow-300',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        iconColor: 'text-yellow-500'
      };
    case 1:
      return {
        label: 'Baixa',
        color: 'text-green-700 dark:text-green-300',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-800',
        iconColor: 'text-green-500'
      };
    default:
      return {
        label: 'Desconhecida',
        color: 'text-slate-700 dark:text-slate-300',
        bgColor: 'bg-slate-50 dark:bg-slate-900/20',
        borderColor: 'border-slate-200 dark:border-slate-800',
        iconColor: 'text-slate-500'
      };
  }
};