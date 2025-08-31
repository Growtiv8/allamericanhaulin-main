"use server";
import "server-only";
import { googleEmail } from "@/lib/google";


export async function sendEmail({ to, subject, data }: { to?: string, subject: string, data: { firstName?: string, lastName?: string, email?: string, phone?: string, organization?: string, city?: string, state?: string, message?: string, passcode?: string } }) {
  try {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_EMAIL_REFRESH_TOKEN, GOOGLE_USERNAME } = process.env;
    await googleEmail({
      data,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_EMAIL_REFRESH_TOKEN,
      subject,
      from: GOOGLE_USERNAME,
      to: to ?? GOOGLE_USERNAME
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occured.');
    }
  }
}
