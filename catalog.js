document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("siteBurger");
    const nav = document.getElementById("siteNav");

    function closeMenu() {
        if (!burger || !nav) return;

        nav.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Відкрити меню");
    }

    if (burger && nav) {
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
    }

    /* Фільтрація за брендами */

    const filterButtons = [...document.querySelectorAll(".filter-btn")];
    const products = [...document.querySelectorAll(".product")];

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((item) => {
                item.classList.toggle("active", item === button);
            });

            const selectedBrand = button.dataset.brand;

            products.forEach((product) => {
                product.hidden =
                    selectedBrand !== "all" &&
                    product.dataset.brand !== selectedBrand;
            });
        });
    });

    /* Кошик */

    const cart = document.getElementById("cart");
    const cartButton = document.getElementById("cartBtn");
    const cartClose = document.getElementById("cartClose");
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");
    const checkoutButton = document.getElementById("checkoutBtn");

    /* Модальне вікно */

    const modal = document.getElementById("modal");
    const modalClose = document.getElementById("closeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");

    let items = [];

    const formatMoney = (amount) =>
        Number(amount).toLocaleString("uk-UA");

    function renderCart() {
        if (!cartItems || !cartCount || !totalElement) return;

        cartCount.textContent = items.reduce(
            (sum, item) => sum + item.qty,
            0
        );

        cartItems.innerHTML = "";

        items.forEach((item, index) => {
            const row = document.createElement("div");
            row.className = "cart-line";

            const info = document.createElement("div");
            const name = document.createElement("strong");
            const detail = document.createElement("small");
            const removeButton = document.createElement("button");

            name.textContent = item.name;
            detail.textContent =
                `${item.qty} × ${formatMoney(item.price)} ₴`;

            info.append(name, detail);

            removeButton.className = "remove-item";
            removeButton.type = "button";
            removeButton.textContent = "Видалити";

            removeButton.addEventListener("click", () => {
                items.splice(index, 1);
                renderCart();
            });

            row.append(info, removeButton);
            cartItems.append(row);
        });

        const total = items.reduce(
            (sum, item) => sum + item.qty * item.price,
            0
        );

        totalElement.textContent = formatMoney(total);
    }

    if (cartButton && cart) {
        cartButton.addEventListener("click", () => {
            cart.classList.add("open");
        });
    }

    if (cartClose && cart) {
        cartClose.addEventListener("click", () => {
            cart.classList.remove("open");
        });
    }

    document.querySelectorAll(".add-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const product = button.closest(".product");

            if (!product) return;

            const name =
                product.dataset.name ||
                product.querySelector("h3")?.textContent.trim() ||
                "Кавомашина";

            const price = Number(
                product.dataset.price ||
                product.querySelector(".price")?.textContent.replace(/[^\d]/g, "") ||
                0
            );

            const existingItem = items.find(
                (item) => item.name === name
            );

            if (existingItem) {
                existingItem.qty += 1;
            } else {
                items.push({
                    name,
                    price,
                    qty: 1
                });
            }

            renderCart();

            if (cart) {
                cart.classList.add("open");
            }
        });
    });

    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (!modal || !modalTitle || !modalText) return;

            if (items.length === 0) {
                modalTitle.textContent = "Кошик порожній";
                modalText.textContent =
                    "Додайте кавомашину до кошика, щоб оформити замовлення.";
            } else {
                modalTitle.textContent = "Замовлення";
                modalText.textContent =
                    "Кошик сформовано. Для завершення замовлення зателефонуйте: 098 941 20 27.";
            }

            modal.classList.add("open");
        });
    }

    if (modalClose && modal) {
        modalClose.addEventListener("click", () => {
            modal.classList.remove("open");
        });
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.remove("open");
            }
        });
    }

    renderCart();
});