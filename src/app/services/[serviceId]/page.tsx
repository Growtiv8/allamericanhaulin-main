"use server";
import "server-only"
import Image from "next/image";
import { findData } from "@/dal/mongodb";
import Link from "next/link";
import JSONLD from "@/components/json-ld";


export async function generateMetadata({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const dataParams = { db_name: 'allamericanhaulin', co_name: 'services', filter: { _id: serviceId }, options: {} };
  const service = ((await findData(dataParams)) as Service[])[0];
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: `${service.title} Service in Citrus Heights, CA | All American Haulin`,
    description: `Our comprehensive ${service.title} service covers the hauling of junk from anywhere on your property. Our professional team does all the heavy lifting, loading, and disposal for you, ensuring a hassle-free experience.`,
    alternates: {
      canonical: `/services/${serviceId}`
    },
    openGraph: {
      title: `${service.title} Service in Citrus Heights, CA | All American Haulin`,
      description: `Our comprehensive ${service.title} service covers the hauling of junk from anywhere on your property. Our professional team does all the heavy lifting, loading, and disposal for you, ensuring a hassle-free experience.`,
      type: "article",
      publishedTime,
      authors: ["All American Haulin"],
      images: [
        {
          url: "https://allamericanhaulin.com/images/hotlink-ok/all-american-haulin.png",
          alt: "All American Haulin truck."
        }
      ]
    }
  }
}

// export async function generateStaticParams() {
//   const postParams = { db_name: 'allamericanhaulin', co_name: 'posts', filter: {}, options: {} };
//   const posts = (await findData(postParams)) as Post[];
//   return posts.map(v => ({ params: { postId: v._id } }));
// }


export default async function Post({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const areaServedData = ((await findData({ db_name: 'allamericanhaulin', co_name: 'locations', filter: {}, options: { projection: { _id: 1, name: 1 } } })) as Pick<City, '_id' | 'name'>[]);
  const servicesData = ((await findData({ db_name: 'allamericanhaulin', co_name: 'services', filter: {}, options: {} })) as Service[]);
  const service = servicesData.filter(v => v._id === serviceId).map(v => v)[0];
  const relevantServices = servicesData.map((v) => ({ _id: v._id, title: v.title }));
  const relevantServiceIds = relevantServices.map(v => v._id);
  const relevantServiceTitles = relevantServices.map(v => v.title);
  let relatedServiceId = relevantServiceIds[0];
  let relatedServiceTitle = relevantServiceTitles[0];
  const nServices = relevantServiceIds.length - 1;
  for (const ii of relevantServiceIds) {
    if (ii === serviceId) {
      const index = relevantServiceIds.indexOf(ii);
      if (index !== nServices) {
        relatedServiceId = relevantServiceIds[index + 1];
        relatedServiceTitle = relevantServiceTitles[index + 1];
      }
    }
  }
  const areaServed = areaServedData.map((loc) => ({ "@type": "City", "name": loc.name }))
  const jsonLDService = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://allamericanhaulin.com/services/junk-removal/#webpage",
        "url": "https://allamericanhaulin.com/services/junk-removal/",
        "name": "Junk Removal Service in Citrus Heights, CA | All American Haulin",
        "isPartOf": {
          "@id": "https://allamericanhaulin.com/#website"
        },
        "description": `Learn about our ${service.title} service at All American Haulin. We offer fast, affordable, and reliable junk hauling for homes and businesses in Citrus Heights, Roseville, and the surrounding areas.`,
        "mainEntity": {
          "@id": "https://allamericanhaulin.com/services/junk-removal/#service"
        }
      },
      {
        "@type": "Service",
        "@id": `https://allamericanhaulin.com/services/${service._id}/#service`,
        "name": service.title,
        "serviceType": service.title,
        "description": `Our comprehensive ${service.title} service covers the hauling of junk from anywhere on your property. Our professional team does all the heavy lifting, loading, and disposal for you, ensuring a hassle-free experience.`,
        "provider": {
          "@id": "https://allamericanhaulin.com/#organization"
        },
        areaServed,
        "hasOfferCatalog": {
          "@id": "https://allamericanhaulin.com/services/#offercatalog"
        },
        "offers": {
          "@type": "Offer",
          "name": "Free Quote for Junk Removal",
          "url": "https://allamericanhaulin.com/contact/",
          "priceCurrency": "USD",
          "description": "Contact us today for a free, no-obligation, quote on our junk removal services."
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
            "name": "Services",
            "item": "https://allamericanhaulin.com/services/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Construction Debris Removal",
            "item": `https://allamericanhaulin.com/services/${service._id}/`
          }
        ]
      }
    ]
  }

  return (
    <div className="max-w-7xl w-full h-full flex flex-col gap-8 pb-8 content-center items-center justify-center justify-items-center">

      <JSONLD schemaData={jsonLDService} />

      <div className="flex flex-col h-fit lg:h-[25rem] relative w-full gap-4 content-center items-center justify-center justify-items-center overflow-hidden border-b border-gray-300 rounded-b-lg">
        <Image
          src="/images/hotlink-ok/truck.png"
          alt="All American Haulin Truck."
          fill={true}
          sizes="1000px 500px"
          style={{ objectFit: "cover", opacity: 1 }}
          priority={true}
          loading="eager"
          rel="preload"
        />
      </div>
      <div className={`leading-[2rem] w-full h-full px-2 gap-8 columns-1 lg:columns-2 xl:px-0`} style={{ columnFill: 'balance' }}>
        <h1 className="pb-8 text-2xl font-semibold md:text-3xl">
          {service.title}
        </h1>
        {service.text.map((v, i) => (
          <div key={`par-${i}`} className={`${((v.title === '') && (v.text[0] === '')) ? 'hidden' : 'flex flex-col gap-4 pb-4 text-left content-center items-center justify-center justify-items-center w-full lg:gap-8 lg:pb-10'}`}>
            <h2 className={`${v.title === '' ? 'hidden' : 'font-semibold w-full text-2xl md:text-3xl'}`}>
              {v.title}
            </h2>
            {((!!v?.text) && (v.text instanceof Array) && v.text[0] !== '') && ((v.text.length > 1) ?
              <ul className="w-full list-disc list-outside pl-6" >
                {
                  v.text.map(e => (
                    <li key={e}>
                      {e}
                    </li>
                  ))
                }
              </ul> :
              <p className="w-full">
                {v.text[0]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-4xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center">
        <Link href={`/services/${relatedServiceId}`} className="text-center text-white bg-red-600 py-2 px-3 w-full h-full border border-gray-300 rounded-lg shadow-md ease-in-out duration-100 hover:scale-101 truncate hover:bg-red-400 active:bg-red-900">
          {relatedServiceTitle}
        </Link>
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
