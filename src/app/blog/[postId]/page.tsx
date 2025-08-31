"use server";
import "server-only"
import Image from "next/image";
import { findData } from "@/dal/mongodb";
import Link from "next/link";
import JSONLD from "@/components/json-ld";


export async function generateMetadata({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const dataParams = { db_name: 'allamericanhaulin', co_name: 'posts', filter: { _id: postId }, options: {} };
  const service = ((await findData(dataParams)) as Service[])[0];
  const dateTime = new Date(Date.now());
  const dateTimeString = dateTime.toISOString();
  const publishedTime = dateTimeString.slice(0, dateTimeString.length - 5) + "-0000";
  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `/blog/${postId}`
    },
    openGraph: {
      title: service.title,
      description: service.description,
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

export default async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const posts = ((await findData({ db_name: 'allamericanhaulin', co_name: 'posts', filter: {}, options: {} })) as Post[]);
  const post = posts.filter(v => v._id === postId).map(v => v)[0];
  const relevantPosts = posts.map((v) => ({ _id: v._id, title: v.title }));
  const relevantPostIds = relevantPosts.map(v => v._id);
  const relevantPostTitles = relevantPosts.map(v => v.title);
  let relatedPostId = relevantPostIds[0];
  let relatedPostTitle = relevantPostTitles[0];
  const nPosts = relevantPostIds.length - 1;
  for (const ii of relevantPostIds) {
    if (ii === postId) {
      const index = relevantPostIds.indexOf(ii);
      if (index !== nPosts) {
        relatedPostId = relevantPostIds[index + 1];
        relatedPostTitle = relevantPostTitles[index + 1];
      }
    }
  }
  const jsonLDBlogPosting = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://allamericanhaulin.com/blog/${post._id}/#article`,
        "mainEntityOfPage": {
          "@id": `https://allamericanhaulin.com/blog/${post._id}/#webpage`
        },
        "headline": post.title,
        "description": post.description,
        "image": {
          "@type": "ImageObject",
          "url": "https://allamericanhaulin.com/images/hotlink-ok/all-american-haulin.png",
          "height": 300,
          "width": 300
        },
        "author": {
          "@type": "Person",
          "name": "Dylan Dudley",
          "url": "https://allamericanhaulin.com/about/"
        },
        "publisher": {
          "@id": "https://allamericanhaulin.com/#organization"
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "isPartOf": {
          "@id": "https://allamericanhaulin.com/blog/#blog"
        }
      },
      {
        "@type": "WebPage",
        "@id": `https://allamericanhaulin.com/blog/${post._id}/#webpage`,
        "url": `https://allamericanhaulin.com/blog/${post._id}/`,
        "name": post.title,
        "isPartOf": {
          "@id": "https://allamericanhaulin.com/#website"
        },
        "description": post.description
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Your Guide to Proper Item Disposal",
            "item": `https://allamericanhaulin.com/blog/${post._id}/`
          }
        ]
      }
    ]
  }

  return (
    <div className="max-w-7xl w-full h-full flex flex-col gap-8 pb-8 content-center items-center justify-center justify-items-center">

      <JSONLD schemaData={jsonLDBlogPosting} />

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
          {post.title}
        </h1>
        {post.text.map((v, i) => (
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
        <Link href={`/blog/${relatedPostId}`} className="text-center text-white bg-red-600 py-2 px-3 w-full h-full border border-gray-300 rounded-lg shadow-md ease-in-out duration-100 hover:scale-101 truncate hover:bg-red-400 active:bg-red-900">
          {relatedPostTitle}
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
