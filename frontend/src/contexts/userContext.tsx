// context/UserContext.tsx
'use client'
import React, { createContext, useContext, useState } from 'react'

export type Task = {
    id?: number
    title: string
    description: string
    expiration_date: string
    status: number
    priority: number
    responsible: string
}
export type User = {
    id: number
    email: string
    nome: string
}

export type DashboardUser = {
    total_tasks: number,
    tasks_done: number,
    tasks_in_progress: number,
    tasks_pending: number,
    last_tasks: Task[]
}



type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void,
    dashboardUser: DashboardUser | null,
    setDashboardUser: (dashboardUser: DashboardUser | null) => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [dashboardUser, setDashboardUser] = useState<DashboardUser | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser, dashboardUser, setDashboardUser }}>
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
