(() => {
    "use strict";

    const THEME_KEY = "sq-theme";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* ---- Theme ------------------------------------------------ */

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute("content", theme === "dark" ? "#0f1519" : "#ffffff");
        }
        document.querySelectorAll(".theme-toggle").forEach((button) => {
            button.setAttribute("aria-pressed", String(theme === "dark"));
            button.setAttribute(
                "aria-label",
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            );
        });
    };

    const storedTheme = () => {
        try {
            return localStorage.getItem(THEME_KEY);
        } catch (error) {
            return null;
        }
    };

    const initTheme = () => {
        applyTheme(storedTheme() || (systemDark.matches ? "dark" : "light"));

        systemDark.addEventListener("change", (event) => {
            if (!storedTheme()) {
                applyTheme(event.matches ? "dark" : "light");
            }
        });

        document.querySelectorAll(".theme-toggle").forEach((button) => {
            button.addEventListener("click", () => {
                const next =
                    document.documentElement.getAttribute("data-theme") === "dark"
                        ? "light"
                        : "dark";
                applyTheme(next);
                try {
                    localStorage.setItem(THEME_KEY, next);
                } catch (error) {
                    /* storage unavailable — theme still applies for this page */
                }
            });
        });
    };

    /* ---- Navigation ------------------------------------------- */

    const initNav = () => {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        document.querySelectorAll(".nav-links a").forEach((link) => {
            const isCurrent = link.getAttribute("href") === currentPage;
            if (isCurrent) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        const nav = document.querySelector(".site-nav");
        const toTop = document.querySelector(".to-top");
        if (!nav && !toTop) return;

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                const y = window.scrollY;
                if (nav) nav.classList.toggle("is-stuck", y > 8);
                if (toTop) toTop.classList.toggle("is-visible", y > 700);
                ticking = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        if (toTop) {
            toTop.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: reduceMotion.matches ? "auto" : "smooth"
                });
            });
        }
    };

    /* ---- Scroll reveal ---------------------------------------- */

    const initReveal = () => {
        const targets = document.querySelectorAll(".reveal");
        if (!targets.length) return;

        if (reduceMotion.matches || !("IntersectionObserver" in window)) {
            targets.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
        );

        targets.forEach((element) => observer.observe(element));
    };

    /* ---- Figure lightbox -------------------------------------- */

    const initLightbox = () => {
        const images = document.querySelectorAll(".figure-media img");
        if (!images.length) return;

        const overlay = document.createElement("div");
        overlay.className = "lightbox";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Enlarged figure");
        overlay.innerHTML =
            '<button type="button" class="lightbox-close" aria-label="Close enlarged figure">&#10005;</button>' +
            '<img alt="">';
        document.body.appendChild(overlay);

        const overlayImage = overlay.querySelector("img");
        const closeButton = overlay.querySelector(".lightbox-close");
        let lastFocused = null;

        const open = (source) => {
            overlayImage.src = source.currentSrc || source.src;
            overlayImage.alt = source.alt || "";
            overlay.classList.add("is-open");
            document.body.style.overflow = "hidden";
            lastFocused = document.activeElement;
            closeButton.focus();
        };

        const close = () => {
            overlay.classList.remove("is-open");
            document.body.style.overflow = "";
            overlayImage.removeAttribute("src");
            if (lastFocused) lastFocused.focus();
        };

        images.forEach((image) => {
            image.style.cursor = "zoom-in";
            image.setAttribute("tabindex", "0");
            image.setAttribute("role", "button");
            image.setAttribute("aria-label", "Enlarge figure: " + (image.alt || "figure"));
            image.addEventListener("click", () => open(image));
            image.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    open(image);
                }
            });
        });

        overlay.addEventListener("click", (event) => {
            if (event.target !== overlayImage) close();
        });

        closeButton.addEventListener("click", close);

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && overlay.classList.contains("is-open")) close();
            if (event.key === "Tab" && overlay.classList.contains("is-open")) {
                event.preventDefault();
                closeButton.focus();
            }
        });
    };

    /* ---- Misc -------------------------------------------------- */

    const initYear = () => {
        const year = String(new Date().getFullYear());
        document.querySelectorAll("[data-current-year]").forEach((element) => {
            element.textContent = year;
        });
    };

    const start = () => {
        initTheme();
        initNav();
        initReveal();
        initLightbox();
        initYear();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }
})();
