"use server";
import "server-only";
import Image from "next/image";
import Services from "./services";
import Photos from "./photos";
import Reviews from "./reviews";
import Founders from "./founders";
import { format } from "date-fns";
import { findData } from "@/dal/mongodb";
import Junk from "./junk";
import Recycling from "./recycling";
import Process from "./process";
import Phone from "./phone";
import Rating from "./rating";
import ContactForm from "./contact-form";


export default async function Landing({ locationName, phoneNumber }: { locationName: string, phoneNumber: string }) {
  const reviews = ((await findData({ db_name: "allamericanhaulin", co_name: "reviews", filter: {}, options: {} })) as Review[])
    .filter(review => review && review.date) // Filter out reviews without dates
    .sort((a, b) => (b.date || '').localeCompare(a.date || '')) // Safe comparison with fallback
    .map(v => ({ ...v, date: format(new Date(v.date), 'MMM d, yyy') }));
  return (
    <div className="w-full h-full flex flex-col gap-16 pb-16 content-center items-center justify-center justify-items-center md:gap-32 md:pb-32">

      {/** Headline */}
      <div className="relative w-full h-full px-2 flex flex-col gap-8 content-center items-center justify-center justify-items-center overflow-hidden py-4 lg:py-32">
        {/** Background */}
        <div className="absolute top-0 w-full h-full bg-black lg:flex">
          <Image
            src="/images/hotlink-ok/truck.png"
            alt="All American Haulin Truck."
            fill={true}
            sizes="1000px 500px"
            style={{ objectFit: "cover", opacity: 0.2 }}
            priority={true}
            loading="eager"
            rel="preload"
          />
        </div>
        <div className="relative max-w-5xl w-full h-full gap-4 flex flex-col content-center items-center justify-center justify-items-center">
          <div className="relative px-2 max-w-sm w-full flex flex-col gap-8 content-center items-center justify-center justify-items-center md:flex-row md:max-w-5xl ">
            {/** Headline */}
            <div className="relative w-full h-full text-left flex flex-col content-center items-center justify-center justify-items-center gap-4 md:gap-12 ">
              <div className="relative max-w-5xl w-full h-full gap-4 flex flex-row flex-shrink content-center items-center justify-around justify-items-center ">
                <Image
                  src="/icons/icon.svg"
                  alt="All American Haulin Logo."
                  width={0}
                  height={0}
                  style={{ width: "7rem", height: "auto", objectFit: "contain" }}
                  priority={true}
                  loading="eager"
                  rel="preload"
                />
                <Rating />
              </div>
              <h1 className="w-full h-full font-bold leading-tight inline text-white text-left text-3xl md:text-4xl md:text-shadow-lg lg:text-5xl">
                {`Same day`}
                <br />
                {`Junk Removal Services`}
                <br />
                {`in ${locationName} and`}
                <br />
                {`surrounding areas`}
              </h1>
              <h2 className="w-full h-full text-lg font-bold text-white md:text-xl md:text-shadow-lg">
                {`Fast, reliable, and eco-friendly`}
                <br />
                {`junk removal services`}
                <br />
                {`helping you reclaim your space`}
                <br />
                {`without the stress.`}
              </h2>
              <div className="w-full h-full gap-4 flex flex-col content-center items-center justify-center justify-items-center text-left">
                <p className="w-full h-full text-white text-2xl font-bold">
                  {`Call or Text a Photo`}
                  <br />
                  {`Get a Free Quote!`}
                </p>
                <Phone phoneNumber={phoneNumber} />
              </div>
            </div>
            <div className="relative w-full h-fit bg-white rounded-lg flex flex-col content-center items-center justify-center justify-items-center gap-4 md:gap-12 md:w-fit">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full h-full flex flex-col gap-16 content-center items-center justify-center justify-items-center md:gap-32 lg:flex-row lg:items-start lg:gap-8">
        <div className="max-w-2xl p-2 w-full flex flex-col gap-4 content-center items-center justify-center justify-items-center md:gap-12">
          <h2 className="w-full font-bold text-shadow-lg text-4xl text-center md:text-5xl">
            {`Meet the Founders`}
          </h2>
          <Founders />
        </div>

        <div className="max-w-4xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center">
          <h2 className="w-full h-full font-bold leading-tight inline text-center text-3xl md:text-4xl md:text-shadow-md lg:text-5xl">
            {`Customer Reviews`}
          </h2>
          <Reviews data={reviews} />
        </div>
      </div>

      <div className="max-w-7xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center">
        <h2 className="w-full h-full font-bold leading-tight inline text-center text-3xl md:text-4xl md:text-shadow-lg lg:text-5xl">
          {`Junk Removal Process in ${locationName}`}
        </h2>
        <Process phoneNumber={phoneNumber} />
      </div>

      <div className="max-w-7xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center lg:gap-8 lg:px-8 2xl:px-2">
        <h2 className="w-full h-full font-bold leading-tight inline text-center text-3xl md:text-4xl md:text-shadow-md lg:text-5xl">
          {`Before and After Photos`}
        </h2>
        <Photos />
      </div>

      <div className="max-w-7xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center">
        <h2 className="w-full h-full font-bold leading-tight inline text-center text-3xl md:text-4xl md:text-shadow-lg lg:text-5xl">
          {`Junk we take in ${locationName}`}
        </h2>
        <Junk />
      </div>

      <div className="max-w-7xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center">
        <h2 className="w-full h-full font-bold leading-tight inline text-center text-3xl md:text-4xl md:text-shadow-lg lg:text-5xl">
          {`Junk Removal Services in ${locationName}`}
        </h2>
        <Services locationName={locationName} />
      </div>

      <div className="max-w-7xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center">
        <h2 className="w-full h-full font-bold leading-tight inline text-center text-3xl md:text-4xl md:text-shadow-lg lg:text-5xl">
          {`Proper disposal and recycling in ${locationName}`}
        </h2>
        <Recycling locationName={locationName} />
      </div>

      <div className="max-w-4xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center">
        <h2 className="w-full h-full font-bold leading-tight inline text-center text-3xl md:text-4xl md:text-shadow-lg lg:text-5xl">
          {`Contact Us`}
        </h2>
        <div className="w-full h-full">
          {`Ready to say goodbye to that junk and hello to more space? Let our ${locationName} junk removal team take the load off your shoulders (literally!).`}
        </div>
        <div className="w-full h-full">
          {`Give us a call today for a free, no-obligation quote for your junk removal! Let’s get your space feeling fresh and clear again.`}
        </div>
        <p className="w-full h-full text-3xl text-center font-bold md:text-5xl">
          {phoneNumber}
        </p>
      </div>
    </div>
  )
}
