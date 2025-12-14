// js/formSubmit.js

/**
 * URL опубликованного скрипта Google Apps Script (замените на свой URL)
 * ВАЖНО: URL должен заканчиваться на /exec
 */
const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwcJe930yFjSTLbDiB9_jbWID1QlCAO7nkrIX6yTi5mq_BEI2jJx5OBLLj2HCjh-jI5Pw/exec";

const form = document.getElementById("guestForm");
const spinner = document.getElementById("loadingSpinner");
const submitButton = document.getElementById("submitButton");
const messageContainer = document.getElementById("formMessage");

// Функция для отображения сообщений (Success/Error)
function displayMessage(type, message) {
    // Удаляем предыдущие сообщения
    messageContainer.innerHTML = "";

    // Создаем Alert на базе Bootstrap
    const alertClass = type === "success" ? "alert-success" : "alert-danger";
    const alertHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    messageContainer.innerHTML = alertHTML;

    if (type === "error") {
        // Добавляем класс, который активирует стили валидации Bootstrap
        form.classList.add("was-validated");
    }
    // Прячем сообщение через 5 секунд (если это успех)
    if (type === "success") {
        setTimeout(() => {
            const alertElement = messageContainer.querySelector(".alert");
            if (alertElement) {
                // Используем Bootstrap API для закрытия
                bootstrap.Alert.getInstance(alertElement)?.close();
            }
        }, 5000);
    }
}

// Функция для управления состоянием формы (блокировка/разблокировка)
function toggleFormState(isSubmitting) {
    if (isSubmitting) {
        spinner.classList.remove("d-none"); // Показать спиннер
        submitButton.disabled = true; // Отключить кнопку
        form.classList.add("disabled-form"); // Опционально: добавить класс для стилизации всей формы
    } else {
        spinner.classList.add("d-none"); // Скрыть спиннер
        submitButton.disabled = false; // Включить кнопку
        form.classList.remove("disabled-form");
    }
}

// Основная функция отправки формы
async function submitGuestForm(e) {
    e.preventDefault(); // Останавливаем стандартную перезагрузку страницы

    const isValid = form.checkValidity();

    // Добавляем класс, который активирует стили валидации Bootstrap
    form.classList.add("was-validated");
    if (!isValid) {
        // Если форма не прошла валидацию, предотвращаем ее отправку
        e.stopPropagation();

        return;
    }

    // Сброс предыдущих сообщений
    messageContainer.innerHTML = "";

    // 1. Блокировка формы и отображение спиннера
    toggleFormState(true);

    // Сбрасываем состояние валидации Bootstrap
    form.classList.remove("was-validated");

    // 2. Сбор данных формы
    // FormData автоматически собирает пары name/value из полей с атрибутом name
    const formData = new FormData(form);

    // Добавление информации о браузере/ОС (полезные метаданные)
    formData.append("UserAgent", navigator.userAgent);
    // Вывод DeviceID в консоль для отладки
    console.log("Отправляется Device ID:", formData.get("DeviceID"));

    try {
        // 3. Отправка данных асинхронно
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: formData,
            // Обратите внимание: не нужно устанавливать Content-Type: multipart/form-data.
            // fetch сам сделает это правильно при передаче объекта FormData.
        });

        // 4. Обработка ответа от Google Apps Script
        // Скрипт обычно возвращает JSON-объект с { result: 'success' } или { result: 'error' }
        const result = await response.json();

        if (result.result === "success") {
            displayMessage("success", "✅ Анкета успешно отправлена! Спасибо за подтверждение.");

            // Очищаем форму от введенных данных
            form.reset();
        } else {
            // Если скрипт вернул ошибку
            displayMessage(
                "error",
                "❌ Произошла ошибка при отправке. Пожалуйста, попробуйте позже.",
            );
            console.error("Apps Script Error:", result.error);
        }
    } catch (error) {
        // Ошибка сети или другая техническая ошибка
        displayMessage(
            "error",
            "❌ Ошибка подключения. Проверьте соединение или обратитесь к организатору.",
        );
        console.error("Fetch Error:", error);
    } finally {
        // 5. Разблокировка формы (выполняется всегда, даже при ошибке)
        toggleFormState(false);
    }
}

// Добавление слушателя события на отправку формы
if (form) {
    form.addEventListener("submit", submitGuestForm, false);
}
