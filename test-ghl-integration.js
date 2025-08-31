// Simple test script to verify GHL API connectivity
// Run with: node test-ghl-integration.js

const GHL_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6ImNSOElFQTRGVWtUUm1Sem91cTJQIiwidmVyc2lvbiI6MSwiaWF0IjoxNzU2NTY4MzcyMDQ2LCJzdWIiOiJ6eXVLNmhDUVBFbEcxQnpyQTF1SCJ9.ci-YM7bbVv4zQfRaVhIrouGN3U8lsm0YQ-wua0RUp1s';
const GHL_LOCATION_ID = 'cR8IEA4FUkTRmRzouq2P';

async function testGHLConnection() {
  try {
    console.log('Testing Go High Level API connection...');
    
    const testContact = {
      firstName: 'Test',
      lastName: 'Contact',
      email: 'test@example.com',
      phone: '555-123-4567',
      source: 'Website Test',
      tags: ['Website Lead', 'Test Contact'],
      locationId: GHL_LOCATION_ID
    };

    const response = await fetch('https://services.leadconnectorhq.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testContact)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const result = await response.json();
      console.log('✅ SUCCESS: GHL API connection working!');
      console.log('Contact created:', result);
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ ERROR: GHL API request failed');
      console.log('Error response:', errorText);
      return false;
    }
  } catch (error) {
    console.log('❌ ERROR: Network or other error');
    console.error(error);
    return false;
  }
}

// Run the test
testGHLConnection().then(success => {
  if (success) {
    console.log('\n🎉 Go High Level integration is ready to use!');
  } else {
    console.log('\n⚠️  Please check your GHL credentials and try again.');
  }
});
