/* =====================================================
   GALLERY JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       LOADER
    ================================================= */

    const loader =
        document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        if (!loader) return;

        setTimeout(() => {
            loader.style.display = "none";
        }, 900);

    });


    /* =================================================
       ELEMENTS
    ================================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const videoCards =
        Array.from(
            document.querySelectorAll(".video-card")
        );

    const imageCards =
        Array.from(
            document.querySelectorAll(".image-card")
        );


    const mediaViewer =
        document.getElementById("mediaViewer");

    const viewerImage =
        document.getElementById("viewerImage");

    const viewerVideo =
        document.getElementById("viewerVideo");

    const viewerClose =
        document.getElementById("viewerClose");

    const viewerPrev =
        document.getElementById("viewerPrev");

    const viewerNext =
        document.getElementById("viewerNext");


    let currentIndex = 0;


    /* =================================================
       FILTER
    ================================================= */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;


            videoCards.forEach(card => {

                const show =
                    filter === "all" ||
                    filter === "videos";

                card.classList.toggle(
                    "gallery-item-hidden",
                    !show
                );

            });


            imageCards.forEach(card => {

                const category =
                    card.dataset.category;

                const show =
                    filter === "all" ||
                    filter === category;

                card.classList.toggle(
                    "gallery-item-hidden",
                    !show
                );

            });

        });

    });


    /* =================================================
       VIDEO CARD CLICK
       
       IMPORTANT:
       We don't use inline <video> anymore.
       Thumbnail opens the real MP4 directly
       inside the viewer.
    ================================================= */

    videoCards.forEach((card, index) => {

        card.addEventListener("click", () => {

            const videoPath =
                card.dataset.video;

            if (!videoPath) {
                console.error(
                    "Video path missing:",
                    card
                );

                return;
            }

            openVideo(
                videoPath,
                index
            );

        });

    });


    /* =================================================
       IMAGE CARD CLICK
    ================================================= */

    imageCards.forEach(card => {

        card.addEventListener("click", () => {

            const imagePath =
                card.dataset.image;

            if (!imagePath) return;

            openImage(
                imagePath,
                card
            );

        });

    });


    /* =================================================
       OPEN VIDEO
    ================================================= */

    function openVideo(
        videoPath,
        index
    ) {

        currentIndex = index;


        /* IMAGE OFF */

        viewerImage.classList.remove(
            "active"
        );

        viewerImage.src = "";


        /* VIDEO ON */

        viewerVideo.classList.add(
            "active"
        );


        /*
         * Reset old video completely.
         */

        viewerVideo.pause();

        viewerVideo.removeAttribute(
            "src"
        );

        viewerVideo.load();


        /*
         * Set new MP4.
         */

        viewerVideo.src = videoPath;

        viewerVideo.controls = true;

        viewerVideo.playsInline = true;

        viewerVideo.setAttribute(
            "playsinline",
            ""
        );


        /*
         * Muted first.
         *
         * Browser autoplay policies allow
         * muted autoplay more reliably.
         */

        viewerVideo.muted = true;


        mediaViewer.classList.add(
            "active"
        );

        mediaViewer.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "viewer-open"
        );


        /*
         * Load the actual MP4.
         */

        viewerVideo.load();


        /*
         * Start after browser loads data.
         */

        const startVideo = async () => {

            try {

                await viewerVideo.play();

            } catch (error) {

                console.log(
                    "Autoplay blocked. Press the play button.",
                    error
                );

            }

        };


        if (
            viewerVideo.readyState >= 2
        ) {

            startVideo();

        } else {

            viewerVideo.addEventListener(
                "loadeddata",
                startVideo,
                {
                    once: true
                }
            );

        }

    }


    /* =================================================
       OPEN IMAGE
    ================================================= */

    function openImage(
        imagePath,
        card
    ) {

        viewerVideo.pause();

        viewerVideo.removeAttribute(
            "src"
        );

        viewerVideo.load();

        viewerVideo.classList.remove(
            "active"
        );


        viewerImage.src = imagePath;

        viewerImage.classList.add(
            "active"
        );


        const visibleImages =
            Array.from(
                document.querySelectorAll(
                    ".image-card:not(.gallery-item-hidden)"
                )
            );


        currentIndex =
            visibleImages.indexOf(card);


        mediaViewer.classList.add(
            "active"
        );

        mediaViewer.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "viewer-open"
        );

    }


    /* =================================================
       CLOSE VIEWER
    ================================================= */

    function closeViewer() {

        mediaViewer.classList.remove(
            "active"
        );

        mediaViewer.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "viewer-open"
        );


        viewerVideo.pause();

        viewerVideo.removeAttribute(
            "src"
        );

        viewerVideo.load();


        viewerImage.src = "";

        viewerImage.classList.remove(
            "active"
        );

        viewerVideo.classList.remove(
            "active"
        );

    }


    viewerClose.addEventListener(
        "click",
        closeViewer
    );


    /* =================================================
       NEXT VIDEO
    ================================================= */

    viewerNext.addEventListener(
        "click",
        () => {

            const visibleVideos =
                videoCards.filter(
                    card =>
                        !card.classList.contains(
                            "gallery-item-hidden"
                        )
                );


            if (!visibleVideos.length) {

                showNextImage();

                return;

            }


            let position =
                visibleVideos.indexOf(
                    videoCards[currentIndex]
                );


            if (position === -1) {
                position = 0;
            }


            position =
                (position + 1) %
                visibleVideos.length;


            const nextCard =
                visibleVideos[position];


            const nextIndex =
                videoCards.indexOf(
                    nextCard
                );


            openVideo(
                nextCard.dataset.video,
                nextIndex
            );

        }
    );


    /* =================================================
       PREVIOUS VIDEO
    ================================================= */

    viewerPrev.addEventListener(
        "click",
        () => {

            const visibleVideos =
                videoCards.filter(
                    card =>
                        !card.classList.contains(
                            "gallery-item-hidden"
                        )
                );


            if (!visibleVideos.length) {

                showPreviousImage();

                return;

            }


            let position =
                visibleVideos.indexOf(
                    videoCards[currentIndex]
                );


            if (position === -1) {
                position = 0;
            }


            position =
                (
                    position -
                    1 +
                    visibleVideos.length
                ) %
                visibleVideos.length;


            const previousCard =
                visibleVideos[position];


            const previousIndex =
                videoCards.indexOf(
                    previousCard
                );


            openVideo(
                previousCard.dataset.video,
                previousIndex
            );

        }
    );


    /* =================================================
       IMAGE NAVIGATION
    ================================================= */

    function showNextImage() {

        const visibleImages =
            Array.from(
                document.querySelectorAll(
                    ".image-card:not(.gallery-item-hidden)"
                )
            );


        if (!visibleImages.length) return;


        let index =
            currentIndex;


        index =
            (index + 1) %
            visibleImages.length;


        const card =
            visibleImages[index];


        openImage(
            card.dataset.image,
            card
        );

    }


    function showPreviousImage() {

        const visibleImages =
            Array.from(
                document.querySelectorAll(
                    ".image-card:not(.gallery-item-hidden)"
                )
            );


        if (!visibleImages.length) return;


        let index =
            currentIndex;


        index =
            (
                index -
                1 +
                visibleImages.length
            ) %
            visibleImages.length;


        const card =
            visibleImages[index];


        openImage(
            card.dataset.image,
            card
        );

    }


    /* =================================================
       KEYBOARD
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !mediaViewer.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (event.key === "Escape") {
                closeViewer();
            }


            if (event.key === "ArrowRight") {
                viewerNext.click();
            }


            if (event.key === "ArrowLeft") {
                viewerPrev.click();
            }

        }
    );


    /* =================================================
       CLICK BACKGROUND TO CLOSE
    ================================================= */

    mediaViewer.addEventListener(
        "click",
        event => {

            if (
                event.target === mediaViewer
            ) {

                closeViewer();

            }

        }
    );


    /* =================================================
       SWIPE
    ================================================= */

    let touchStartX = 0;

    mediaViewer.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    mediaViewer.addEventListener(
        "touchend",
        event => {

            const touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchStartX - touchEndX;


            if (Math.abs(difference) < 50) {
                return;
            }


            if (difference > 0) {

                viewerNext.click();

            } else {

                viewerPrev.click();

            }

        },
        {
            passive: true
        }
    );


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.08
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

});
