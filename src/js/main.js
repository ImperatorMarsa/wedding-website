import "../scss/styles.scss";
import $ from "jquery";

import ScrollAnimations from "./fade-ini";
import "./backgroundVideo.js";
import "./formSubmit.js"; // Логика отправки формы
import { initializeDeviceIdField } from "./formUtils.js"; // Импорт новой функции

import { Tooltip } from "bootstrap";
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltipEl) => {
    new Tooltip(tooltipEl);
});

// Инициализация при полной загрузке DOM
$(document).ready(function () {
    console.log("Document ready");

    // Инициализация анимаций при скролле
    const scrollAnimations = new ScrollAnimations({
        threshold: 0.15, // 15% видимости элемента
        rootMargin: "0px 0px -100px 0px",
    });

    scrollAnimations.init();

    // Плавная прокрутка для якорных ссылок
    $('a[href^="#"]').on("click", function (e) {
        if (this.hash !== "") {
            e.preventDefault();

            const hash = this.hash;
            const target = $(hash);

            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70, // Учитываем высоту навигации
                    },
                    800,
                );

                // Обновляем URL без перезагрузки страницы
                if (history.pushState) {
                    history.pushState(null, null, hash);
                } else {
                    window.location.hash = hash;
                }
            }
        }
    });

    // Обработка отправки формы (пример)
    $("form").on("submit", function (e) {
        e.preventDefault();

        // Здесь обычно отправка формы через AJAX
        alert("Форма отправлена! В реальном приложении здесь будет AJAX запрос.");

        // Сброс формы
        this.reset();
    });

    // Обновление анимаций при изменении размера окна (с задержкой для производительности)
    let resizeTimer;
    $(window).on("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            scrollAnimations.update();
        }, 250);
    });

    // Добавление элементов по кнопке (для демонстрации работы update())
    $("#add-element-btn").on("click", function () {
        const newElement = $(
            '<div class="col-md-4"><div class="card h-100 shadow-sm animate-on-scroll" data-animation="fade-in-up" data-delay="200"><div class="card-body text-center p-4"><h4>Новый элемент</h4><p>Динамически добавленный элемент с анимацией.</p></div></div></div>',
        );

        $(".row.g-4").append(newElement);
        scrollAnimations.update();

        // Прокрутка к новому элементу
        $("html, body").animate(
            {
                scrollTop: newElement.offset().top - 100,
            },
            800,
        );
    });

    initializeDeviceIdField();
});
