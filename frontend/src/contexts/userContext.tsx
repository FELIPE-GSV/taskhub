// context/UserContext.tsx
'use client'
import React, { createContext, useContext, useState } from 'react'

export type Task = {
    id?: number
    title: string
    description: string,
    expiration_date: string,
    status: number
}
export type User = {
    id: number
    email: string
    nome: string
    tasks?: Task[]
}

type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
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
