export function setupBoot() {
  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");

    const yearEl = document.querySelector("#aq-year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  });
}
