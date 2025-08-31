"use server";
import "server-only";


export default async function Services({ locationName }: { locationName: string }) {
  const services = [
    "Junk Removal",
    "Furniture Removal",
    "Appliance Removal",
    "Mattress Removal",
    "Property Cleanouts",
    "Debris Removal",
    "Construction Debris Removal",
    "Dump Runs Trash Outs",
    "Eviction Cleanouts",
    "Estate Cleanouts",
    "Hoarder Cleanouts",
    "Garage Cleanouts",
    "Shed Demolition & Removal",
    "Hot Tub Demolition & Removal"
  ];
  return (
    <div className="w-full flex flex-col gap-4 content-center items-center justify-center justify-items-center">
      <div className="w-full flex flex-col gap-4 content-center items-center justify-center justify-items-center">
        <div className="w-full h-full columns columns-1 gap-y-4 gap-x-4 sm:columns-2 lg:columns-3">
          <p className="w-full h-full pb-4">
            {`
          Hey ${locationName}! Let's be real - life happens, and sometimes 'stuff' just accoumulates right here in our ${locationName} homes and businesses. \
          Before you know it, that spare room, garage, or backyard project can start to feel a little (or a lot!) overwhelming. \
          If you're nodding along, thinking about that old couch, the broken appliance, or the mountain of boxes you meant to deal with, take a deep breath. \
          You're not alone, and the good news is, there's an easy solution for junk removal in ${locationName}!
        `}
          </p>
          <p className="w-full h-full pb-4">
            {`
          Meet All American Haulin - your friendly, neighborhood experts for junk removal services serving ${locationName} and the greater Sacramento area. \
          We're not just any hauling company; we're a locally owned and woman-owned business that genuinely cares about our community and our planet. \
          We believe that getting rid of unwanted items shouldn't be a headache for you, or for Mother Earth. \
          That's why we’re committed to environmentally conscious disposal practices with all our junk removal services, recycling and donating whenever possible.
        `}
          </p>
          <p className="w-full h-full pb-4">
            {`
          So, what kind of 'stuff' can our junk removal services in ${locationName} help you with? \
          Pretty much anything that's cluttering up your life! No junk removal job is too big or too small for our team. \
          Whether it's a single bulky item or a full-scale cleanout, All American Haulin is ready to help you reclaim your space and your peace of mind. \
          We know that dealing with junk can be stressful, whether you're moving, renovating, or just trying to declutter your ${locationName} home or business. \
          Our goal is to make the junk removal process as smooth and stress-free as possible.
        `}
          </p>
        </div>
      </div>
      <ul className="max-w-3xl w-full list-disc list-inside columns columns-1 gap-4 sm:columns-2" >
        {services.map((service) => (
          <li key={service} className="py-1">
            {service}
          </li>
        ))}
        <li>
          and more ...
        </li>
      </ul>
    </div>
  )
}