"use server";
import "server-only";
import Image from "next/image";
import { findData } from "@/dal/mongodb";


function JunkCategory({ title, junkData }: { title: string, junkData: Junk[] }) {
  return (
    <div className="w-full h-full gap-4 flex flex-col content-center items-center justify-center justify-items-center border border-gray-300 rounded-lg shadow-md p-4">
      <h3 className="w-full h-full text-left text-3xl font-bold text-shadow-lg">
        {title}
      </h3>
      <div className="w-full h-full gap-4 flex flex-wrap content-center items-center justify-center justify-items-center">
        {junkData.map((v) => (
          <div key={`junk-items-${v._id}`} className="w-full h-full gap-2 flex flex-col content-center items-center justify-center justify-items-center sm:w-2/3 md:w-1/2 lg:w-[calc(33%-0.41rem)]">
            <Image
              alt={v.alt}
              src={`data:image/avif;base64,${String(Buffer.from(v.photo, 'base64'))}`}
              width={0}
              height={0}
              style={{ width: "auto", height: "7rem", objectFit: "cover" }}
              priority={false}
              loading="lazy"
              rel="preload"
            />
            <div className="w-full h-full">
              <h4 className="w-full h-full font-bold line-clamp-1">
                {v.title}
              </h4>
              <p className="w-full h-full line-clamp-2 " >
                {v.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default async function Junk() {
  const junk = (await findData({ db_name: "allamericanhaulin", co_name: "junk", filter: {}, options: {} })) as Junk[];
  const yardJunk = junk.filter(v => ['hot-tub', 'shed', 'yard-debris'].includes(v._id));
  const kitchenJunk = junk.filter(v => ['refrigerator', 'dishwasher', 'microwave', 'stove-oven'].includes(v._id));
  const denJunk = junk.filter(v => ['recliner', 'coffee-table', 'sofa', 'television', 'piano', 'pool-table', 'rug'].includes(v._id));
  const dinningRoomJunk = junk.filter(v => ['dinner-table'].includes(v._id));
  const officeJunk = junk.filter(v => ['office-desk', 'office-chair', 'desktop-computer', 'laptop', 'electronics', 'printer'].includes(v._id));
  const bedRoomJunk = junk.filter(v => ['mattress', 'dresser-drawers'].includes(v._id));
  const laundryRoomJunk = junk.filter(v => ['washer-dryer'].includes(v._id));
  const garageJunk = junk.filter(v => ['bike', 'exercise-equipment', 'scrap-metal', 'tires', 'glass'].includes(v._id));
  return (
    <div className="w-full h-full flex flex-col gap-8 content-center items-center justify-center justify-items-center">
      <JunkCategory title="Front Yard / Back Yard Junk" junkData={yardJunk} />
      <JunkCategory title="Garage Junk" junkData={garageJunk} />
      <JunkCategory title="Kitchen Junk" junkData={kitchenJunk} />
      <JunkCategory title="Den / Living Room / Family Room Junk" junkData={denJunk} />
      <JunkCategory title="Office Junk" junkData={officeJunk} />
      <JunkCategory title="Bed Room Junk" junkData={bedRoomJunk} />
      <JunkCategory title="Laundry Room Junk" junkData={laundryRoomJunk} />
      <JunkCategory title="Dinning Room Junk" junkData={dinningRoomJunk} />
    </div>
  )
}