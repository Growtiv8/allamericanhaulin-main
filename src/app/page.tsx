"use server";
import "server-only";
import JSONLD from "@/components/json-ld";
import Container from "@/components/container";
import Landing from "@/components/landing";
import { officeAddress, phoneNumber } from "@/constants/contact-info";
import { headers } from "next/headers";
import { findData } from "@/dal/mongodb";
// import fs from "fs";


export async function generateMetadata() {
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: `All American Haulin | Best Junk Removal Service.`,
    description: "All American Haulin offers fast, friendly, and reliable junk removal and hauling services for homes and businesses in Citrus Heights, CA, and surrounding areas. We handle everything from furniture and appliance removal to construction debris and full property cleanouts.",
    alternates: {
      canonical: "/"
    },
    openGraph: {
      title: `All American Haulin | Best Junk Removal Service.`,
      description: "All American Haulin offers fast, friendly, and reliable junk removal and hauling services for homes and businesses in Citrus Heights, CA, and surrounding areas. We handle everything from furniture and appliance removal to construction debris and full property cleanouts.",
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

export default async function Home() {

  // const path = process.cwd() + "/public/desktop-computer.jpg";
  // const imageBuffer = fs.readFileSync(path);
  // const base64String = imageBuffer.toString('base64');
  // console.log(base64String);

  const servicesData = (await findData({ db_name: "allamericanhaulin", co_name: "services", filter: {}, options: { projection: { _id: 1, name: 1 } } })) as Pick<Service, '_id' | 'title'>[]
  const socialMediaData = (await findData({ db_name: "allamericanhaulin", co_name: "social-media", filter: {}, options: {} })) as SocialMedia[]
  const serviceAreaData = (await findData({ db_name: "allamericanhaulin", co_name: "locations", filter: {}, options: { projection: { _id: 1, name: 1 } } })) as Pick<City, '_id' | 'name'>[]

  const sameAs = socialMediaData.map(v => v.href)
  const areaServed = serviceAreaData.map((loc) => ({
    "@type": "City",
    "name": loc.name
  }))
  const services = servicesData.map((serv) => ({
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": serv.title,
      "url": `https://allamericanhaulin.com/services/${serv._id}`
    }
  }))

  const jsonLDHomeAndConstructionBusiness = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "name": "All American Haulin",
        "@id": "https://allamericanhaulin.com/#organization",
        "url": "https://allamericanhaulin.com/",
        "telephone": phoneNumber,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": officeAddress.city,
          "addressRegion": officeAddress.state,
          "postalCode": officeAddress.zip,
          "addressCountry": officeAddress.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 38.6946,
          "longitude": -121.2845
        },
        "logo": "https://allamericanhaulin.com/icons/icon.svg",
        "image": "https://allamericanhaulin.com/images/truck.png",
        "description": "All American Haulin offers fast, friendly, and reliable junk removal and hauling services for homes and businesses in Citrus Heights, CA, and surrounding areas. We handle everything from furniture and appliance removal to construction debris and full property cleanouts.",
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
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Junk Removal Services",
          "itemListElement": services
        },
        areaServed,
        "sameAs": sameAs
      },
      {
        "@type": "WebSite",
        "@id": "https://allamericanhaulin.com/#website",
        "url": "https://allamericanhaulin.com/",
        "name": "All American Haulin",
        "publisher": {
          "@id": "https://allamericanhaulin.com/#organization"
        },
        "inLanguage": "en-US"
      }
    ]
  }

  const headersList = await headers();

  const city = headersList.get('cf-ipcity')?.toLowerCase() ?? "";
  const locationName = serviceAreaData.map(v => v.name).filter(v => v.toLowerCase() === city.toLowerCase())[0] ?? "Citrus Heights"

  return (
    <Container >

      <div className="w-full h-full flex flex-col gap-16 pb-16 content-center items-center justify-center justify-items-center md:gap-32 md:pb-32">

        <JSONLD schemaData={jsonLDHomeAndConstructionBusiness} />

        <Landing locationName={locationName} phoneNumber={phoneNumber} />

      </div>
    </Container>
  );
}
