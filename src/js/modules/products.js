export function setupProductsHover() {
  const scope = document.querySelector("#produits");
  if (!scope) return;

  const tabs = Array.from(scope.querySelectorAll(".product-tab"));
  const items = Array.from(scope.querySelectorAll(".product-item"));
  if (!tabs.length || !items.length) return;

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const setActive = (key) => {
    for (const t of tabs) {
      const active = t.dataset.focus === key;
      t.classList.toggle("is-active", active);
      t.classList.toggle("tab-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    }
    for (const i of items) {
      i.classList.toggle("is-active", i.dataset.item === key);
    }
  };

  const clearActive = () => {
    for (const t of tabs) {
      t.classList.remove("is-active", "tab-active");
      t.setAttribute("aria-selected", "false");
    }
    for (const i of items) i.classList.remove("is-active");
  };

  scope.addEventListener(
    "mouseenter",
    (e) => {
      const tab = e.target.closest?.(".product-tab");
      if (tab) setActive(tab.dataset.focus);
      const item = e.target.closest?.(".product-item");
      if (item) setActive(item.dataset.item);
    },
    true
  );

  scope.addEventListener("click", (e) => {
    const tab = e.target.closest?.(".product-tab");
    if (tab) setActive(tab.dataset.focus);
  });

  clearActive();

  if (!canHover) return;

  let timer = 0;

  const armClear = () => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (!scope.querySelector(".product-tab:hover, .product-item:hover")) {
        clearActive();
      }
    }, 60);
  };

  const disarmClear = () => clearTimeout(timer);

  scope.addEventListener(
    "pointerover",
    (e) => {
      if (e.target.closest?.(".product-tab, .product-item")) disarmClear();
    },
    true
  );

  scope.addEventListener(
    "pointerout",
    (e) => {
      if (e.target.closest?.(".product-tab, .product-item")) armClear();
    },
    true
  );

  scope.addEventListener("pointerleave", () => {
    disarmClear();
    clearActive();
  });
}
