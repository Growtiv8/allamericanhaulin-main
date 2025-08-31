"use server";
import "server-only";

interface GHLContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  source?: string;
  tags?: string[];
}

interface GHLAppointment extends GHLContact {
  datetime: string;
}

interface GHLResponse {
  success: boolean;
  contactId?: string;
  error?: string;
}

// Go High Level API configuration
const GHL_API_BASE_URL = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = 'v1';

/**
 * Get Go High Level API headers with authentication
 */
function getGHLHeaders(): HeadersInit {
  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) {
    throw new Error('GHL_API_KEY environment variable is not set');
  }

  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

/**
 * Create a contact in Go High Level
 */
export async function createGHLContact(contactData: GHLContact): Promise<GHLResponse> {
  try {
    const locationId = process.env.GHL_LOCATION_ID;
    if (!locationId) {
      throw new Error('GHL_LOCATION_ID environment variable is not set');
    }

    const payload = {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone,
      source: contactData.source || 'Website Contact Form',
      tags: contactData.tags || ['Website Lead', 'Junk Hauling'],
      customFields: contactData.message ? [
        {
          key: 'message',
          field_value: contactData.message
        }
      ] : []
    };

    const response = await fetch(`${GHL_API_BASE_URL}/${GHL_API_VERSION}/contacts/`, {
      method: 'POST',
      headers: getGHLHeaders(),
      body: JSON.stringify({
        ...payload,
        locationId
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('GHL API Error:', response.status, errorData);
      throw new Error(`GHL API request failed: ${response.status}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      contactId: result.contact?.id || result.id
    };

  } catch (error) {
    console.error('Error creating GHL contact:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Create an appointment/opportunity in Go High Level
 */
export async function createGHLAppointment(appointmentData: GHLAppointment): Promise<GHLResponse> {
  try {
    // First create the contact
    const contactResult = await createGHLContact({
      ...appointmentData,
      source: 'Website Appointment Form',
      tags: ['Website Lead', 'Junk Hauling', 'Appointment Scheduled']
    });

    if (!contactResult.success || !contactResult.contactId) {
      return contactResult;
    }

    const locationId = process.env.GHL_LOCATION_ID;
    if (!locationId) {
      throw new Error('GHL_LOCATION_ID environment variable is not set');
    }

    // Create appointment/opportunity
    const appointmentPayload = {
      title: `Junk Hauling Consultation - ${appointmentData.firstName} ${appointmentData.lastName}`,
      contactId: contactResult.contactId,
      locationId,
      startTime: appointmentData.datetime,
      appointmentStatus: 'confirmed',
      notes: appointmentData.message || 'Appointment scheduled through website'
    };

    const appointmentResponse = await fetch(`${GHL_API_BASE_URL}/${GHL_API_VERSION}/appointments/`, {
      method: 'POST',
      headers: getGHLHeaders(),
      body: JSON.stringify(appointmentPayload)
    });

    if (!appointmentResponse.ok) {
      const errorData = await appointmentResponse.text();
      console.error('GHL Appointment API Error:', appointmentResponse.status, errorData);
      // Don't fail completely if appointment creation fails, contact was still created
      console.warn('Contact created but appointment creation failed');
    }

    return {
      success: true,
      contactId: contactResult.contactId
    };

  } catch (error) {
    console.error('Error creating GHL appointment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Add tags to an existing contact
 */
export async function addTagsToGHLContact(contactId: string, tags: string[]): Promise<GHLResponse> {
  try {
    const response = await fetch(`${GHL_API_BASE_URL}/${GHL_API_VERSION}/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: getGHLHeaders(),
      body: JSON.stringify({ tags })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('GHL Tags API Error:', response.status, errorData);
      throw new Error(`GHL Tags API request failed: ${response.status}`);
    }

    return { success: true };

  } catch (error) {
    console.error('Error adding tags to GHL contact:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Create a note for a contact
 */
export async function createGHLContactNote(contactId: string, note: string): Promise<GHLResponse> {
  try {
    const response = await fetch(`${GHL_API_BASE_URL}/${GHL_API_VERSION}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: getGHLHeaders(),
      body: JSON.stringify({
        body: note,
        userId: process.env.GHL_USER_ID || 'system'
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('GHL Notes API Error:', response.status, errorData);
      throw new Error(`GHL Notes API request failed: ${response.status}`);
    }

    return { success: true };

  } catch (error) {
    console.error('Error creating GHL contact note:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
