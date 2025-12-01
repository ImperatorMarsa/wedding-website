// Импорт стилей (если используете Vite)
import "./main.scss";
// Импорт JS части Bootstrap (для работы выпадающих списков, модальных окон и т.д.)
import "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvpForm") as HTMLFormElement;
    const messageBox = document.getElementById("formMessage") as HTMLDivElement;

    if (form) {
        form.addEventListener("submit", (event: Event) => {
            event.preventDefault();
            event.stopPropagation();

            if (!form.checkValidity()) {
                form.classList.add("was-validated");
                return;
            }

            // Сбор данных
            const formData = {
                name: (document.getElementById("guestName") as HTMLInputElement).value,
                attendance: (document.getElementById("attendance") as HTMLSelectElement).value,
                food: (document.getElementById("foodPrefs") as HTMLTextAreaElement).value,
                alcohol: (document.getElementById("alcohol") as HTMLInputElement).value,
            };

            // Имитация отправки (замените fetch на ваш API)
            console.log("Отправка данных:", formData);

            // UI Feedback
            const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
            const originalText = btn.innerText;
            btn.disabled = true;
            btn.innerText = "Отправка...";

            // Симуляция задержки сервера
            setTimeout(() => {
                form.reset();
                form.classList.remove("was-validated");
                btn.disabled = false;
                btn.innerText = originalText;

                messageBox.classList.remove("d-none");
                messageBox.className = "mt-3 text-center text-success fw-bold";
                messageBox.innerText = `Спасибо, ${formData.name}! Ваш ответ записан.`;
            }, 1000);
        });
    }
});
