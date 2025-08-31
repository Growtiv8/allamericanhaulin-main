"use server";
import "server-only";
import { addEvent } from "@/dal/google-calendar";
import { sendEmail } from "@/dal/google-email";
import { calendarFormTurnstile, contactFormTurnstile } from "@/dal/cf-turnstile";
import { createGHLContact, createGHLAppointment } from "@/dal/gohighlevel";


export async function handleCalendarFormSubmit(formData: FormData) {
  try {
    const token = formData.get("cf-turnstile-response")?.toString();
    const firstName = formData.get("calendar-form-first-name")?.toString();
    const lastName = formData.get("calendar-form-last-name")?.toString();
    const email = formData.get("calendar-form-email")?.toString();
    const phone = formData.get("calendar-form-phone")?.toString();
    const message = formData.get("calendar-form-message")?.toString();
    const datetime = formData.get("calendar-form-appointment")?.toString();
    if (!!token && !!firstName && !!lastName && !!email && !!phone && !!message && !!datetime) {
      const isHuman = await calendarFormTurnstile(token);
      if (isHuman) {
        // Create appointment in Google Calendar
        await addEvent({ firstName, lastName, email, phone, message, datetime });
        
        // Send email notification
        await sendEmail({ to: "allamericanhaulin@gmail.com", subject: "Calendar Form Submitted", data: { firstName, lastName, email, phone, message } });
        
        // Create contact and appointment in Go High Level
        const ghlResult = await createGHLAppointment({
          firstName,
          lastName,
          email,
          phone,
          message,
          datetime
        });
        
        if (!ghlResult.success) {
          console.error('Failed to create GHL appointment:', ghlResult.error);
          // Don't fail the entire process if GHL fails
        }
      } else {
        throw new Error('Unable to book appointment.');
      }
    } else {
      throw new Error('Unable to book appointment.');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occured.');
    }
  }
}

export async function handleContactFormSubmit(formData: FormData) {
  try {
    const token = formData.get("cf-turnstile-response")?.toString();
    const firstName = formData.get("contact-form-first-name")?.toString();
    const lastName = formData.get("contact-form-last-name")?.toString();
    const email = formData.get("contact-form-email")?.toString();
    const phone = formData.get("contact-form-phone")?.toString();
    const message = formData.get("contact-form-message")?.toString();
    if (!!token && !!firstName && !!lastName && !!email && !!phone && !!message) {
      const isHuman = await contactFormTurnstile(token);
      if (isHuman) {
        // Send email notification
        await sendEmail({ to: "allamericanhaulin@gmail.com", subject: "Contact Form Submitted", data: { firstName, lastName, email, phone, message } });
        
        // Create contact in Go High Level
        const ghlResult = await createGHLContact({
          firstName,
          lastName,
          email,
          phone,
          message,
          source: 'Website Contact Form',
          tags: ['Website Lead', 'Junk Hauling', 'Contact Form']
        });
        
        if (!ghlResult.success) {
          console.error('Failed to create GHL contact:', ghlResult.error);
          // Don't fail the entire process if GHL fails
        }
      } else {
        throw new Error('Unable to send contact form.');
      }
    } else {
      throw new Error('Unable to send contact form.');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occured.');
    }
  }
}
