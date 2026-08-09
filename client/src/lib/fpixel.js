export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '28506982922219919';


const lastFired = {};

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    const now = Date.now();
    if (lastFired['PageView'] && now - lastFired['PageView'] < 2000) return;
    lastFired['PageView'] = now;
    window.fbq('track', 'PageView');
  }
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}, customEventId = null) => {
  if (typeof window !== 'undefined') {
    const key = `${name}_${options?.content_ids ? options.content_ids.join('_') : ''}`;
    const now = Date.now();
    if (lastFired[key] && now - lastFired[key] < 2000) {
      return; // Prevent duplicate pixel fires within 2-second window
    }
    lastFired[key] = now;

    // Generate or use matching eventId for Deduplication (Pixel + CAPI)
    const eventId = customEventId || `${name.toLowerCase()}_${now}_${Math.random().toString(36).substring(2, 6)}`;

    // 1. Browser Meta Pixel
    if (window.fbq) {
      window.fbq('track', name, options, { eventID: eventId });
    }

    // 2. Server-side Conversions API (CAPI) Proxy Dispatch
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    fetch(`${apiURL}/api/meta-capi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: name,
        eventId,
        value: options.value || 0,
        currency: options.currency || 'BDT',
        contentName: options.content_name,
        contentIds: options.content_ids || [],
        numItems: options.num_items || 1,
      }),
    }).catch(err => console.debug('CAPI Client Proxy Dispatch debug:', err));
  }
};
