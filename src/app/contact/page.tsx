"use server";
import "server-only";
import "@localwebleads/string-methods";
import Image from "next/image";
import Phone from "@/components/phone";
import { officeAddress, phoneNumber } from "@/constants/contact-info";
import JSONLD from "@/components/json-ld";
import ContactForm from "@/components/contact-form";


export async function generateMetadata() {
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: "Contact All American Haulin | Free Junk Removal Quotes",
    description: "Get in touch with All American Haulin for a free, no-obligation quote. Contact us by phone or submit a contact form on our website. We proudly serve Citrus Heights and the greater Sacramento area.",
    alternates: {
      canonical: `/contact`
    },
    openGraph: {
      title: "Contact All American Haulin | Free Junk Removal Quotes",
      description: "Get in touch with All American Haulin for a free, no-obligation quote. Contact us by phone or submit a contact form on our website. We proudly serve Citrus Heights and the greater Sacramento area.",
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

  const jsonLDContactPage = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://allamericanhaulin.com/contact/#webpage",
        "url": "https://allamericanhaulin.com/contact/",
        "name": "Contact All American Haulin | Free Junk Removal Quotes",
        "isPartOf": {
          "@id": "https://allamericanhaulin.com/#website"
        },
        "description": "Get in touch with All American Haulin for a free, no-obligation quote. Contact us by phone or submit a contact form on our website. We proudly serve Citrus Heights and the greater Sacramento area.",
        "mainEntity": {
          "@id": "https://allamericanhaulin.com/#organization"
        }
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://allamericanhaulin.com/#organization",
        "name": "All American Haulin",
        "url": "https://allamericanhaulin.com/",
        "telephone": phoneNumber,
        "email": "contact@allamericanhaulin.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": officeAddress.city,
          "addressRegion": officeAddress.state,
          "postalCode": officeAddress.zip,
          "addressCountry": officeAddress.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 38.6942,
          "longitude": -121.2644
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "00:00",
            "closes": "24:00"
          }
        ]
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
            "name": "Contact",
            "item": "https://allamericanhaulin.com/contact/"
          }
        ]
      }
    ]
  }

  return (
    <div className="w-full h-full flex flex-col gap-16 content-center items-center justify-center justify-items-center md:gap-32 ">

      <JSONLD schemaData={jsonLDContactPage} />

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
          <div className="relative px-2 max-w-md w-full flex flex-col gap-8 content-center items-center justify-center justify-items-center  ">
            {/** Headline */}
            <div className="relative w-full h-full text-left flex flex-col content-center items-center justify-center justify-items-center gap-4 md:gap-12 ">
              <h1 className="w-full h-full font-bold leading-tight inline text-white text-left text-3xl md:text-4xl md:text-shadow-lg lg:text-5xl">
                {`Contact Us`}
              </h1>
              <div className="w-full h-full gap-4 flex flex-col content-center items-center justify-center justify-items-center text-left">
                <p className="w-full h-full text-white text-2xl font-bold">
                  {`Call or Text`}
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


    </div>
  )
}