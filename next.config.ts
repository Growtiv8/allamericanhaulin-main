import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "",
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb"
    }
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://allamericanhaulin.com"
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS"
          }
        ]
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/citrus-heights/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/fair-oaks/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/carmichael/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/roseville/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/orangevale/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/antelope/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/north-highlands/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/foothill-farms/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/la-riviera/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/west-sacramento/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/granite-bay/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/arden-arcade/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/mcclellan-park/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/sacramento/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/folsom/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/rocklin/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/rio-linda/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/rancho-cordova/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/gold-river/:path*",
        destination: "/",
        permanent: true
      },
      {
        source: "/feed/",
        destination: "/",
        permanent: true
      },
      {
        source: "/hot-tub-removal.php",
        destination: "/",
        permanent: true
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true
      },
      {
        source: "/services.php",
        destination: "/",
        permanent: true
      },
      {
        source: "/contact-us.php",
        destination: "/",
        permanent: true
      },
      {
        source: "/cdn-cgi/l/email-protection",
        destination: "/",
        permanent: true
      },
      {
        source: "/feed",
        destination: "/",
        permanent: true
      },
      {
        source: "/location",
        destination: "/",
        permanent: true
      },
      {
        source: "/shed-removal",
        destination: "/",
        permanent: true
      },
      {
        source: "/contact-us",
        destination: "/",
        permanent: true
      },
      {
        source: "/about-us",
        destination: "/",
        permanent: true
      },
      {
        source: "/property-cleanout",
        destination: "/",
        permanent: true
      },
      {
        source: "/hoarder-cleanouts",
        destination: "/",
        permanent: true
      },
      {
        source: "/hot-tub-removal",
        destination: "/",
        permanent: true
      },
      {
        source: "/about-us.php",
        destination: "/",
        permanent: true
      },
      {
        source: "/cleanouts.php",
        destination: "/",
        permanent: true
      },
      {
        source: "/junk-removal.php",
        destination: "/",
        permanent: true
      },
      {
        source: "/shed-removal.php",
        destination: "/",
        permanent: true
      },
      {
        source: "/hot-tub-removal.php",
        destination: "/",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
