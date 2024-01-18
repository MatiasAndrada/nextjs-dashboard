import Link from 'next/link';
import NavLinks from '@/components/dashboard/nav-links';
import DropDownSelectProject from "@/components/dashboard/drop-down-select-project"
import AcmeLogo from '@/components/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { fetchProjectsOfUser } from "@/data/projects";



export default async function SideNav() {
  const projectItems = await fetchProjectsOfUser();

  return (
    <div className="flex h-full flex-col px-3 py  -4 md:px-2">
      <div className="dark:bg-slate-950 mb-1 flex flex-col h-20 items-center justify-around rounded-md bg-blue-600 p-2 md:h-40">
        <DropDownSelectProject items={projectItems} name="Projects" createName="project" />
        <Link href="/">
          <div className="w-32 text-white md:w-40">
            <AcmeLogo />
          </div>
        </Link>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
      <div className="flex-none flex flex-col justify-end md:justify-start">
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}
