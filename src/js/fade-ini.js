// Анимации появления при скроллинге - ES6 модуль

export class ScrollAnimator {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
            animationClass: "animated",
            ...options,
        };

        this.observer = null;
        this.init();
    }

    init() {
        // Проверяем поддержку Intersection Observer
        if (!("IntersectionObserver" in window)) {
            this.initLegacy();
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(this.options.animationClass);
                }
            });
        }, this.options);

        this.observeElements();
    }

    observeElements() {
        const elements = document.querySelectorAll(
            ".fade-in, .fade-in-up, .fade-in-down, " + ".fade-in-left, .fade-in-right",
        );

        elements.forEach((element) => {
            this.observer.observe(element);
        });
    }

    initLegacy() {
        console.log("Using legacy scroll animation method");

        const animateOnScroll = () => {
            const elements = document.querySelectorAll(
                ".fade-in, .fade-in-up, .fade-in-down, " + ".fade-in-left, .fade-in-right",
            );

            elements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;

                if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                    element.classList.add(this.options.animationClass);
                }
            });
        };

        document.addEventListener("DOMContentLoaded", animateOnScroll);
        window.addEventListener("scroll", animateOnScroll);
        window.addEventListener("resize", animateOnScroll);
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Экспорт по умолчанию
export default { ScrollAnimator };
