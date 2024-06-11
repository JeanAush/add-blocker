chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        "id": 1,
        "priority": 1,
        "action": {
          "type": "block"
        },
        "condition": {
          "urlFilter": "*://*/*",
          "resourceTypes": ["script", "image", "sub_frame"],
          "domains": ["doubleclick.net", "adservice.google.com", "googlesyndication.com", "googleadservices.com", "adsafeprotected.com", "adnxs.com", "adsrvr.org", "advertising.com"]
        }
      }
    ],
    removeRuleIds: []
  });
});
