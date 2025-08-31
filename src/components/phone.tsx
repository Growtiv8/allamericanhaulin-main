"use server";
import "server-only";
import { ChatBubbleBottomCenterTextIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


export default async function Phone({ phoneNumber }: { phoneNumber: string }) {
  return (
    <div className="w-full h-full gap-4 flex flex-col content-center items-center justify-center justify-items-center">
      <p className="w-full h-full text-white text-3xl font-bold md:text-5xl">
        {phoneNumber}
      </p>
      <div className="w-full h-full gap-4 flex flex-col content-center items-center justify-center justify-items-center sm:hidden">
        <Link
          id="text-button"
          href={`sms:+1 ${phoneNumber}`}
          target="_self"
          className="w-full h-full p-2 gap-2 flex flex-col content-center items-center justify-center justify-items-center text-white bg-red-600 border border-red-600 rounded-lg shadow-md ease-in-out duration-100 hover:scale-101"
        >
          <ChatBubbleBottomCenterTextIcon className="size-30" />
          <div className="w-full flex flex-col gap-2 sm:w-2/3">
            <p className="font-bold text-2xl text-center border-b-1">
              {`Click to Text Us`}
            </p>
            <p className="text-center">
              {phoneNumber}
            </p>
            <p className="text-center">
              {`Text for a free quote!`}
            </p>
          </div>
        </Link>
        <Link
          id="call-button"
          href={`tel:+1 ${phoneNumber}`}
          target="_self"
          className="w-full h-full p-2 gap-2 flex flex-col content-center items-center justify-center justify-items-center text-white bg-red-600 border border-red-600 rounded-lg shadow-md ease-in-out duration-100 hover:scale-101"
        >
          <DevicePhoneMobileIcon className="size-30" />
          <div className="w-full flex flex-col gap-2 sm:w-2/3">
            <p className="font-bold text-2xl text-center border-b-1">
              {`Click to Call Us`}
            </p>
            <p className="text-center">
              {phoneNumber}
            </p>
            <p className="text-center">
              {`Call for a free quote!`}
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}