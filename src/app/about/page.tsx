"use server";
import "server-only";
import "@/lib/string-methods";
import Founders from "@/components/founders";
import { officeAddress } from "@/constants/contact-info";
import Reviews from "@/components/reviews";
import { findData } from "@/dal/mongodb";
import { format } from "date-fns";
import JSONLD from "@/components/json-ld";
import Link from "next/link";


export async function generateMetadata() {
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: "About All American Haulin | Our Story & Values",
    description: "Learn about the story behind All American Haulin, our commitment to the Citrus Heights community, and the local team dedicated to providing honest, reliable junk removal services.",
    alternates: {
      canonical: `/about`
    },
    openGraph: {
      title: "About All American Haulin | Our Story & Values",
      description: "Learn about the story behind All American Haulin, our commitment to the Citrus Heights community, and the local team dedicated to providing honest, reliable junk removal services.",
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

export default async function Page() {
  const reviews = ((await findData({ db_name: "allamericanhaulin", co_name: "reviews", filter: {}, options: {} })) as Review[]).sort((a, b) => b.date.localeCompare(a.date)).map(v => ({ ...v, date: format(new Date(v.date), 'MMM d, yyy') }));
  const teamData = (await findData({ db_name: "allamericanhaulin", co_name: "team", filter: {}, options: {} })) as Member[]

  const founder = teamData.map((person) => ({
    "@type": "Person",
    "name": person.name,
    "jobTitle": "Founder & Owner",
    "image": `https://allamericanhaulin.com/images/hotlink-ok/${person.name.toLowerCase().replace(/\s/g, '-')}.jpg`,
    "description": person.bio,
  }))
  const jsonLDAboutPage = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://allamericanhaulin.com/about/#webpage",
        "url": "https://allamericanhaulin.com/about/",
        "name": "About All American Haulin | Our Story & Values",
        "isPartOf": {
          "@id": "https://allamericanhaulin.com/#website"
        },
        "description": "Learn about the story behind All American Haulin, our commitment to the Citrus Heights community, and the local team dedicated to providing honest, reliable junk removal services.",
        "mainEntity": {
          "@id": "https://allamericanhaulin.com/#organization"
        }
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://allamericanhaulin.com/#organization",
        "name": "All American Haulin",
        "url": "https://allamericanhaulin.com/",
        "description": "All American Haulin is a locally-owned and operated junk removal business founded on the principles of hard work, integrity, and exceptional customer service.",
        founder,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": officeAddress.city,
          "addressRegion": officeAddress.state,
          "postalCode": officeAddress.zip,
          "addressCountry": officeAddress.country
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
            "name": "About",
            "item": "https://allamericanhaulin.com/about/"
          }
        ]
      }
    ]
  }

  return (
    <div className="w-full h-full flex flex-col gap-16 py-16 content-center items-center justify-center justify-items-center md:gap-32 md:py-32">

      <JSONLD schemaData={jsonLDAboutPage} />

      <div className="max-w-7xl w-full h-full flex flex-col gap-16 content-center items-center justify-center justify-items-center md:gap-32 lg:flex-row lg:items-start lg:gap-8">
        <div className="max-w-2xl p-2 w-full flex flex-col gap-4 content-center items-center justify-center justify-items-center md:gap-12">
          <h2 className="w-full font-bold text-shadow-lg text-4xl text-center md:text-5xl">
            Meet the Founders
          </h2>
          <Founders />
        </div>

        <div className="max-w-4xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center">
          <h2 className="w-full h-full font-semibold leading-tight inline text-center text-3xl md:text-4xl md:text-shadow-md lg:text-5xl">
            Customer Reviews
          </h2>
          <Reviews data={reviews} />
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
