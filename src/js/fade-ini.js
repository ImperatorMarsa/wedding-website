// Модуль для анимаций при скролле
export default class ScrollAnimations {
    constructor(options = {}) {
        // Настройки по умолчанию
        this.defaults = {
            animationClass: "animate-on-scroll",
            animatedClass: "animated",
            threshold: 0.1, // 10% видимости элемента
            rootMargin: "0px 0px -50px 0px",
            delayAttribute: "data-delay",
            animationAttribute: "data-animation",
        };

        // Объединяем настройки
        this.settings = { ...this.defaults, ...options };

        // Элементы для анимации
        this.animatedElements = [];

        // Observer для отслеживания видимости элементов
        this.observer = null;

        // Флаг инициализации
        this.initialized = false;
    }

    // Инициализация
    init() {
        if (this.initialized) return;

        // Находим все элементы для анимации
        this.animatedElements = document.querySelectorAll(`.${this.settings.animationClass}`);

        // Проверяем поддержку Intersection Observer
        if ("IntersectionObserver" in window) {
            this.initIntersectionObserver();
        } else {
            // Fallback для старых браузеров
            this.initScrollListener();
        }

        // Инициализируем анимацию прогресс-баров
        this.initProgressBars();

        this.initialized = true;
        console.log("Scroll Animations initialized");
    }

    // Инициализация Intersection Observer
    initIntersectionObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: this.settings.threshold,
                rootMargin: this.settings.rootMargin,
            },
        );

        // Начинаем наблюдение за элементами
        this.animatedElements.forEach((element) => {
            this.observer.observe(element);
        });
    }

    // Fallback для старых браузеров
    initScrollListener() {
        // Проверяем видимость элементов при скролле
        const checkVisibility = () => {
            this.animatedElements.forEach((element) => {
                if (this.isElementInViewport(element)) {
                    this.animateElement(element);
                }
            });
        };

        // Проверяем при загрузке и скролле
        window.addEventListener("DOMContentLoaded", checkVisibility);
        window.addEventListener("scroll", checkVisibility);
        window.addEventListener("resize", checkVisibility);

        // Первоначальная проверка
        checkVisibility();
    }

    // Анимация элемента
    animateElement(element) {
        // Получаем тип анимации и задержку
        const animationType =
            element.getAttribute(this.settings.animationAttribute) || "fade-in-up";
        const delay = parseInt(element.getAttribute(this.settings.delayAttribute)) || 0;

        // Добавляем класс с анимацией
        element.classList.add(animationType);

        // Применяем задержку
        setTimeout(() => {
            element.classList.add(this.settings.animatedClass);

            // Если это прогресс-бар, анимируем его заполнение
            if (element.classList.contains("progress-bar")) {
                this.animateProgressBar(element);
            }
        }, delay);
    }

    // Проверка видимости элемента (для fallback)
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }

    // Инициализация прогресс-баров
    initProgressBars() {
        const progressBars = document.querySelectorAll(".progress-bar[data-width]");

        // Добавляем прогресс-бары в список наблюдаемых элементов
        progressBars.forEach((bar) => {
            bar.classList.add(this.settings.animationClass);
            bar.setAttribute(this.settings.animationAttribute, "fade-in-right");
        });

        // Обновляем список элементов
        this.animatedElements = document.querySelectorAll(`.${this.settings.animationClass}`);
    }

    // Анимация прогресс-бара
    animateProgressBar(progressBar) {
        const targetWidth = progressBar.getAttribute("data-width");
        let currentWidth = 0;

        // Анимация увеличения ширины
        const animate = () => {
            if (currentWidth < targetWidth) {
                currentWidth += 1;
                progressBar.style.width = `${currentWidth}%`;
                requestAnimationFrame(animate);
            }
        };

        // Запускаем анимацию с небольшой задержкой
        setTimeout(() => {
            requestAnimationFrame(animate);
        }, 300);
    }

    // Обновление элементов (если динамически добавлены новые)
    update() {
        if (this.observer) {
            // Отключаем наблюдение за старыми элементами
            this.animatedElements.forEach((element) => {
                this.observer.unobserve(element);
            });
        }

        // Находим новые элементы
        this.animatedElements = document.querySelectorAll(`.${this.settings.animationClass}`);

        // Начинаем наблюдение за новыми элементами
        if (this.observer) {
            this.animatedElements.forEach((element) => {
                this.observer.observe(element);
            });
        }
    }

    // Уничтожение экземпляра
    destroy() {
        if (this.observer) {
            this.animatedElements.forEach((element) => {
                this.observer.unobserve(element);
            });
            this.observer.disconnect();
        }

        this.initialized = false;
    }
}
