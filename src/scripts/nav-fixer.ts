function adjustContentPadding(): void {
    const navbar = document.getElementById("mainNavbar");
    const homeSection = document.getElementById("home");

    if (navbar && homeSection) {
        const navbarHeight = navbar.offsetHeight;

        homeSection.style.marginTop = `${navbarHeight}px`;

        return;
    }

    console.error("Не удалось найти один или оба элемента: #mainNavbar или #home.");
}

export function initEvent() {
    document.addEventListener("DOMContentLoaded", () => {
        adjustContentPadding();

        window.addEventListener("resize", adjustContentPadding);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (this: HTMLAnchorElement, e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (!targetId) return;

            const targetElement = document.querySelector(targetId);
            const navbar = document.getElementById("mainNavbar");

            if (targetElement && navbar) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: "smooth",
                });
            }
        });
    });
}
