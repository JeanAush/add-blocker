const adBlockRules = [
  {
    id: 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "*://*/*",
      resourceTypes: [
        "script",
        "image",
        "sub_frame",
        "media",
        "object",
        "stylesheet",
        "xmlhttprequest",
        "other"
      ],
      domains: [
        "doubleclick.net",
        "adservice.google.com",
        "googlesyndication.com",
        "googleadservices.com",
        "adsafeprotected.com",
        "adnxs.com",
        "adsrvr.org",
        "advertising.com",
        "securepubads.g.doubleclick.net",
        "pagead2.googlesyndication.com",
        "youtube.com/api/stats/ads",
        "googleads.g.doubleclick.net",
        "tpc.googlesyndication.com",
        "pubads.g.doubleclick.net",
        "partner.googleadservices.com",
        "ad.doubleclick.net",
        "adservice.google.com",
        "imasdk.googleapis.com",
        "youtube.com/get_midroll_info",
        "youtube.com/get_video_info",
        "youtube.com/api/stats/qoe",
        "youtube.com/youtubei/v1/player/ad_break",
        "youtube.com/youtubei/v1/log_event"
      ]
    }
  }
];

function updateAdBlockRules() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: adBlockRules.map(rule => rule.id),
    addRules: adBlockRules
  });
}

chrome.runtime.onInstalled.addListener(() => {
  updateAdBlockRules();
  setInterval(updateAdBlockRules, 3600000); // Update rules every hour
});

chrome.runtime.onStartup.addListener(() => {
  updateAdBlockRules();
});
