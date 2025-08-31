"use server";
import "server-only";


export default async function Recycling({ locationName }: { locationName: string }) {
  return (
    <div className="w-full flex flex-col gap-4 content-center items-center justify-center justify-items-center">
      <div className="w-full h-full columns columns-1 gap-y-4 gap-x-4 sm:columns-2 lg:columns-3">
        <p className="w-full h-full pb-4">
          {`
          All American Haulin is a locally owned and environmentally conscious junk removal company serving ${locationName} and surrounding areas. \
          We understand that when you're clearing out unwanted items, you also care about what happens to them. \
          That's why we go beyond simply hauling your junk away; we're deeply committed to practices that minimize landfill waste and benefit our shared environment. \
          Our team believes in responsible disposal, which means looking for opportunities to give items a second chance and ensuring that recyclable materials are handled correctly.
        `}
        </p>
        <p className="w-full h-full pb-4">
          {`
          A significant part of our eco-friendly strategy involves a thoughtful approach to repurposing. \
          When we collect your old furniture, household goods, or other items, we carefully identify those that are still in usable condition. \
          These items are then directed towards local charities and non-profit organizations where they can find a new home and serve someone else in the community. \
          This not only prevents perfectly good items from ending up in a landfill but also supports the valuable work of these local groups, extending the life of the goods and fostering a cycle of giving.
        `}
        </p>
        <p className="w-full h-full pb-4">
          {`
          Beyond repurposing, diligent recycling is a cornerstone of our junk removal services. \
          We take the time to sort through the materials we collect, separating out valuable recyclables such as metals, plastics, paper, cardboard, and other salvageable components. \
          By partnering with certified recycling facilities, All American Haulin ensures that these materials are processed properly, conserving natural resources and reducing the overall environmental impact of junk disposal. \
          When you choose us, you're not just clearing out your space; you're also making a positive choice for the planet and supporting a local business dedicated to sustainable practices.
        `}
        </p>
      </div>
    </div>
  )
}