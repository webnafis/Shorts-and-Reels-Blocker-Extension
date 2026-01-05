// Check if the current web address includes "/shorts/"
if (
  window.location.href.includes("/shorts/") ||
  window.location.href.includes("/shorts")
) {
  // Immediately send the user back to the home page
  window.location.replace("https://www.youtube.com/");
}

// Optional: Run this check every time the URL changes without a page refresh
window.addEventListener("yt-navigate-finish", function () {
  if (
    window.location.href.includes("/shorts/") ||
    window.location.href.includes("/shorts")
  ) {
    window.location.replace("https://www.youtube.com/");
  }
});

// add a warning when add the extension

function blockShortFormContent() {
  // 1. Select ALL elements that match the selector
  const targets = document.querySelectorAll(
    'a[href*="/reel/"], a[href*="/reels/"]'
  );

  // 2. Loop through each one found
  targets.forEach((target) => {
    if (target && target.parentElement) {
      // 3. Apply the style to the immediate parent of each
      target.parentElement.style.setProperty("display", "none", "important");
    }
  });

  const anotherExplorarReel = document.querySelectorAll(
    'a:has(video[style*="object-fit: cover"])'
  );
  anotherExplorarReel.forEach((reel) => {
    if (reel) {
      reel.parentElement.parentElement.style.setProperty(
        "display",
        "none",
        "important"
      );
    }
  });

  const url = window.location.href;

  // Facebook Reels check
  if (
    url.includes("facebook.com/reels/") ||
    url.includes("facebook.com/reel/") ||
    url.includes("facebook.com/gaming/") ||
    url.includes("facebook.com/stories/")
  ) {
    window.location.replace("https://www.facebook.com/");
  }

  // Instagram Reels check
  if (
    (url.includes("instagram.com/") && url.includes("/reels/")) ||
    (url.includes("instagram.com/") && url.includes("/reel/"))
  ) {
    window.location.replace("https://www.instagram.com/");
  }
}

// 1. Run immediately on page load
blockShortFormContent();

// 2. Observe changes in the document body to catch SPA navigation
const observer = new MutationObserver(() => {
  blockShortFormContent();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
