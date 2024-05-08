import { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import Search from "@/components/search";
import TaskGroupGrid from "@/components/task-group/task-group-grid";
import Pagination from "@/components/pagination";
import { CreateTaskGroup } from "@/components/task-group/buttons";
import { fetch_task_group_pages } from "@/data/task-group";
//!ADD SKELETON LOADING


export const metadata: Metadata = {
    title: {
        template: "%s | Project Admin",
        default: "Task Groups",
    },
    description: "",
};

export default async function Page({
    searchParams,
}: {
    searchParams?: { query?: string; page?: string };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetch_task_group_pages(query);
    return (
        <div className="w-full space-y-4">
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    {
                        label: "Task Groups",
                        href: "/dashboard/task-groups",
                        active: true,
                    },
                ]}
            />

            <div className="flex items-center justify-between gap-2">
                <Search placeholder="Search task groups..." />
                <CreateTaskGroup />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <TaskGroupGrid query={query} currentPage={currentPage} />
            </Suspense>
            <div className="flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>

    );
}
