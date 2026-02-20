chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1001,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "doubleclick",
          resourceTypes: ["script", "image", "sub_frame", "xmlhttprequest", "stylesheet", "font", "media", "other"]
        }
      },
      {
        id: 1002,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "adservice",
          resourceTypes: ["script", "image", "sub_frame", "xmlhttprequest", "stylesheet", "font", "media", "other"]
        }
      },
      {
        id: 1003,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "adserver",
          resourceTypes: ["script", "image", "sub_frame", "xmlhttprequest", "stylesheet", "font", "media", "other"]
        }
      },
      {
        id: 1004,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "sponsored",
          resourceTypes: ["script", "image", "sub_frame", "xmlhttprequest", "stylesheet", "font", "media", "other"]
        }
      },
      {
        id: 1005,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "promoted",
          resourceTypes: ["script", "image", "sub_frame", "xmlhttprequest", "stylesheet", "font", "media", "other"]
        }
      }
    ],
    removeRuleIds: [1001, 1002, 1003, 1004, 1005]
  });
});
