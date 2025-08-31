"use client";
import "client-only";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEventHandler, ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog } from "@localwebleads/html-tags";
import { phoneNumber } from "@/constants/contact-info";


const websiteName = "All American Haulin"

const pages = [
  {
    name: "HOME",
    href: `/`
  },
  {
    name: "SERVICES",
    href: `/services`
  },
  {
    name: "SERVICE AREAS",
    href: `/service-areas`
  },
  {
    name: "ABOUT",
    href: `/about`
  },
  {
    name: "CONTACT",
    href: `/contact`
  },
  {
    name: "BLOG",
    href: `/blog`
  }
]

function DesktopMainMenu({ className }: { className: string }): ReactNode {
  const pathname = usePathname();
  const cn = twMerge('w-full h-full', className);
  return (
    <div className={cn}>
      <div className="w-full h-full flex gap-6 content-center items-center justify-center justify-items-center ">
        {pages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className={`ease-in-out duration-100 hover:scale-105 text-sm text-nowrap text-center content-center items-center justify-center justify-items-center border-b-2 font-medium ${pathname === page.href ? ' border-white text-white' : ' border-transparent text-primary-medium hover:border-primary-light hover:text-primary-light active:border-primary-dark active:text-primary-dark '} lg:text-lg`}
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

function MobilMainMenu({ className }: { className: string }): ReactNode {
  const router = useRouter();
  const mobilMainMenuModalRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const cn = twMerge('w-fit h-fit', className);
  const toggleMobilMainMenuModal = () => {
    if (!!mobilMainMenuModalRef.current) {
      if (mobilMainMenuModalRef.current.hasAttribute('open')) {
        mobilMainMenuModalRef.current.close();
      } else {
        mobilMainMenuModalRef.current.showModal();
      }
    }
  }

  const handleOutsideModalClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    if (!!mobilMainMenuModalRef.current && (event.target === mobilMainMenuModalRef.current)) {
      toggleMobilMainMenuModal();
    }
  };
  return (
    <div className={cn}>
      <Dialog id="navigation-menu" ref={mobilMainMenuModalRef} onClick={handleOutsideModalClick} >
        <div className="w-full h-fit flex content-center items-center justify-end justify-items-center">
          <button
            type="button"
            onClick={toggleMobilMainMenuModal}
            className="w-fit h-fit"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>
        <div className=" w-full h-fit flex flex-col content-center items-center justify-center justify-items-center gap-6">
          <h3 className="w-full h-fit font-bold text-gray-900 px-2">
            Navigation Menu
          </h3>
          {pages.map((page) => (
            <button
              key={page.name}
              onClick={(event) => {
                event.stopPropagation();
                router.push(page.href);
                router.refresh();
                toggleMobilMainMenuModal();
              }}
              className={`w-fit h-fit text-xs text-center content-center items-center justify-center justify-items-center border-b-2 font-medium ${pathname === page.href ? ' border-primary-medium' : ' border-transparent'} lg:text-lg`}
            >
              {page.name}
            </button>
          ))}
        </div>
      </Dialog>
      <button
        id="mobil-main-menu-btn"
        name="mobil-main-menu-btn"
        onClick={toggleMobilMainMenuModal}
        className="w-fit h-fit p-2 text-white "
      >
        <Bars3Icon className="block size-6 " />
      </button>
    </div>
  )
}

export default function Navbar(): ReactNode {

  return (
    <nav className="w-full h-[5rem] flex content-center items-center justify-center justify-items-center text-center text-white bg-blue-600">
      <div className=" w-full h-full flex content-center items-center justify-between justify-items-center">
        <div className=" w-full h-full flex content-center items-center justify-between justify-items-center px-2">
          <div className="w-full h-full flex gap-4 content-center items-center justify-between justify-items-center">
            <MobilMainMenu className="flex md:hidden" />
            <Link href="/" className="flex content-center items-center justify-center justify-items-center gap-2 w-full h-full md:justify-start">
              <div className="md:text-nowrap lg:text-2xl">
                {websiteName}
              </div>
            </Link>
            <DesktopMainMenu className="hidden md:flex " />
            <div className="w-full h-full hidden 2xl:flex 2xl:gap-4 2xl:content-center 2xl:items-center 2xl:justify-end 2xl:justify-items-center">
              <Link className="ease-in-out duration-100 hover:scale-105 w-fit h-fit px-3 py-2 text-xs flex md:hidden" href={`tel:+1 ${phoneNumber}`}>
                <p className="text-nowrap">
                  {phoneNumber}
                </p>
              </Link>
              <p className="hidden text-nowrap md:flex md:text-base">
                {phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
