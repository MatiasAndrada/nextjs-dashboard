import moment from "moment";
import DropdownChangeStatus from "@/components/ui/dropdowns/dropdown-change-status";
import { /*Slider,*/ Progress } from "@nextui-org/react";
//import SliderProgress from "../../progress-slider";
import { Role, Status } from "@prisma/client";

interface TabContentInfoProps {
  id: string;
  status: Status;
  progress: number;
  createdAt: Date;
}

const TabContentInfo: React.FC<TabContentInfoProps> = ({
  id,
  status,
  progress,
  createdAt,
}) => {
  const createdAtLocal = moment(createdAt).format("DD/MM/YYYY");
  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-4">
      <div className="bg-slate-300 dark:bg-slate-900 rounded-lg col-span-1 row-span-2">
        <div className="flex flex-col items-start justify-start p-4 rounded-lg shadow-md gap-4">
          <p className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
            Status:
          </p>
          <DropdownChangeStatus
            idTask={id}
            status={status}
            rolesAllowed={[Role.OWNER, Role.ADMIN, Role.EDITOR]}
          />
        </div>
      </div>
      <div className="bg-slate-300 dark:bg-slate-900 rounded-lg col-span-1 row-span-2">
        <div className="flex flex-col items-start justify-start p-4 rounded-lg shadow-md gap-4">
          <p className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
            Progress:
          </p>
          {/*           <SliderProgress id={id} value={progress} role={role} /> */}
          <Progress value={60} />
        </div>
      </div>
      <div className="bg-slate-300 dark:bg-slate-900 rounded-lg col-span-1 row-span-2">
        <div className="flex flex-col items-start justify-start p-4 rounded-lg shadow-md gap-4">
          <p className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
            Updated At:
          </p>
          <p className="text-lg ">coming soon</p>
        </div>
      </div>
      <div className="bg-slate-300 dark:bg-slate-900 rounded-lg col-span-1 row-span-2">
        <div className="flex flex-col items-start justify-start p-4 rounded-lg shadow-md gap-4">
          <p className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
            Created At:
          </p>
          <p className="text-lg">{createdAtLocal}</p>
        </div>
      </div>
    </div>
  );
};

export default TabContentInfo;
