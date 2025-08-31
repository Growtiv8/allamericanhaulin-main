"use server";
import "server-only";
import { findData } from "@/dal/mongodb";


export default async function sitemap() {
  const date = new Date(Date.now());
  const serviceIds = ((await findData({ db_name: 'allamericanhaulin', co_name: 'services', filter: {}, options: { projections: { _id: 1 } } })) as Pick<Service, '_id'>[]);
  const locationIds = ((await findData({ db_name: 'allamericanhaulin', co_name: 'locations', filter: {}, options: { projections: { _id: 1 } } })) as Pick<City, '_id'>[]);
  const postIds = ((await findData({ db_name: 'allamericanhaulin', co_name: 'posts', filter: {}, options: { projections: { _id: 1 } } })) as Pick<Post, '_id'>[]);
  const servicePages = serviceIds.map((v) => ({
    url: `https://allamericanhaulin.com/services/${v._id}`,
    lastModified: date,
    changeFrequency: 'daily',
    priority: 0.4
  }));
  const locationPages = locationIds.map((v) => ({
    url: `https://allamericanhaulin.com/service-areas/${v._id}`,
    lastModified: date,
    changeFrequency: 'daily',
    priority: 0.4
  }));
  const postPages = postIds.map((v) => ({
    url: `https://allamericanhaulin.com/blog/${v._id}`,
    lastModified: date,
    changeFrequency: 'daily',
    priority: 0.4
  }));
  return [
    {
      url: 'https://allamericanhaulin.com',
      lastModified: date,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: 'https://allamericanhaulin.com/services',
      lastModified: date,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: 'https://allamericanhaulin.com/service-areas',
      lastModified: date,
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: 'https://allamericanhaulin.com/about',
      lastModified: date,
      changeFrequency: 'daily',
      priority: 0.7
    },
    {
      url: 'https://allamericanhaulin.com/contact',
      lastModified: date,
      changeFrequency: 'daily',
      priority: 0.6
    },
    {
      url: 'https://allamericanhaulin.com/blog',
      lastModified: date,
      changeFrequency: 'daily',
      priority: 0.5
    },
    ...servicePages,
    ...locationPages,
    ...postPages
  ]
}