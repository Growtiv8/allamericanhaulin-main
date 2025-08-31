export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/api/', '/fonts/'],
      }
    ],
    sitemap: 'https://allamericanhaulin.com/sitemap.xml',
  }
}