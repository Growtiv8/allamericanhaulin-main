"use server";
import "server-only";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { v7 as uuidv7 } from "uuid";
import { cookies } from "next/headers";
import { cookieParamsUserId } from "@/constants/cookie-params-user-id";
import Script from "next/script";
import ClientWrapper from "@/components/client-wrapper";


const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap"
});

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://allamericanhaulin.com'),
    alternates: {
      canonical: "/"
    },
    icons: {
      icon: [
        {
          url: "/icon.svg",
          type: "image/svg+xml",
          sizes: "any",
          as: "image"
        }
      ],
      apple: [
        {
          url: "/icon.svg",
          type: "image/svg+xml",
          sizes: "any",
          as: "image"
        }
      ]
    }
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (process.env.NODE_ENV === 'production') {
    console.error = () => { };
    console.log = () => { };
  }
  let USER_ID = (await cookies()).get(cookieParamsUserId.name)?.value;
  if (!USER_ID) {
    USER_ID = uuidv7();
  }
  return (
    <html lang="en" className={`${poppins.className}`}>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <head>
        <Script
          id="cloudflare-turnstile"
          type="text/javascript"
          strategy="beforeInteractive"
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          data-category="essential"
          defer
        />
        <Script
          id="google-tag-manager"
          type="text/javascript"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-19DH48XBKZ"
          data-categories="analytics"
          defer
        />
        <Script
          id="google-analytics"
          type="text/javascript"
          strategy="afterInteractive"
          data-categories="analytics"
          defer
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-19DH48XBKZ', {
              'user_id': '${USER_ID}'
            });
            gtag('config', 'AW-16617899328', {
              'user_id': '${USER_ID}'
            });
            gtag('config', 'AW-16617899328/yMsCCN_9zd0aEMCKhPQ9', {
              'phone_conversion_number': '916-244-5582'
            });
          `}
        </Script>
      </head>
      <body className="max-w-full w-screen h-full text-base md:text-lg lg:text-xl">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
