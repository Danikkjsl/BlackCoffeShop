
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");

    // Автоматичне оновлення року
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Мобільне меню
    if (!burger || !nav) return;

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

    nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        if (!nav.contains(event.target) &&
            !burger.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
});
