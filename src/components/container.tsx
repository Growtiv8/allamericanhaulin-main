"use server";
import "server-only";
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge";
import Footer from "./footer";
import Navbar from "./navbar";


export default async function Container({ className, children }: { className?: string, children: ReactNode }): Promise<ReactNode> {
  const cn = twMerge("relative w-full h-fit flex flex-col content-center items-center justify-center justify-items-center bg-white", className)

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className={cn}>
        {children}
      </div>
      <Footer />
    </div>
  )
}


