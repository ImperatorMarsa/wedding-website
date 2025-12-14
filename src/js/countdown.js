// Функция для склонения числительных
function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
    ];
}

// Функция для форматирования числа (добавление ведущего нуля, или для дней - трехзначный формат)
function formatNumber(number, isDays = false) {
    if (isDays) {
        // Дни: минимум 3 цифры
        return number.toString().padStart(3, "0");
    }
    // Часы, минуты, секунды: 2 цифры
    return number.toString().padStart(2, "0");
}

/**
 * Инициализирует и запускает обратный отсчет до даты свадьбы.
 * @param {string} targetDate - Дата, до которой ведется обратный отсчет в формате "YYYY-MM-DD HH:MM:SS".
 */
export function initCountdown(targetDate = "2026-08-22 17:00:00") {
    const targetTime = new Date(targetDate).getTime();

    const spanDays = document.getElementById("days");
    const spanHours = document.getElementById("hours");
    const spanMinutes = document.getElementById("minutes");
    const spanSeconds = document.getElementById("seconds");

    // Названия для склонения
    const titlesDays = ["День", "Дня", "Дней"];
    const titlesHours = ["Час", "Часа", "Часов"];
    const titlesMinutes = ["Минута", "Минуты", "Минут"];
    const titlesSeconds = ["Секунда", "Секунды", "Секунд"];

    const smallDays = spanDays.nextElementSibling;
    const smallHours = spanHours.nextElementSibling;
    const smallMinutes = spanMinutes.nextElementSibling;
    const smallSeconds = spanSeconds.nextElementSibling;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            if (spanDays) spanDays.textContent = "000";
            if (spanHours) spanHours.textContent = "00";
            if (spanMinutes) spanMinutes.textContent = "00";
            if (spanSeconds) spanSeconds.textContent = "00";
            if (document.getElementById("countdown")) {
                document.getElementById("countdown").querySelector("h2").textContent =
                    "Счастливый день настал!";
            }
            return;
        }

        // Расчет времени
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Обновление DOM
        if (spanDays) {
            spanDays.textContent = formatNumber(days, true);
            smallDays.textContent = declOfNum(days, titlesDays);
        }
        if (spanHours) {
            spanHours.textContent = formatNumber(hours);
            smallHours.textContent = declOfNum(hours, titlesHours);
        }
        if (spanMinutes) {
            spanMinutes.textContent = formatNumber(minutes);
            smallMinutes.textContent = declOfNum(minutes, titlesMinutes);
        }
        if (spanSeconds) {
            spanSeconds.textContent = formatNumber(seconds);
            smallSeconds.textContent = declOfNum(seconds, titlesSeconds);
        }
    }

    // Запускаем немедленно, чтобы избежать задержки в одну секунду
    updateCountdown();
    // Устанавливаем интервал обновления
    const timerInterval = setInterval(updateCountdown, 1000);
}

initCountdown(); // Если нужно запускать сразу после импорта
