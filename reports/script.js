document.addEventListener("DOMContentLoaded", () => {
  setupDropdownMenu(".report-menu__icon", ".report-menu__dropdown");
});

function setupDropdownMenu(menuIconSelector, dropdownSelector) {
  const menuIcons = document.querySelectorAll(menuIconSelector);
  const dropdowns = document.querySelectorAll(dropdownSelector);

  menuIcons.forEach((icon) => {
    icon.addEventListener("click", function (event) {
      event.stopPropagation();
      const currentDropdown = this.nextElementSibling;

      dropdowns.forEach((dropdown) => {
        if (dropdown !== currentDropdown) {
          hideElement(dropdown, { duration: 200 });
        }
      });

      if (currentDropdown.classList.contains("show")) {
        hideElement(currentDropdown, { duration: 200 });
      } else {
        showElement(currentDropdown, {
          duration: 200,
          effect: "zoom",
          display: "flex",
        });
      }
    });
  });

  document.addEventListener("click", function () {
    dropdowns.forEach((dropdown) => {
      hideElement(dropdown, { duration: 200 });
    });
  });
}

function showElement(target, options = {}) {
  const elements =
    typeof target === "string" ? document.querySelectorAll(target) : [target];

  const { duration = 300, display = "block", effect = "fade" } = options;

  elements.forEach((element) => {
    if (getComputedStyle(element).display !== "none") return;

    element.classList.add("animate", effect);
    element.style.transitionDuration = `${duration}ms`;
    element.style.display = display;

    setTimeout(() => element.classList.add("show"), 10);
  });
}

function hideElement(target, options = {}) {
  const elements =
    typeof target === "string" ? document.querySelectorAll(target) : [target];

  const { duration = 300 } = options;

  elements.forEach((element) => {
    if (getComputedStyle(element).display === "none") return;

    element.style.transitionDuration = `${duration}ms`;
    element.classList.remove("show");

    setTimeout(() => {
      element.style.display = "none";
    }, duration);
  });
}
