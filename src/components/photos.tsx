"use server";
import "server-only";
import { findData } from "@/dal/mongodb";
import Image from "next/image";
// import fs from "fs";

export default async function Photos() {

  // const path = process.cwd() + "/public/project4-after.jpg";
  // const imageBuffer = fs.readFileSync(path);
  // const base64String = imageBuffer.toString('base64');
  // console.log(base64String);

  const photos = (await findData({ db_name: "allamericanhaulin", co_name: "photos", filter: {}, options: {} })) as Photo[];

  return (
    <div className="w-full h-full gap-4 flex flex-wrap flex-col content-center items-center justify-center justify-items-center sm:flex-row lg:gap-8">
      {photos.map((v, i) => (
        <div key={`before-after-photo-${i}`} className="w-fit h-full p-2 border border-gray-300 shadow-md rounded-lg text-center gap-2 flex flex-col content-center items-center justify-center justify-items-center sm:p-4 lg:w-[calc(50%-1rem)]">
          <h2 className="w-full h-full font-bold text-2xl">
            {v.title}
          </h2>
          <div key={`before-after-photo-${i}`} className="w-full h-full text-center gap-2 flex flex-col content-center items-center justify-center justify-items-center sm:gap-4 lg:flex-row ">
            <div className="w-full h-full gap-1 flex flex-col content-center items-center justify-center justify-items-center">
              <h3 className="w-full h-full font-bold">
                {`Before`}
              </h3>
              <Image
                alt={v.before.alt}
                src={`data:image/avif;base64,${String(Buffer.from(v.before.photo, 'base64'))}`}
                width={0}
                height={0}
                style={{ width: "20rem", height: "15rem", borderRadius: "0.75rem", objectFit: "cover", boxShadow: "var(--shadow-md)" }}
                priority={true}
                loading="eager"
                rel="preload"
              />
            </div>
            <div className="w-full h-full gap-1 flex flex-col content-center items-center justify-center justify-items-center">
              <h3 className="w-full h-full font-bold">
                {`After`}
              </h3>
              <Image
                alt={v.after.alt}
                src={`data:image/avif;base64,${String(Buffer.from(v.after.photo, 'base64'))}`}
                width={0}
                height={0}
                style={{ width: "20rem", height: "15rem", borderRadius: "0.75rem", objectFit: "cover", boxShadow: "var(--shadow-md)" }}
                priority={true}
                loading="eager"
                rel="preload"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}