// Content script for additional ad blocking if needed
console.log('Content script loaded');

const adSelectors = [
  'video-ads', // YouTube video ads
  '.ytp-ad-module', // YouTube ad module
  '.ad-container', // General ad container
  '.ytp-ad-overlay-container' // YouTube overlay ads
];

const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList' || mutation.type === 'subtree') {
      for (const selector of adSelectors) {
        const ads = document.querySelectorAll(selector);
        ads.forEach(ad => ad.remove());
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
