"use server";
import "server-only";
import { CalendarDaysIcon, DevicePhoneMobileIcon, TruckIcon } from "@heroicons/react/24/outline";


export default async function Process({ phoneNumber }: { phoneNumber: string }) {
  const processes = [
    {
      _id: "call",
      title: "Step 1: Call",
      description: `Call ${phoneNumber} and get a free quote.`,
      icon: DevicePhoneMobileIcon
    },
    {
      _id: "appointment",
      title: "Step 2: Appointment",
      description: "Schedule a junk pick-up appointment over the phone.",
      icon: CalendarDaysIcon
    },
    {
      _id: "pick-up",
      title: "Step 3: Pick Up",
      description: "Watch your junk disapear and reclaim your space.",
      icon: TruckIcon
    }
  ]
  return (
    <div className="w-full h-full gap-4 flex flex-col content-center items-center justify-center justify-items-center md:flex-row md:gap-8">
      {processes.map((v) => (
        <div key={`junk-items-${v._id}`} className="text-white bg-blue-600 border border-blue-600 rounded-lg shadow-md p-4 w-full h-full gap-2 flex flex-col content-center items-center justify-center justify-items-center sm:w-2/3 md:w-1/2 lg:w-[calc(33%-0.41rem)]">
          <v.icon className="size-20" />
          <div className="w-full h-full">
            <h3 className="text-shadow-lg text-3xl w-full h-full font-bold line-clamp-1">
              {v.title}
            </h3>
            <p className="w-full h-full line-clamp-2 " >
              {v.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}