(() => {
  const notice = document.querySelector("[data-site-notice]");
  const closeButton = notice?.querySelector("[data-site-notice-close]");
  const storageKey = "models-work-in-progress-notice-dismissed";

  if (!notice || !closeButton) return;

  try {
    notice.hidden = localStorage.getItem(storageKey) === "true";
  } catch {
    // The notice remains visible when browser storage is unavailable.
  }

  closeButton.addEventListener("click", () => {
    notice.hidden = true;

    try {
      localStorage.setItem(storageKey, "true");
    } catch {
      // Dismissing the notice still works for the current page.
    }
  });
})();
