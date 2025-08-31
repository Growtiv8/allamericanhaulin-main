"use server";
import "server-only";
import { findData } from "@/dal/mongodb";
import FounderBio from "./founder-bio";

export default async function Founders() {
  const team = ((await findData({
    db_name: "allamericanhaulin",
    co_name: "team",
    filter: {},
    options: {}
  })) as Member[]).map(v => ({ ...v, photo: String(Buffer.from(v.photo, 'base64')) })).sort((a, b) => a.name.localeCompare(b.name))

  const linkedinIcon = ((await findData({
    db_name: "bizlink",
    co_name: "social-media",
    filter: { name: "LinkedIn" },
    options: {}
  })) as SocialMedia[]).map(v => ({ ...v, icon: String(Buffer.from(v.icon, 'base64')) }))[0];

  return (
    <div className="z-50 w-full h-full flex flex-col gap-8 content-center items-center justify-center justify-items-center">
      <div className="w-fit flex flex-col gap-8 content-center items-center justify-center justify-items-center md:flex-row">
        {team.map((person) => (
          <FounderBio key={person._id} person={person} linkedinIconString={linkedinIcon.icon} />
        ))}
      </div>
      <div className="w-full">
        {`Christina DeCelle and Dylan Dudley are the co-founders of All American Haulin. All American Haulin takes pride in delivering fast, reliable, and stress-free service. We are licensed and insured, offer affordable and transparent pricing (no hidden fees), and environmentally conscious.`}
      </div>
    </div>
  )
}