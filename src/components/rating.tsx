"use server";
import "server-only";
import { StarIcon } from "@heroicons/react/24/outline";


const userRatingAvg = "5.0";
const userRatingCount = "54";

export default async function Rating() {
  const userRatingAvgStarSize = 1;
  const rating = Number(userRatingAvg);
  return (
    <div className="bg-white rounded-lg px-3 py-2 shadow-md w-fit flex flex-row gap-2 content-center items-center justify-center justify-items-center ">
      <div className="size-15 md:size-25">
        <svg version="1.1" viewBox="0 0 48 48" style={{ display: "block" }}>
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
      </div>
      <div className="w-fit flex flex-col gap-2 content-center items-center justify-center justify-items-center">
        <p className="font-bold text-lg md:text-2xl">
          {`${Number(userRatingAvg).toFixed(1)} / 5.0`}
        </p>
        <div style={{ display: "flex", overflow: "hidden", width: `calc(${(rating % 2 !== 0) ? ((Math.floor(rating) * userRatingAvgStarSize) + ((rating % 2) * userRatingAvgStarSize)) : (rating * userRatingAvgStarSize)}rem)`, height: "100%" }}>
          {Array(Math.ceil(rating)).fill(0).map((_, i) => (
            <StarIcon key={`user-avg-rating-star-${i}`} style={{ minWidth: `${userRatingAvgStarSize}rem`, minHeight: `${userRatingAvgStarSize}rem`, zIndex: "10", strokeWidth: "1", fill: "yellow" }} />
          ))}
        </div>
        <p className="text-sm md:text-base">
          {`(${userRatingCount} reviews)`}
        </p>
      </div>
    </div>
  )
}