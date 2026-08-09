/**
 * Meta Conversions API (CAPI) Server Utility
 * Dispatches server-side events directly to Meta Graph API for full funnel tracking & deduplication.
 */
const sendMetaCapiEvent = async ({
  eventName,
  eventId,
  value = 0,
  currency = 'BDT',
  contentName,
  contentIds = [],
  numItems = 1,
  clientIp,
  userAgent
}) => {
  const pixelId = process.env.META_PIXEL_ID || '28506982922219919';

  const capiToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!capiToken || capiToken === 'your_capi_access_token_here') {
    return;
  }

  const endpoint = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${capiToken}`;

  const eventData = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId, // Essential for Meta Deduplication with Browser Pixel
    action_source: 'website',
    user_data: {
      client_ip_address: clientIp || undefined,
      client_user_agent: userAgent || undefined,
    },
    custom_data: {
      currency,
      value: Number(value),
      content_type: 'product',
      content_ids: contentIds,
      content_name: contentName || undefined,
      num_items: numItems
    }
  };

  const payload = {
    data: [eventData]
  };

  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    console.log(`[CAPI Server Dispatch] Event: ${eventName} | EventID: ${eventId} | Status:`, result.events_received ? '✅ Success' : result);
    return result;
  } catch (error) {
    console.error(`[CAPI] Error sending ${eventName}:`, error);
  }
};


module.exports = { sendMetaCapiEvent };
