/* =========================================
   PRATHAM RATISH YADAV
   JOURNEY PAGE JS
========================================= */


const images = Array.from(
    document.querySelectorAll(".memory-card img, .featured-memory img")
);


const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");

const lightboxPrev = document.getElementById("lightboxPrev");

const lightboxNext = document.getElementById("lightboxNext");


let currentIndex = 0;



/* =========================================
   OPEN LIGHTBOX
========================================= */

function openLightbox(index) {

    if (!images[index]) return;

    currentIndex = index;

    lightboxImage.src = images[index].src;

    lightboxImage.alt = images[index].alt || "Journey memory";

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}



/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}



/* =========================================
   NEXT
========================================= */

function showNext() {

    currentIndex++;

    if (currentIndex >= images.length) {

        currentIndex = 0;

    }

    lightboxImage.src = images[currentIndex].src;

    lightboxImage.alt = images[currentIndex].alt || "Journey memory";
}



/* =========================================
   PREVIOUS
========================================= */

function showPrevious() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = images.length - 1;

    }

    lightboxImage.src = images[currentIndex].src;

    lightboxImage.alt = images[currentIndex].alt || "Journey memory";
}



/* =========================================
   IMAGE CLICK
========================================= */

images.forEach((image, index) => {

    image.addEventListener("click", () => {

        openLightbox(index);

    });

});



/* =========================================
   BUTTONS
========================================= */

lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightboxNext.addEventListener(
    "click",
    showNext
);


lightboxPrev.addEventListener(
    "click",
    showPrevious
);



/* =========================================
   BACKGROUND CLICK
========================================= */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});



/* =========================================
   KEYBOARD
========================================= */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) return;


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowRight") {

        showNext();

    }


    if (event.key === "ArrowLeft") {

        showPrevious();

    }

});



/* =========================================
   SCROLL REVEAL
========================================= */

const journeyItems =
    document.querySelectorAll(".journey-item");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.08
        }
    );


journeyItems.forEach((item) => {

    item.style.opacity = "0";

    item.style.transform = "translateY(35px)";

    item.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    revealObserver.observe(item);

});