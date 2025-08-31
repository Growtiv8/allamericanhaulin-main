"use server";
import "server-only";
import Landing from "@/components/landing";
import { phoneNumber, adsPhoneNumber } from "@/constants/contact-info";
import { deleteManyData, findData, insertOneData } from "@/dal/mongodb";
import { headers } from "next/headers";


export default async function Page({ searchParams }: { searchParams: Promise<{ gclid: string, [key: string]: unknown }> }) {
  const { gclid } = await searchParams;
  let phone = phoneNumber;
  let locationName = "Citrus Heights";
  const headersList = await headers();
  try {
    const serviceAreaData = (await findData({ db_name: "allamericanhaulin", co_name: "locations", filter: {}, options: { projection: { _id: 1, name: 1 } } })) as Pick<City, '_id' | 'name'>[]
    const city = headersList.get('cf-ipcity')?.toLowerCase() ?? "";
    locationName = serviceAreaData.map(v => v.name).filter(v => v.toLowerCase() === city.toLowerCase())[0] ?? "Citrus Heights"

    const dateLowerBound = new Date((new Date()).valueOf() - (1000 * 60 * 60 * 24 * 90));
    await deleteManyData({ db_name: "allamericanhaulin", co_name: "gclids", filter: { date: { "$lt": dateLowerBound } }, options: {} });
    if (!!gclid) {
      await insertOneData({ db_name: "allamericanhaulin", co_name: "gclids", doc: { _id: gclid, date: (new Date()).toISOString() }, options: {} });
      phone = adsPhoneNumber;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occured.');
    }
    phone = phoneNumber;
    locationName = "Citrus Heights";
  }
  return (
    <div className="w-full h-full flex flex-col gap-16 pb-16 content-center items-center justify-center justify-items-center md:gap-32 md:pb-32">
      <Landing locationName={locationName} phoneNumber={phone} />
    </div>
  );
}
