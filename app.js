const appGrid = document.querySelector("#app-grid");
const emptyState = document.querySelector("#empty-state");
const currentUrl = document.querySelector("#current-url");
const filterButtons = [...document.querySelectorAll("[data-filter]")];

let apps = [];
let activeFilter = "all";

currentUrl.textContent = window.location.href;

const formatSize = (size) => size.charAt(0).toUpperCase() + size.slice(1);

const buildAppUrl = (url, size) => {
  const nextUrl = new URL(url, window.location.href);
  nextUrl.searchParams.set("size", size);
  return nextUrl.toString();
};

const renderApps = () => {
  const visibleApps = apps.filter((app) => {
    return activeFilter === "all" || app.sizes.includes(activeFilter);
  });

  appGrid.innerHTML = "";
  emptyState.hidden = visibleApps.length > 0;

  visibleApps.forEach((app) => {
    const selectedSize = activeFilter === "all" ? app.sizes[0] : activeFilter;
    const card = document.createElement("a");
    card.className = "app-card";
    card.href = buildAppUrl(app.url, selectedSize);
    card.setAttribute("aria-label", `Open ${app.name} ${formatSize(selectedSize)}`);

    const icon = document.createElement("span");
    icon.className = "app-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = app.icon || app.name.trim().charAt(0).toUpperCase();

    const title = document.createElement("h2");
    title.textContent = app.name;

    card.append(icon, title);
    appGrid.append(card);
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-checked", String(isActive));
    });

    renderApps();
  });
});

fetch("apps.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load apps.json: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    apps = data.apps || [];
    renderApps();
  })
  .catch((error) => {
    emptyState.hidden = false;
    emptyState.textContent = error.message;
  });
