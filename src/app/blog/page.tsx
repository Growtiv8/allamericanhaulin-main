"use server";
import "server-only";
import { findData } from "@/dal/mongodb";
import JSONLD from "@/components/json-ld";
import Link from "next/link";


export async function generateMetadata() {
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: `All American Haulin | Blog of the Best Junk Removal Company in Citrus Heights and Surrounding Areas`,
    description: `Learn more about junk removal in Citrus Heights, CA, and surrounding areas.`,
    alternates: {
      canonical: `/blog`
    },
    openGraph: {
      title: `All American Haulin | Blog of the Best Junk Removal Company in Citrus Heights and Surrounding Areas`,
      description: `Learn more about junk removal in Citrus Heights, CA, and surrounding areas.`,
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
//   const serviceParams = { db_name: 'allamericanhaulin', co_name: 'services', filter: {}, options: {} };
//   const services = (await findData(serviceParams)) as City[];
//   return services.map(v => ({ params: { serviceId: v._id } }));
// }

export default async function Results() {
  const dataParams = { db_name: 'allamericanhaulin', co_name: 'posts', filter: {}, options: {} }
  const posts = (await findData(dataParams)) as Post[];

  const blogPost = posts.map((post) => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "url": `https://allamericanhaulin.com/blog/${post._id}/`,
    "@id": `https://allamericanhaulin.com/blog/${post._id}/#article`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@id": "https://allamericanhaulin.com/#organization"
    },
    "publisher": {
      "@id": "https://allamericanhaulin.com/#organization"
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://allamericanhaulin.com/images/hotlink-ok/all-american-haulin.png"
    },
    "description": post.description
  }))
  const jsonLDBlog = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://allamericanhaulin.com/blog/#blog",
        "url": "https://allamericanhaulin.com/blog/",
        "name": "The All American Haulin' Junk Removal Blog",
        "description": "Your go-to resource for decluttering tips, recycling information, and local guides from the junk removal experts at All American Haulin in Citrus Heights, CA.",
        "publisher": {
          "@id": "https://allamericanhaulin.com/#organization"
        },
        "inLanguage": "en-US",
        blogPost
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
            "name": "Blog",
            "item": "https://allamericanhaulin.com/blog/"
          }
        ]
      }
    ]
  }

  return (
    <div className="w-full h-full flex flex-col gap-16 py-16 content-center items-center justify-center justify-items-center md:gap-32 md:py-32">

      <JSONLD schemaData={jsonLDBlog} />

      <div className="max-w-4xl w-full h-full px-2 gap-4 flex flex-col content-center items-center justify-center justify-items-center text-center">
        <h1 className="w-full h-full font-semibold leading-tight inline text-3xl md:text-4xl md:text-shadow-lg lg:text-5xl">
          {`Blog`}
        </h1>
        <h2>
          {`Expert advice, tips, and guides on`}
          <br />
          {`junk removal, property cleanouts, and responsible disposal in`}
          <br />
          {`Citrus Heights, CA, area`}
        </h2>
      </div>
      <div className="max-w-7xl w-full h-full px-2">
        <div className="w-full h-full flex flex-row flex-wrap content-center items-center justify-center justify-items-center gap-6 md:gap-12">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post._id}`} className="w-[24.3rem] h-[10rem] ease-in-out duration-100 hover:scale-101 overflow-hidden border border-gray-300 rounded-lg shadow-md flex flex-col lg:flex-row">
              <div className="w-full h-full p-2 flex flex-col gap-4 md:p-4">
                <div className="w-full h-full flex flex-col gap-2">
                  <h3 className="line-clamp-2 font-bold ">
                    {post.title}
                  </h3>
                  <h4 className="line-clamp-3 text-sm ">
                    {post.description}
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
