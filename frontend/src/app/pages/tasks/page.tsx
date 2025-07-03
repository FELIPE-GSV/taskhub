"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Tag } from "lucide-react";
import { FiltersTasks } from "./filters";
import { TaskComponent } from "./tasks_component";
import { FormTask } from "./form_task/form_task";

export default function Tasks() {
    return (
        <main className="w-full h-screen flex flex-col justify-start items-start px-[20%] py-4">
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="w-full">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        Gerenciar Tarefas
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                        Crie, edite e organize todas as suas tarefas
                    </p>
                </div>
                <FormTask />
                {/* <CreateTaskDialog onTaskCreate={onTaskCreate} /> */}
            </div>
            <div className="w-full mt-6">
                <FiltersTasks />
            </div>
            <div className="w-full mt-6">
                <TaskComponent />
            </div>
        </main>
    )
}