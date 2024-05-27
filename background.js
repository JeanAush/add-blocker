chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      "id": 1,
      "priority": 1,
      "action": { "type": "block" },
      "condition": {
        "urlFilter": "ad",
        "resourceTypes": ["script", "image", "sub_frame"]
      }
    }],
    removeRuleIds: [1]
  });
  