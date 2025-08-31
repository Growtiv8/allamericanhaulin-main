"use server";
import "server-only";
import { headers } from "next/headers";
import { verifyHuman } from "@/lib/cloudflare";


export async function contactFormTurnstile(token: string) {
  let isHuman = false;
  try {
    const { CLOUDFLARE_TURNSTILE_CONTACT_FORM_SECRET_KEY: secret } = process.env;
    const ip = (await headers()).get('cf-connecting-ip') ?? '';
    isHuman = await verifyHuman({ secret, token, ip });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occured.')
    }
    isHuman = false;
  }
  return isHuman;
}

export async function calendarFormTurnstile(token: string) {
  let isHuman = false;
  try {
    const { CLOUDFLARE_TURNSTILE_CALENDAR_FORM_SECRET_KEY: secret } = process.env;
    const ip = (await headers()).get('cf-connecting-ip') ?? '';
    isHuman = await verifyHuman({ secret, token, ip });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occured.')
    }
    isHuman = false;
  }
  return isHuman;
}
