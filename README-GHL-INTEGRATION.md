# Go High Level Integration for All American Haulin

This document outlines the Go High Level (GHL) integration that has been added to the All American Haulin website.

## Overview

The integration automatically captures leads from the website and sends them to Go High Level for CRM management, lead nurturing, and follow-up automation.

## Features Implemented

### 1. Contact Form Integration
- All contact form submissions are automatically sent to GHL
- Creates new contacts with proper tagging and source attribution
- Includes custom fields for message content
- Maintains existing email notifications

### 2. Calendar/Appointment Integration
- Appointment bookings create both contacts and appointments in GHL
- Syncs with existing Google Calendar integration
- Includes appointment details and customer information
- Proper tagging for appointment-based leads

### 3. Lead Tracking
- Tracks visitor behavior across the website
- Records page visits, scroll depth, and time on page
- Stores visitor data for enhanced lead profiles
- Integrates with Google Analytics for comprehensive tracking

### 4. Error Handling
- Graceful fallback if GHL API is unavailable
- Maintains existing functionality even if GHL integration fails
- Comprehensive error logging for troubleshooting

## Files Modified/Created

### New Files
- `src/dal/gohighlevel.tsx` - GHL API integration functions
- `src/components/lead-tracker.tsx` - Client-side tracking component
- `src/components/client-wrapper.tsx` - Wrapper for client components
- `.env.example` - Updated with GHL environment variables
- `README-GHL-INTEGRATION.md` - This documentation

### Modified Files
- `src/actions/form-server-actions.tsx` - Added GHL integration to form handlers
- `src/app/layout.tsx` - Added lead tracking component
- `types/global.d.ts` - Added GHL environment variable types

## Environment Variables Required

Add these to your `.env` file:

```env
# Go High Level Integration
GHL_API_KEY=your_ghl_api_key_here
GHL_LOCATION_ID=your_ghl_location_id_here
GHL_USER_ID=your_ghl_user_id_here
```

## Getting GHL Credentials

### 1. API Key
1. Log into your Go High Level account
2. Go to Settings > Integrations > API
3. Create a new API key with appropriate permissions
4. Copy the API key to `GHL_API_KEY`

### 2. Location ID
1. In GHL, go to Settings > Company
2. Copy your Location ID
3. Add to `GHL_LOCATION_ID`

### 3. User ID (Optional)
1. Go to Settings > Team
2. Find your user ID
3. Add to `GHL_USER_ID`

## API Endpoints Used

The integration uses the following GHL API endpoints:

- `POST /v1/contacts/` - Create new contacts
- `POST /v1/appointments/` - Create appointments
- `POST /v1/contacts/{id}/tags` - Add tags to contacts
- `POST /v1/contacts/{id}/notes` - Add notes to contacts

## Lead Tagging Strategy

### Contact Form Leads
- `Website Lead`
- `Junk Hauling`
- `Contact Form`

### Appointment Leads
- `Website Lead`
- `Junk Hauling`
- `Appointment Scheduled`

## Data Flow

### Contact Form Submission
1. User submits contact form
2. Cloudflare Turnstile validation
3. Email notification sent
4. Contact created in GHL with tags and custom fields
5. Success response to user

### Appointment Booking
1. User books appointment through calendar
2. Cloudflare Turnstile validation
3. Google Calendar event created
4. Email notification sent
5. Contact and appointment created in GHL
6. Success response to user

### Lead Tracking
1. Page visit tracked on load
2. Scroll depth monitored
3. Time on page recorded
4. Custom events tracked
5. Data stored locally for lead enhancement

## Testing the Integration

### 1. Contact Form Test
1. Fill out the contact form on the website
2. Check GHL for new contact creation
3. Verify tags and custom fields are populated
4. Confirm email notification still works

### 2. Appointment Test
1. Book an appointment through the calendar
2. Check GHL for contact and appointment creation
3. Verify Google Calendar sync still works
4. Confirm email notifications are sent

### 3. Lead Tracking Test
1. Navigate through website pages
2. Check browser localStorage for tracking data
3. Verify Google Analytics events are firing
4. Test scroll and time tracking

## Troubleshooting

### Common Issues

1. **GHL API Key Invalid**
   - Verify API key is correct
   - Check API key permissions
   - Ensure key hasn't expired

2. **Location ID Incorrect**
   - Verify Location ID in GHL settings
   - Ensure it matches the account

3. **Contact Not Created**
   - Check server logs for API errors
   - Verify all required fields are provided
   - Test API connectivity

4. **Tracking Not Working**
   - Check browser console for JavaScript errors
   - Verify localStorage is enabled
   - Test in different browsers

### Debug Mode

To enable debug logging, check the server console for GHL-related error messages. All GHL API errors are logged with detailed information.

## Performance Considerations

- GHL API calls are made asynchronously
- Form submissions don't wait for GHL response
- Existing functionality continues if GHL is unavailable
- Lead tracking uses minimal resources

## Security

- API keys are stored as environment variables
- No sensitive data exposed to client-side
- All API calls made from server-side only
- Proper error handling prevents data leaks

## Future Enhancements

Potential improvements for the integration:

1. **Webhook Integration**
   - Receive updates from GHL back to website
   - Sync contact status changes

2. **Advanced Tracking**
   - UTM parameter capture
   - Referrer source tracking
   - Campaign attribution

3. **Lead Scoring**
   - Behavioral scoring based on interactions
   - Automatic lead qualification

4. **Custom Fields**
   - Service interest tracking
   - Property type information
   - Estimated job size

## Support

For issues with the GHL integration:

1. Check server logs for error messages
2. Verify environment variables are set correctly
3. Test GHL API connectivity directly
4. Review GHL account permissions and limits

## API Rate Limits

Go High Level has API rate limits:
- 100 requests per minute per API key
- Monitor usage to avoid hitting limits
- Implement retry logic if needed

This integration provides a solid foundation for lead management and can be extended based on business needs.
