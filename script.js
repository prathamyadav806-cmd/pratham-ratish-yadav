/* ========================================
   PRATHAM RATISH YADAV
   PERSONAL PORTFOLIO
   MAIN JAVASCRIPT
======================================== */


/* ========================================
   HEADER SCROLL EFFECT
======================================== */

const header = document.querySelector("header");

function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleHeaderScroll, {
    passive: true
});

handleHeaderScroll();


/* ========================================
   SCROLL REVEAL
======================================== */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .about-side, .journey-preview, .skill-card, .project-card, .contact-content"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);
            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("revealed");
    });

}


/* ========================================
   ACTIVE NAVIGATION
======================================== */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

    const navObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const currentId = entry.target.getAttribute("id");

                navLinks.forEach((link) => {

                    const linkTarget = link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        linkTarget === `#${currentId}`
                    );

                });

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach((section) => {
        navObserver.observe(section);
    });

}


/* ========================================
   SMOOTH NAVIGATION
======================================== */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ========================================
   PROJECT MODAL
   Compatibility for existing HTML
======================================== */

const projectModal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");


function openProject(project) {

    if (!projectModal || !modalContent) return;

    const projects = {

        ecomold: {
            category: "ENTREPRENEURSHIP",
            title: "EcoMold Packaging",
            description:
                "An eco-friendly packaging concept developed as part of an Entrepreneurship Development project.",
            details: [
                {
                    title: "Focus",
                    text: "Sustainable packaging using waste-based and natural materials."
                },
                {
                    title: "Materials",
                    text: "Sugarcane waste, paper and natural leaves."
                }
            ]
        },

        umbrella: {
            category: "MINI PROJECT",
            title: "Smart Umbrella Stand",
            description:
                "A practical concept designed to handle wet umbrellas and collect excess water.",
            details: [
                {
                    title: "Problem",
                    text: "Wet umbrellas can create water accumulation and inconvenience indoors."
                },
                {
                    title: "Approach",
                    text: "A simple practical stand concept focused on drying and water collection."
                }
            ]
        },

        erp: {
            category: "WEB APPLICATION",
            title: "Gurukul Home Tuition ERP",
            description:
                "A digital management system created to organize tuition-related student records and daily operations.",
            details: [
                {
                    title: "Purpose",
                    text: "Manage students, attendance, fees and tuition records digitally."
                },
                {
                    title: "Focus",
                    text: "Simple, practical and organized tuition management."
                }
            ]
        }

    };


    const data = projects[project];

    if (!data) return;


    let detailsHTML = "";

    if (data.details && data.details.length) {

        detailsHTML = `
            <div class="modal-details">

                ${data.details.map((detail) => `
                    <div class="detail-box">

                        <h4>${detail.title}</h4>

                        <p>${detail.text}</p>

                    </div>
                `).join("")}

            </div>
        `;

    }


    modalContent.innerHTML = `

        <span class="modal-category">
            ${data.category}
        </span>

        <h2 class="modal-title">
            ${data.title}
        </h2>

        <p class="modal-description">
            ${data.description}
        </p>

        ${detailsHTML}

    `;


    projectModal.classList.add("active");

    projectModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

}


/* ========================================
   CLOSE PROJECT MODAL
======================================== */

function closeProject() {

    if (!projectModal) return;

    projectModal.classList.remove("active");

    projectModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

}


/* ========================================
   ESCAPE KEY
======================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeProject();
    }

});


/* ========================================
   MODAL CLICK OUTSIDE
======================================== */

if (projectModal) {

    projectModal.addEventListener("click", (event) => {

        if (event.target.classList.contains("modal-overlay")) {
            closeProject();
        }

    });

}


/* ========================================
   IMAGE ERROR HANDLING
======================================== */

document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {

        image.classList.add("image-error");

    });

});


/* ========================================
   CURRENT YEAR
======================================== */

const currentYearElements = document.querySelectorAll("[data-current-year]");

currentYearElements.forEach((element) => {

    element.textContent = new Date().getFullYear();

});


/* ========================================
   PAGE READY
======================================== */

document.documentElement.classList.add("js-ready");

console.log("Pratham Ratish Yadav Portfolio Loaded");
/* =========================================================
   INDEX OPENING — JAVASCRIPT CONTROLLER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const opening = document.getElementById("indexOpening");

    if (!opening) return;

    opening.style.display = "flex";
    opening.style.visibility = "visible";
    opening.style.opacity = "1";

    setTimeout(function () {

        opening.classList.add("index-opening-hide");

    }, 5000);

});