import "bootstrap";
import { WeddingCountdown } from "./WeddingCountdown";
import { RSVPForm } from "./RSVPForm";
import { SmoothScroller } from "./SmoothScroller";
import { initEvent } from "./nav-fixer";

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

initEvent();
