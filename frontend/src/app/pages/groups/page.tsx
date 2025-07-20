"use client"
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { CardGroups } from "./cards_groups/cards_groups";
import { FiltersGroups } from "./filters_groups/filters_groups";
import { GroupsComponent } from "./groups_component/groups_component";
import { useListGroups } from "@/services/groups/tasks/useListGroups";
import { FormGroup } from "./form_group/form_group";
import { useState } from "react";

export default function Groups() {

    const [name, setName] = useState('')
    const [privacy, setPrivacy] = useState('')
    const [role, setRole] = useState('')



    const { data: groups } = useListGroups({filters: {name, privacy, role}})

    return (
        <main className="w-full h-screen flex flex-col justify-start items-start px-[15%] py-4 space-y-6">
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
                        <Users className="w-7 h-7 mr-3 text-blue-600" />
                        Meus Grupos
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                        Colabore em tarefas com sua equipe
                    </p>
                </div>
                <FormGroup />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <CardGroups groups={groups}/>
            </div>
            <FiltersGroups 
                name={name}
                setName={setName}
                privacy={privacy}
                setPrivacy={setPrivacy}
                role={role}
                setRole={setRole}
            />
            <GroupsComponent groups={groups} />
        </main>
    );
}