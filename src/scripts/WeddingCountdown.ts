// Countdown Timer

interface CountdownElements {
    days: HTMLElement;
    hours: HTMLElement;
    minutes: HTMLElement;
    seconds: HTMLElement;
}

export class WeddingCountdown {
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
