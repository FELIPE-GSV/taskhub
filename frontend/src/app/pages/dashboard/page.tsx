"use client"
import { useUser } from "@/contexts/userContext";

export default function Dashboard() {

    const { user } = useUser()

    return (
        <main>
            dashboard
            {user?.nome}
        </main>
    );
}