"use server";
import "server-only";
import { ReactNode } from "react";


export default async function NotFound(): Promise<ReactNode> {
  return (
    <main>
      <div className="bg-blue-600 text-white flex flex-col min-h-screen content-center items-center justify-center justify-items-center text-center">
        <p className="font-semibold text-xl">
          404
        </p>
        <h1 className="font-semibold text-4xl ">
          {`Page not found`}
        </h1>
        <p className="text-xl py-20">
          {`Sorry, we couldn't find the page you're looking for.`}
        </p>
      </div>
    </main>
  )
}
