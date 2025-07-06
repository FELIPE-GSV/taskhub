'use client'
import { Notification } from '@/services/notifications/useListNotification'
import React, { createContext, useContext, useState } from 'react'

export type Task = {
    id?: number
    title: string
    description: string
    expiration_date: string
    status: number
    priority: {
        id: number
        label: string
    }
    responsible: string
}
export type User = {
    id: number
    email: string
    first_name: string
    last_name: string
    profile_picture: string | null
    bio: string | null
    phone: string | null
}

export type DashboardUser = {
    total_tasks: {
        message: string,
        tasks: number
    },
    tasks_done: {
        message: string,
        tasks: number
    },
    tasks_in_progress: {
        message: string,
        tasks: number
    },
    tasks_pending: {
        message: string,
        tasks: number
    },
    last_tasks: Task[],
    weekly_progress: number
}



type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void,
    dashboardUser: DashboardUser | null | undefined,
    setDashboardUser: (dashboardUser: DashboardUser | null | undefined) => void
    filterTitleTask: string
    setFilterTitleTask: (filterTitleTask: string) => void
    filterStatusTask: string
    setFilterStatusTask: (filterStatusTask: string) => void
    filterPriorityTask: string
    setFilterPriorityTask: (filterPriorityTask: string) => void
    notifications: Notification[]
    setNotifications: (notifications: Notification[]) => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [dashboardUser, setDashboardUser] = useState<DashboardUser | null | undefined>(null)
    const [filterTitleTask, setFilterTitleTask] = useState<string>("")
    const [filterStatusTask, setFilterStatusTask] = useState<string>("")
    const [filterPriorityTask, setFilterPriorityTask] = useState<string>("")
    const [notifications, setNotifications] = useState<Notification[]>([])

    return (
        <UserContext.Provider value={{
            dashboardUser,
            setDashboardUser,
            filterPriorityTask,
            setFilterPriorityTask,
            filterStatusTask,
            setFilterStatusTask,
            filterTitleTask,
            setFilterTitleTask,
            user,
            setUser,
            notifications,
            setNotifications
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser deve ser usado dentro de um <UserProvider>')
    }
    return context
}
