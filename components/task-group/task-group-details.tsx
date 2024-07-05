import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { RoleGate } from '../auth/role-gate';
import { CriticalityIndicator, StatusIndicator, ProgressIndicator } from '@/components/ui/indicators';
import { fetch_task_group_by_id, fetch_task_group_progress_by_id } from "@/data/task-group";
import { Role } from '@prisma/client';


const TaskGroupDetails = async ({ id }: { id: string }) => {
    const taskGroup = await fetch_task_group_by_id(id);
    if (!taskGroup) {
        return <div>Task group not found
            <Link href='/dashboard/task-groups'>Go back</Link>
        </div>
    }
    const { task_count, task_completed } = await fetch_task_group_progress_by_id(id);
    const { name, description, criticality, status } = taskGroup;

    return (
        <div className="flex flex-row items-center justify-between ">
            <div className='max-w-3xl space-y-4'>
                <div className='flex flex-row items-center gap-4'>
                    <h2 className="text-slate-800 dark:text-slate-200 text-3xl font-semibold">{name}</h2>
                    <RoleGate allowedRoles={[Role.OWNER, Role.ADMIN]} message="You don't have permissions">
                        <Link href={`/dashboard/task-groups/${id}/edit`} className='transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
                            <PencilSquareIcon className='w-8 h-8  hover:text-black dark:hover:text-white' />
                        </Link>
                    </RoleGate>
                </div>
                <p className="text-md text-slate-800 dark:text-slate-300">{description}</p>
            </div>
            <div className='flex flex-col justify-items-center items-center gap-1'>
                <span className="text-md ">Criticality:  </span>
                <CriticalityIndicator criticality={criticality} >
                    {criticality}
                </CriticalityIndicator>
            </div>
            <div className='flex flex-col justify-items-center items-center gap-1'>
                <span className="text-md ">Status: </span>
                <StatusIndicator status={status} />
            </div>
            <div className='flex flex-col justify-items-center items-center gap-1'>
                <span className="text-md ">General progress: </span>
                <div className='flex flex-row items-center gap-1'>
                    <ProgressIndicator fraction={{ numerator: task_completed, denominator: task_count }} />
                    <span>{task_completed}/{task_count}</span>
                </div>
            </div>
        </div>
    )
}
export default TaskGroupDetails