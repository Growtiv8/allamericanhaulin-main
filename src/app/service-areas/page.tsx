"use server";
import "server-only";
import Link from "next/link";
import { findData } from "@/dal/mongodb";
import JSONLD from "@/components/json-ld";


export async function generateMetadata() {
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: `Service Areas for All American Haulin | Greater Sacramento`,
    description: "Find out if All American Haulin provides professional junk removal in your neighborhood. We proudly serve Citrus Heights, Roseville, Carmichael, Fair Oaks, Antelope, Foothill Farms, and other communities throughout Placer and Sacramento counties.",
    alternates: {
      canonical: `/service-areas`
    },
    openGraph: {
      title: `Service Areas for All American Haulin | Greater Sacramento`,
      description: "Find out if All American Haulin provides professional junk removal in your neighborhood. We proudly serve Citrus Heights, Roseville, Carmichael, Fair Oaks, Antelope, Foothill Farms, and other communities throughout Placer and Sacramento counties.",
      type: "article",
      publishedTime,
      authors: ["All American Haulin"],
      images: [
        {
          url: "https://allamericanhaulin.com/images/hotlink-ok/all-american-haulin.png",
          alt: "All American Haulin logo."
        }
      ]
    }
  }
}

// export async function generateStaticParams() {
//   const serviceParams = { db_name: 'allamericanhaulin', co_name: 'services', filter: {}, options: {} };
//   const services = (await findData(serviceParams)) as City[];
//   return services.map(v => ({ params: { serviceId: v._id } }));
// }

export default async function Results() {
  const areaServedData = (await findData({ db_name: 'allamericanhaulin', co_name: 'locations', filter: {}, options: { sort: { name: 1 } } })) as City[];
  const areaServed = areaServedData.map((loc) => ({ "@type": "City", "name": loc.name }))
  const jsonLDServiceAreas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://allamericanhaulin.com/service-areas/#webpage",
        "url": "https://allamericanhaulin.com/service-areas/",
        "name": "Service Areas for All American Haulin | Greater Sacramento",
        "isPartOf": {
          "@id": "https://allamericanhaulin.com/#website"
        },
        "description": "Find out if All American Haulin provides professional junk removal in your neighborhood. We proudly serve Citrus Heights, Roseville, Carmichael, Fair Oaks, Antelope, Foothill Farms, and other communities throughout Placer and Sacramento counties.",
        "mainEntity": {
          "@id": "https://allamericanhaulin.com/service-areas/#service"
        }
      },
      {
        "@type": "Service",
        "@id": "https://allamericanhaulin.com/service-areas/#service",
        "name": "All American Haulin Service Area",
        "serviceType": "Junk Removal",
        "provider": {
          "@id": "https://allamericanhaulin.com/#organization"
        },
        "description": "All American Haulin provides professional junk removal services to the following cities and communities in the Greater Sacramento area.",
        areaServed,
        "offers": {
          "@type": "Offer",
          "name": "Free Junk Removal Quote",
          "url": "https://allamericanhaulin.com/contact/",
          "priceCurrency": "USD",
          "description": "Contact us for a free, no-obligation quote in your area."
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://allamericanhaulin.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Service Areas",
            "item": "https://allamericanhaulin.com/service-areas/"
          }
        ]
      }
    ]
  }

  return (
    <div className="w-full h-full flex flex-col gap-16 py-16 content-center items-center justify-center justify-items-center md:gap-32 md:py-32">

      <JSONLD schemaData={jsonLDServiceAreas} />

      <div className="max-w-4xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center text-center">
        <h1 className="w-full h-full font-semibold leading-tight inline text-3xl md:text-4xl md:text-shadow-lg lg:text-5xl">
          {`Service Areas`}
        </h1>
        <h2>
          {`Learn about All American Haulin's service areas.`}
        </h2>
      </div>
      <div className="max-w-7xl w-full h-full px-2">
        <div className="w-full h-full flex flex-row flex-wrap content-center items-center justify-center justify-items-center gap-6 md:gap-12">
          {areaServedData.map((city) => (
            <Link key={city._id} href={`/service-areas/${city._id}`} className="w-fit h-fit ease-in-out duration-100 hover:scale-105 overflow-hidden flex flex-col lg:flex-row">
              <h3 className="line-clamp-2 font-bold ">
                {city.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
      <div className="max-w-4xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center">
        <Link href={`/contact`} className="text-center text-white bg-red-600 py-2 px-3 w-full h-full border border-gray-300 rounded-lg shadow-md ease-in-out duration-100 hover:scale-101 truncate hover:bg-red-400 active:bg-red-900">
          {`Contact Us`}
        </Link>
        <Link href={`/`} className="text-center text-white bg-red-600 py-2 px-3 w-full h-full border border-gray-300 rounded-lg shadow-md ease-in-out duration-100 hover:scale-101 truncate hover:bg-red-400 active:bg-red-900">
          {`Return Home`}
        </Link>
      </div>
    </div>
  )
}
