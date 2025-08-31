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
    title: "Junk Removal Services | All American Haulin",
    description: "Explore the full range of professional and reliable junk removal services offered by All American Haulin in Citrus Heights, CA. We handle everything from residential cleanouts to commercial debris.",
    alternates: {
      canonical: `/services`
    },
    openGraph: {
      title: "Junk Removal Services | All American Haulin",
      description: "Explore the full range of professional and reliable junk removal services offered by All American Haulin in Citrus Heights, CA. We handle everything from residential cleanouts to commercial debris.",
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

  const servicesData = (await findData({ db_name: 'allamericanhaulin', co_name: 'services', filter: {}, options: {} })) as Service[];

  const services = servicesData.map((serv) => ({
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "serviceType": serv.title,
      "name": serv.title,
      "url": `https://allamericanhaulin.com/services/${serv._id}`,
      "description": serv.description,
      "provider": {
        "@id": "https://allamericanhaulin.com/#organization"
      }
    }
  }))
  const jsonLDServices = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://allamericanhaulin.com/services/#webpage",
        "url": "https://allamericanhaulin.com/services/",
        "name": "Junk Removal Services | All American Haulin",
        "isPartOf": {
          "@id": "https://allamericanhaulin.com/#website"
        },
        "description": "Explore the full range of professional and reliable junk removal services offered by All American Haulin in Citrus Heights, CA. We handle everything from residential cleanouts to commercial debris.",
        "mainEntity": {
          "@id": "https://allamericanhaulin.com/services/#offercatalog"
        }
      },
      {
        "@type": "OfferCatalog",
        "@id": "https://allamericanhaulin.com/services/#offercatalog",
        "name": "Junk Removal Services",
        "itemListElement": services
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
            "name": "Services",
            "item": "https://allamericanhaulin.com/services/"
          }
        ]
      }
    ]
  }

  return (
    <div className="w-full h-full flex flex-col gap-16 py-16 content-center items-center justify-center justify-items-center md:gap-32 md:py-32">

      <JSONLD schemaData={jsonLDServices} />

      <div className="max-w-4xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center text-center">
        <h1 className="w-full h-full font-semibold leading-tight inline text-3xl md:text-4xl md:text-shadow-lg lg:text-5xl">
          {`Services`}
        </h1>
        <h2>
          {`Learn about our junk removal services in Citrus Heights and surrounding areas.`}
        </h2>
      </div>
      <div className="max-w-7xl w-full h-full px-2">
        <div className="w-full h-full flex flex-row flex-wrap content-center items-center justify-center justify-items-center gap-6 md:gap-12">
          {servicesData.map((service) => (
            <Link key={service._id} href={`/services/${service._id}`} className="w-[24.3rem] h-[10rem] ease-in-out duration-100 hover:scale-101 overflow-hidden border border-gray-300 rounded-lg shadow-md flex flex-col lg:flex-row">
              <div className="w-full h-full p-2 flex flex-col gap-4 md:p-4">
                <div className="w-full h-full flex flex-col gap-2">
                  <h3 className="line-clamp-1 font-bold ">
                    {service.title}
                  </h3>
                  <h4 className="line-clamp-4 text-sm ">
                    {service.description}
                  </h4>
                </div>
              </div>
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
