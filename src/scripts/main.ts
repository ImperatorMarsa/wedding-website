import "bootstrap";

// Countdown Timer
interface CountdownElements {
    days: HTMLElement;
    hours: HTMLElement;
    minutes: HTMLElement;
    seconds: HTMLElement;
}

class WeddingCountdown {
    private weddingDate: Date;
    private elements: CountdownElements;
    private intervalId: number | null = null;

    constructor(elements: CountdownElements, weddingDate: string) {
        this.weddingDate = new Date(weddingDate);
        this.elements = elements;
        this.init();
    }

    private init(): void {
        this.updateCountdown();
        this.intervalId = window.setInterval(() => this.updateCountdown(), 1000);
    }

    private updateCountdown(): void {
        const now = new Date();
        const diff = this.weddingDate.getTime() - now.getTime();

        if (diff <= 0) {
            this.setToZero();
            this.stop();
            return;
        }

        const { days, hours, minutes, seconds } = this.calculateTimeUnits(diff);
        this.updateDisplay(days, hours, minutes, seconds);
    }

    private calculateTimeUnits(diff: number): {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    private updateDisplay(days: number, hours: number, minutes: number, seconds: number): void {
        this.elements.days.textContent = days.toString();
        this.elements.hours.textContent = hours.toString();
        this.elements.minutes.textContent = minutes.toString();
        this.elements.seconds.textContent = seconds.toString();
    }

    private setToZero(): void {
        Object.values(this.elements).forEach((el) => {
            el.textContent = "0";
        });
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Form Validation
class RSVPForm {
    private form: HTMLFormElement;

    constructor(formId: string) {
        this.form = document.getElementById(formId) as HTMLFormElement;
        if (!this.form) throw new Error(`Form with id ${formId} not found`);
        this.init();
    }

    private init(): void {
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();

        if (!this.form.checkValidity()) {
            event.stopPropagation();
            this.form.classList.add("was-validated");
            return;
        }

        this.showSuccessMessage();
        this.form.reset();
        this.form.classList.remove("was-validated");
    }

    private showSuccessMessage(): void {
        alert("Спасибо за ваш ответ! Мы сохранили ваши данные.");
    }
}

// Smooth Scrolling
class SmoothScroller {
    constructor() {
        this.init();
    }

    private init(): void {
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", this.handleClick.bind(this));
        });
    }

    private handleClick(event: Event): void {
        event.preventDefault();
        const targetId = (event.currentTarget as HTMLAnchorElement).getAttribute("href");

        if (!targetId) return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.pageYOffset - 70,
            behavior: "smooth",
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Countdown
    const countdownElements = {
        days: document.getElementById("days") as HTMLElement,
        hours: document.getElementById("hours") as HTMLElement,
        minutes: document.getElementById("minutes") as HTMLElement,
        seconds: document.getElementById("seconds") as HTMLElement,
    };

    new WeddingCountdown(countdownElements, "2026-08-22T16:00:00");

    // RSVP Form
    try {
        new RSVPForm("rsvpForm");
    } catch (error) {
        console.error(error);
    }

    // Smooth Scrolling
    new SmoothScroller();
});
