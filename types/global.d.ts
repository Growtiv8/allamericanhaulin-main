
declare global {
  interface Window {
    gtag: (arg0: string, arg1: string) => void,
    Termly: any
  }
  interface SocialMedia {
    _id: string,
    name: string,
    href: string,
    icon: Binary
  }
  interface Photo {
    _id: string,
    title: string,
    before: {
      photo: string,
      alt: string
    },
    after: {
      photo: string,
      alt: string
    }
  }
  interface Review {
    _id: string,
    name: string,
    rating: string,
    review: string,
    date: string
  }
  interface Member {
    _id: string,
    name: string,
    role: string,
    photo: string,
    alt: string,
    bio: string,
    email: string,
    phone: string,
    socialMedia: {
      linkedin: string
    }
  }
  interface Post {
    _id: string,
    title: string,
    description: string,
    date: Date,
    text: {
      title: string,
      text: string[]
    }[],
  }
  interface City {
    _id: string,
    name: string,
    text: {
      title: string,
      text: strng[]
    }[]
  }
  interface Page {
    name: string,
    href: string
  }
  interface Junk {
    _id: string,
    photo: string,
    alt: string,
    title: string,
    description: string
  }
  interface Service {
    _id: string,
    title: string,
    description: string,
    text: {
      title: string,
      text: string[]
    }[]
  }
  namespace NodeJS {
    interface ProcessEnv {
      GA4_API_KEY: string,
      GA4_MEASUREMENT_ID: string,
      CLOUDFLARE_TURNSTILE_CONTACT_FORM_SECRET_KEY: string,
      CLOUDFLARE_TURNSTILE_CALENDAR_FORM_SECRET_KEY: string,
      GOOGLE_USERNAME: string,
      GOOGLE_CLIENT_NAME: string,
      GOOGLE_CLIENT_ID: string,
      GOOGLE_CLIENT_SECRET: string,
      GOOGLE_USERNAME: string,
      GOOGLE_EMAIL_REFRESH_TOKEN: string,
      GOOGLE_CALENDAR_REFRESH_TOKEN: string,
      TEST_SECRET: string,
      GHL_API_KEY: string,
      GHL_LOCATION_ID: string,
      GHL_USER_ID?: string
    }
  }
}

export { }; // Ensure this is a module
