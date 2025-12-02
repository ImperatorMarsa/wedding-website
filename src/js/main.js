// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import ScrollAnimator from "./fade-ini";

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        new ScrollAnimator();
    });
} else {
    new ScrollAnimator();
}
