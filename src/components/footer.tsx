"use server";
import "server-only";
import Link from "next/link";
import { ReactNode } from "react";
import { findData } from "@/dal/mongodb";
import Image from "next/image";



const websiteName = "All American Haulin";
const designedAndPoweredBy = { name: "Beacon Dashboards LLC", url: "https://beacondashboards.com" };

export default async function Footer(): Promise<ReactNode> {

  const socialMedia = await findData({
    db_name: "allamericanhaulin",
    co_name: "social-media",
    filter: {},
    options: {}
  }) as SocialMedia[];

  const policies = {
    main: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
      { name: 'Terms of Service', href: 'terms-of-service' }
    ]
  };

  return (
    <div className=" w-full h-fit ">
      <footer className="text-white bg-blue-600 w-full h-fit overflow-hidden flex flex-col gap-12 py-12 px-2 text-sm text-center content-center items-center justify-center justify-items-center">

        <div className="w-full h-fit flex flex-wrap gap-12 content-center items-center justify-center justify-items-center">
          {socialMedia.map((one) => (
            <Link
              key={one.name}
              href={one.href}
              target="_blank"
            >
              <Image
                alt={`Icon for ${one.name}`}
                src={`data:image/jpg;base64,${String(Buffer.from(one.icon, 'base64'))}`}
                width={32}
                height={32}
                className="object-cover ease-in-out duration-100 hover:scale-110"
                priority={true}
                loading="eager"
                rel="preload"
              />
            </Link>
          ))}
        </div>

        <div aria-label="Footer" className="w-full h-fit flex flex-wrap gap-12 content-center items-center justify-center justify-items-center">
          {policies.main.map((item) => (
            <Link key={item.name} href={item.href} target="_blank">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="w-full h-fit flex flex-wrap gap-12 content-center items-center justify-center justify-items-center">
          <Link href="/sitemap.xml" target="_blank" className="text-sm hover:text-white">
            {`Sitemap`}
          </Link>
        </div>
        <div className="w-full h-fit text-white flex gap-1 content-center items-center justify-center justify-items-center">
          <p>
            &copy;
          </p>
          <p>
            {`${(new Date(Date.now())).getFullYear().toString()} ${websiteName}. All rights reserved.`}
          </p>
        </div>
        <div className="w-full h-fit flex flex-wrap gap-12 content-center items-center justify-center justify-items-center">
          <Link href={designedAndPoweredBy.url} target="_blank" className="font-bold ease-in-out duration-100 hover:scale-101 text-shadow-lg text-white hover:text-primary-light active:text-primary-dark">
            {`Designed and powered by ${designedAndPoweredBy.name}`}
          </Link>
        </div>
      </footer>
    </div>
  )
}
