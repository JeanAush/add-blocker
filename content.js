// Basic cosmetic filtering for common ad containers.
const adSelectors = [
  '[id*="ad-"]',
  '[id*="ad_"]',
  '[id*="ads-"]',
  '[id*="ads_"]',
  '[id*="advert"]',
  '[id*="sponsor"]',
  '[class*="ad-"]',
  '[class*="ad_"]',
  '[class*="ads-"]',
  '[class*="ads_"]',
  '[class*="advert"]',
  '[class*="sponsor"]',
  '[class*="promoted"]',
  '[class*="banner"]',
  'iframe[src*="ads"]',
  'iframe[id*="ads"]',
  'iframe[class*="ads"]'
];

const adSelector = adSelectors.join(',');

function removeAds(root = document) {
  const nodes = root.querySelectorAll(adSelector);
  for (const node of nodes) {
    node.remove();
  }
}

function hideAds() {
  const style = document.createElement('style');
  style.textContent = `
    ${adSelector} {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      width: 0 !important;
    }
  `;
  document.documentElement.appendChild(style);
}

function stripNewTabTargets(root = document) {
  const links = root.querySelectorAll('a[target]');
  for (const link of links) {
    link.removeAttribute('target');
    link.removeAttribute('rel');
  }
}

function blockPopupNavigation() {
  // Block scripted popups.
  const originalOpen = window.open;
  window.open = function () {
    return null;
  };

  // Block links that try to open a new tab or cross-site redirects.
  const clickBlocker = (event) => {
    const anchor = event.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    const isBlank = (anchor.getAttribute('target') || '').toLowerCase() === '_blank';
    const isExternal = href.startsWith('http') && !href.includes(location.host);
    if (isBlank || isExternal) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  document.addEventListener('click', clickBlocker, true);
  document.addEventListener('auxclick', clickBlocker, true);

  // Some sites re-add targets dynamically.
  stripNewTabTargets();
}

hideAds();
removeAds();

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        removeAds(node);
        stripNewTabTargets(node);
      }
    }
  }
});

observer.observe(document.documentElement, { childList: true, subtree: true });

// Aggressive anti-popup measures only on cineby.gd.
if (location.hostname.endsWith('cineby.gd')) {
  blockPopupNavigation();
}
