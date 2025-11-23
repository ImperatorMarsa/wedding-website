// Smooth Scrolling

export class SmoothScroller {
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
