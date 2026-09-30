document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. PAGE READY
    ====================================================== */

    document.body.classList.add("erp-page-ready");


    /* =====================================================
       2. SCROLL REVEAL
    ====================================================== */

    const revealSelectors = [
        ".section-heading",
        ".story-main",
        ".story-step",
        ".overview-main",
        ".stat-card",
        ".problem-intro",
        ".problem-point",
        ".idea-main",
        ".idea-points > div",
        ".solution-card",
        ".large-screenshot-card",
        ".feature-text",
        ".feature-image",
        ".form-image",
        ".form-content",
        ".attendance-content",
        ".attendance-image",
        ".feature-card",
        ".process-card",
        ".technology-main",
        ".technology-list > div",
        ".contribution-main",
        ".contribution-list > div",
        ".solo-statement",
        ".status-card",
        ".takeaway-card",
        ".future-section",
        ".hero-content",
        ".hero-dashboard"
    ];


    const revealElements = document.querySelectorAll(
        revealSelectors.join(", ")
    );


    revealElements.forEach((element, index) => {

        element.classList.add("js-reveal");

        element.style.transitionDelay =
            `${Math.min(index * 0.045, 0.35)}s`;

    });


    /* =====================================================
       3. INTERSECTION OBSERVER
    ====================================================== */

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.10,
            rootMargin: "0px 0px -60px 0px"
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       4. NAVBAR SCROLL EFFECT
    ====================================================== */

    const nav = document.querySelector(".project-nav");


    const handleNavbarScroll = () => {

        if (!nav) {
            return;
        }


        if (window.scrollY > 35) {

            nav.classList.add("erp-nav-scrolled");

        } else {

            nav.classList.remove("erp-nav-scrolled");

        }

    };


    handleNavbarScroll();


    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       5. IMAGE LIGHTBOX
    ====================================================== */

    const projectImages = document.querySelectorAll(
        [
            ".hero-dashboard img",
            ".dashboard-frame img",
            ".screenshot-image img",
            ".feature-image img",
            ".form-image img",
            ".attendance-image img"
        ].join(", ")
    );


    if (projectImages.length > 0) {

        createLightbox();

    }


    function createLightbox() {

        /* -----------------------------------------------
           Overlay
        ------------------------------------------------ */

        const lightbox = document.createElement("div");

        lightbox.className = "erp-lightbox";


        lightbox.innerHTML = `
            <div class="erp-lightbox-backdrop"></div>

            <div class="erp-lightbox-content">

                <button
                    class="erp-lightbox-close"
                    type="button"
                    aria-label="Close image"
                >
                    ×
                </button>

                <img
                    class="erp-lightbox-image"
                    src=""
                    alt=""
                >

            </div>
        `;


        document.body.appendChild(lightbox);


        const lightboxImage =
            lightbox.querySelector(
                ".erp-lightbox-image"
            );


        const closeButton =
            lightbox.querySelector(
                ".erp-lightbox-close"
            );


        const backdrop =
            lightbox.querySelector(
                ".erp-lightbox-backdrop"
            );


        /* -----------------------------------------------
           Open
        ------------------------------------------------ */

        const openLightbox = (image) => {

            if (!image || !image.src) {
                return;
            }


            lightboxImage.src = image.currentSrc || image.src;

            lightboxImage.alt =
                image.alt || "ERP Project Screenshot";


            lightbox.classList.add("active");

            document.body.classList.add(
                "erp-lightbox-open"
            );

        };


        /* -----------------------------------------------
           Close
        ------------------------------------------------ */

        const closeLightbox = () => {

            lightbox.classList.remove("active");

            document.body.classList.remove(
                "erp-lightbox-open"
            );

        };


        /* -----------------------------------------------
           Image click
        ------------------------------------------------ */

        projectImages.forEach((image) => {

            image.addEventListener("click", () => {

                openLightbox(image);

            });

        });


        /* -----------------------------------------------
           Close button
        ------------------------------------------------ */

        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        /* -----------------------------------------------
           Backdrop click
        ------------------------------------------------ */

        backdrop.addEventListener(
            "click",
            closeLightbox
        );


        /* -----------------------------------------------
           ESC key
        ------------------------------------------------ */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains("active")
                ) {

                    closeLightbox();

                }

            }
        );


        /* -----------------------------------------------
           Inject lightbox CSS
        ------------------------------------------------ */

        const lightboxStyle =
            document.createElement("style");


        lightboxStyle.textContent = `

            body.erp-lightbox-open {
                overflow: hidden;
            }

            .erp-lightbox {
                position: fixed;
                inset: 0;
                z-index: 99999;

                display: flex;
                align-items: center;
                justify-content: center;

                padding: 30px;

                opacity: 0;
                visibility: hidden;

                pointer-events: none;

                transition:
                    opacity 0.35s ease,
                    visibility 0.35s ease;
            }

            .erp-lightbox.active {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
            }

            .erp-lightbox-backdrop {
                position: absolute;
                inset: 0;

                background:
                    rgba(3, 5, 7, 0.88);

                backdrop-filter:
                    blur(16px);

                -webkit-backdrop-filter:
                    blur(16px);
            }

            .erp-lightbox-content {
                position: relative;
                z-index: 2;

                width: min(
                    1200px,
                    94vw
                );

                max-height: 90vh;

                display: flex;
                align-items: center;
                justify-content: center;

                transform:
                    scale(0.94)
                    translateY(12px);

                transition:
                    transform 0.4s
                    cubic-bezier(
                        0.22,
                        1,
                        0.36,
                        1
                    );
            }

            .erp-lightbox.active
            .erp-lightbox-content {
                transform:
                    scale(1)
                    translateY(0);
            }

            .erp-lightbox-image {
                display: block;

                max-width: 100%;
                max-height: 86vh;

                width: auto;
                height: auto;

                object-fit: contain;

                border-radius: 12px;

                box-shadow:
                    0 40px 100px
                    rgba(0, 0, 0, 0.45);
            }

            .erp-lightbox-close {
                position: absolute;

                top: -52px;
                right: 0;

                width: 40px;
                height: 40px;

                display: grid;
                place-items: center;

                border: 1px solid
                    rgba(255,255,255,0.16);

                border-radius: 50%;

                background:
                    rgba(255,255,255,0.08);

                color: #ffffff;

                font-size: 25px;
                line-height: 1;

                cursor: pointer;

                transition:
                    transform 0.25s ease,
                    background 0.25s ease;
            }

            .erp-lightbox-close:hover {
                transform: rotate(90deg);

                background:
                    rgba(255,255,255,0.16);
            }

            @media (max-width: 650px) {

                .erp-lightbox {
                    padding: 18px;
                }

                .erp-lightbox-close {
                    top: -48px;
                    right: 0;
                }

                .erp-lightbox-image {
                    max-height: 82vh;
                    border-radius: 8px;
                }

            }

        `;


        document.head.appendChild(
            lightboxStyle
        );

    }


    /* =====================================================
       6. IMAGE HOVER EFFECT
    ====================================================== */

    const hoverImages = document.querySelectorAll(
        [
            ".hero-dashboard img",
            ".screenshot-image img",
            ".feature-image img",
            ".form-image img",
            ".attendance-image img"
        ].join(", ")
    );


    hoverImages.forEach((image) => {

        image.addEventListener(
            "mouseenter",
            () => {

                image.style.transform =
                    "scale(1.015)";

            }
        );


        image.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       7. SMOOTH INTERNAL LINKS
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       8. SOLO BADGE MICRO ANIMATION
    ====================================================== */

    const soloBadge =
        document.querySelector(".solo-badge");


    if (soloBadge) {

        soloBadge.addEventListener(
            "mouseenter",
            () => {

                soloBadge.style.transform =
                    "translateY(-2px)";

            }
        );


        soloBadge.addEventListener(
            "mouseleave",
            () => {

                soloBadge.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       9. CARD HOVER ACCESSIBILITY
    ====================================================== */

    const interactiveCards =
        document.querySelectorAll(
            [
                ".solution-card",
                ".feature-card",
                ".process-card",
                ".takeaway-card",
                ".stat-card"
            ].join(", ")
        );


    interactiveCards.forEach((card) => {

        card.addEventListener(
            "focusin",
            () => {

                card.classList.add(
                    "card-focused"
                );

            }
        );


        card.addEventListener(
            "focusout",
            () => {

                card.classList.remove(
                    "card-focused"
                );

            }
        );

    });


    /* =====================================================
       10. CURRENT YEAR
    ====================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );


    if (yearElements.length > 0) {

        const currentYear =
            new Date().getFullYear();


        yearElements.forEach((element) => {

            element.textContent =
                currentYear;

        });

    }


    /* =====================================================
       11. REDUCED MOTION SUPPORT
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        revealElements.forEach((element) => {

            element.classList.add(
                "is-visible"
            );

            element.style.transitionDelay =
                "0s";

        });

    }


    /* =====================================================
       12. PAGE LOAD
    ====================================================== */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "erp-loaded"
        );

    });


});