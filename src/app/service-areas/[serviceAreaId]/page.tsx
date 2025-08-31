"use server";
import "server-only"
import "@localwebleads/string-methods";
import Image from "next/image";
import { findData } from "@/dal/mongodb";
import Link from "next/link";
import JSONLD from "@/components/json-ld";


export async function generateMetadata({ params }: { params: Promise<{ serviceAreaId: string }> }) {
  const { serviceAreaId } = await params;
  const dataParams = { db_name: 'allamericanhaulin', co_name: 'locations', filter: { _id: serviceAreaId }, options: {} };
  const serviceArea = ((await findData(dataParams)) as City[])[0];
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: `Junk Removal in ${serviceArea.name}, CA | All American Haulin`,
    description: `Need fast and reliable junk removal in ${serviceArea.name}? All American Haulin is your local solution for hauling furniture, appliances, construction debris, and more right here in ${serviceArea.name}, CA.`,
    alternates: {
      canonical: `/service-areas/${serviceAreaId}`
    },
    openGraph: {
      title: `Junk Removal in ${serviceArea.name}, CA | All American Haulin`,
      description: `Need fast and reliable junk removal in ${serviceArea.name}? All American Haulin is your local solution for hauling furniture, appliances, construction debris, and more right here in ${serviceArea.name}, CA.`,
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
//   const postParams = { db_name: 'allamericanhaulin', co_name: 'posts', filter: {}, options: {} };
//   const posts = (await findData(postParams)) as Post[];
//   return posts.map(v => ({ params: { postId: v._id } }));
// }



export default async function Page({ params }: { params: Promise<{ serviceAreaId: string }> }) {
  const { serviceAreaId } = await params;
  const serviceAreaData = ((await findData({ db_name: 'allamericanhaulin', co_name: 'locations', filter: {}, options: {} })) as City[]);
  const serviceArea = serviceAreaData.filter(v => v._id === serviceAreaId).map(v => v)[0];
  const relevantServiceAreas = serviceAreaData.map((v) => ({ _id: v._id, name: v.name }));
  const relevantServiceAreaIds = relevantServiceAreas.map(v => v._id);
  const relevantServiceAreaTitles = relevantServiceAreas.map(v => v.name);
  let relatedServiceAreaId = relevantServiceAreaIds[0];
  let relatedServiceAreaTitle = relevantServiceAreaTitles[0];
  const nServices = relevantServiceAreaIds.length - 1;
  for (const ii of relevantServiceAreaIds) {
    if (ii === serviceAreaId) {
      const index = relevantServiceAreaIds.indexOf(ii);
      if (index !== nServices) {
        relatedServiceAreaId = relevantServiceAreaIds[index + 1];
        relatedServiceAreaTitle = relevantServiceAreaTitles[index + 1];
      }
    }
  }

  const jsonLDServiceArea = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://allamericanhaulin.com/service-areas/${serviceArea._id}/#webpage`,
        "url": `https://allamericanhaulin.com/service-areas/${serviceArea._id}/`,
        "name": `Junk Removal in ${serviceArea.name}, CA | All American Haulin`,
        "isPartOf": {
          "@id": "https://allamericanhaulin.com/#website"
        },
        "description": `Need fast and reliable junk removal in ${serviceArea.name}? All American Haulin is your local solution for hauling furniture, appliances, construction debris, and more right here in ${serviceArea.name}, CA.`,
        "mainEntity": {
          "@id": `https://allamericanhaulin.com/service-areas/${serviceArea._id}/#service`
        }
      },
      {
        "@type": "Service",
        "@id": `https://allamericanhaulin.com/service-areas/${serviceArea._id}/#service`,
        "name": `Junk Removal in ${serviceArea.name}`,
        "serviceType": "Local Junk Removal Service",
        "description": `All American Haulin offers top-rated junk removal services for residents and businesses throughout ${serviceArea.name}. From homes near the Sunrise Mall to businesses on Greenback Lane, our local team provides fast, professional service.`,
        "provider": {
          "@id": "https://allamericanhaulin.com/#organization"
        },
        "areaServed": {
          "@type": "City",
          "name": serviceArea.name,
        },
        "offers": {
          "@type": "Offer",
          "name": `Free Quote for ${serviceArea.name} Junk Removal`,
          "url": "https://allamericanhaulin.com/contact/",
          "priceCurrency": "USD",
          "description": `Get a free, no-obligation quote for your junk removal project in ${serviceArea.name}.`
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": serviceArea.name,
            "item": `https://allamericanhaulin.com/service-areas/${serviceArea._id}/`
          }
        ]
      }
    ]
  }

  return (
    <div className="max-w-7xl w-full h-full flex flex-col gap-8 pb-8 content-center items-center justify-center justify-items-center">

      <JSONLD schemaData={jsonLDServiceArea} />

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
          {serviceArea.name}
        </h1>
        {serviceArea.text.map((v, i) => (
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
        <Link href={`/service-areas/${relatedServiceAreaId}`} className="text-center text-white bg-red-600 py-2 px-3 w-full h-full border border-gray-300 rounded-lg shadow-md ease-in-out duration-100 hover:scale-101 truncate hover:bg-red-400 active:bg-red-900">
          {`Check out Our Services in ${relatedServiceAreaTitle}`}
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