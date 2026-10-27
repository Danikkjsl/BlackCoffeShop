document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("siteBurger");
    const nav = document.getElementById("siteNav");
    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (!burger || !nav) {
        return;
    }

    function closeMenu() {
        nav.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Відкрити меню");
    }

    burger.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = nav.classList.toggle("open");

        burger.classList.toggle("open", isOpen);
        burger.setAttribute("aria-expanded", String(isOpen));
        burger.setAttribute(
            "aria-label",
            isOpen ? "Закрити меню" : "Відкрити меню"
        );
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (!nav.contains(event.target) && !burger.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
});