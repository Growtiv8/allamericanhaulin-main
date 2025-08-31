"use client";
import "client-only";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/24/outline";
import { Button } from "@/lib/html-tags";
import { useState } from "react";


export default function Reviews({ data }: { data: Review[] }) {
  const [page, setPage] = useState<number>(0);
  const review = data[page];
  return (
    <div className="w-full h-[30rem] flex content-center items-center justify-center justify-items-center md:w-[25rem] md:h-[35rem] ">
      <div className="w-full h-full border border-gray-300 rounded-lg shadow-md p-4 flex flex-col gap-4 content-center items-center justify-center justify-items-center ">
        <div className="w-full h-fit flex flex-col gap-2 content-center items-center justify-center justify-items-center" >
          <div className="size-15 rounded-full font-bold text-3xl text-center text-white bg-blue-600 flex content-center items-center justify-center justify-items-center" >
            {review.name.slice(0, 1).toUpperCase()}
          </div>
          <p className="w-full h-fit font-semibold text-center leading-none text-sm md:text-base lg:text-lg ">
            {review.name}
          </p>
          <p className="w-full h-fit text-center leading-none text-sm md:text-base ">
            {review.date}
          </p>
        </div>
        <div className="size-5">
          <svg version="1.1" viewBox="0 0 48 48" style={{ display: "block" }}>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        <div className="w-full h-fit flex content-center items-center justify-center justify-items-center">
          {Array(Number(review.rating)).fill(0).map((_, i) => (
            <StarIcon key={`star-${i}`} className="size-6" style={{ fill: "yellow", strokeWidth: 1 }} />
          ))}
        </div>
        <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden">
          <div className="w-full h-full p-4 overflow-y-auto">
            <p className="w-full h-fit text-sm md:text-base">
              {review.review}
            </p>
          </div>
        </div>
        <div className="w-full h-fit flex gap-1 content-center items-center justify-center justify-items-center text-center leading-none">
          <Button
            id="prev-review-btn"
            name="prev-review-btn"
            type="button"
            onClick={() => setPage(page - 1)}
            className={`${page === 0 ? 'pointer-events-none' : 'pointer-events-auto'} rounded-none rounded-tl-lg rounded-bl-lg w-fit bg-red-600 hover:bg-red-400 active:bg-red-800`}
          >
            <ChevronLeftIcon style={{ width: "1rem", height: "1rem", color: "white", strokeWidth: 3 }} />
          </Button>
          <Button
            id="next-review-btn"
            name="next-review-btn"
            type="button"
            onClick={() => setPage(page + 1)}
            className={`${page === (data.length - 1) ? 'pointer-events-none' : 'pointer-events-auto'} rounded-none rounded-tr-lg rounded-br-lg w-fit bg-red-600 hover:bg-red-400 active:bg-red-800`}
          >
            <ChevronRightIcon style={{ width: "1rem", height: "1rem", color: "white", strokeWidth: 3 }} />
          </Button>
        </div>
      </div>
    </div>
  )
}
