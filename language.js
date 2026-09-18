(() => {
    "use strict";

    const LANGUAGE_KEY = "sq-language";
    const translations = window.SQ_TRANSLATIONS || {};
    const originalText = new WeakMap();
    const originalAttributes = new WeakMap();
    const originalTitle = document.title;

    let currentLanguage = "en";

    const normalize = (value) => String(value || "").replace(/\s+/g, " ").trim();

    const storedLanguage = () => {
        try {
            return localStorage.getItem(LANGUAGE_KEY) === "zh" ? "zh" : "en";
        } catch (error) {
            return "en";
        }
    };

    const translatedValue = (original, language) => {
        if (language !== "zh") return original;
        return translations[normalize(original)] || original;
    };

    const translatedTextNode = (original, language) => {
        const translated = translatedValue(original, language);
        if (translated === original) return original;
        const leading = original.match(/^\s*/)[0];
        const trailing = original.match(/\s*$/)[0];
        return leading + translated + trailing;
    };

    const translateTextNodes = (language) => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => {
                if (!normalize(node.nodeValue)) return NodeFilter.FILTER_REJECT;
                const parent = node.parentElement;
                if (!parent || parent.closest("script, style, [data-i18n-skip]")) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        nodes.forEach((node) => {
            if (!originalText.has(node)) originalText.set(node, node.nodeValue);
            node.nodeValue = translatedTextNode(originalText.get(node), language);
        });
    };

    const translateAttributes = (language) => {
        document.querySelectorAll("[aria-label], [title], [alt]").forEach((element) => {
            if (
                element.closest("[data-i18n-skip]") ||
                element.matches(".theme-toggle") ||
                element.matches('.figure-media img[role="button"]')
            ) {
                return;
            }

            if (!originalAttributes.has(element)) originalAttributes.set(element, new Map());
            const originals = originalAttributes.get(element);

            ["aria-label", "title", "alt"].forEach((attribute) => {
                if (!element.hasAttribute(attribute)) return;
                if (!originals.has(attribute)) {
                    originals.set(attribute, element.getAttribute(attribute));
                }
                const original = originals.get(attribute);
                element.setAttribute(attribute, translatedValue(original, language));
            });
        });
    };

    const updateDynamicLabels = () => {
        const isChinese = currentLanguage === "zh";
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";

        document.querySelectorAll(".theme-toggle").forEach((button) => {
            const english = isDark ? "Switch to light theme" : "Switch to dark theme";
            button.setAttribute("aria-label", isChinese ? translations[english] || english : english);
        });

        document.querySelectorAll('.figure-media img[role="button"]').forEach((image) => {
            const alt = image.alt || (isChinese ? "图表" : "figure");
            image.setAttribute(
                "aria-label",
                (isChinese ? "放大图表：" : "Enlarge figure: ") + alt
            );
        });

        const button = document.querySelector(".language-toggle");
        if (!button) return;
        const label = isChinese ? "切换到 English" : "Switch to 中文";
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
        button.setAttribute("aria-pressed", String(isChinese));
        button.querySelectorAll("[data-language-option]").forEach((option) => {
            option.classList.toggle(
                "is-active",
                option.getAttribute("data-language-option") === currentLanguage
            );
        });
    };

    const applyLanguage = (language, persist = true) => {
        currentLanguage = language === "zh" ? "zh" : "en";
        document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
        document.documentElement.setAttribute("data-language", currentLanguage);
        document.title =
            currentLanguage === "zh"
                ? translations[originalTitle] || originalTitle
                : originalTitle;

        translateTextNodes(currentLanguage);
        translateAttributes(currentLanguage);
        updateDynamicLabels();

        if (persist) {
            try {
                localStorage.setItem(LANGUAGE_KEY, currentLanguage);
            } catch (error) {
                /* Storage unavailable: switching still works for the current page. */
            }
        }
    };

    const createLanguageToggle = () => {
        const navCluster = document.querySelector(".nav-cluster");
        if (!navCluster || navCluster.querySelector(".language-toggle")) return;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "language-toggle";
        button.setAttribute("data-i18n-skip", "");
        button.innerHTML =
            '<span class="language-option" data-language-option="en" lang="en">English</span>' +
            '<span class="language-divider" aria-hidden="true">/</span>' +
            '<span class="language-option" data-language-option="zh" lang="zh-CN">中文</span>';
        navCluster.appendChild(button);

        button.addEventListener("click", () => {
            applyLanguage(currentLanguage === "en" ? "zh" : "en");
        });
    };

    const start = () => {
        currentLanguage = storedLanguage();
        createLanguageToggle();

        document.querySelectorAll(".theme-toggle").forEach((button) => {
            button.addEventListener("click", updateDynamicLabels);
        });

        applyLanguage(currentLanguage, false);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }
})();
