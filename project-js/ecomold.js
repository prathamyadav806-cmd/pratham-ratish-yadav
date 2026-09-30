/* =========================================================
   ECOMOLD PACKAGING
   INTERACTIVE MANUFACTURING SIMULATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PROCESS DATA
    ===================================================== */

    const processSteps = [
        {
            number: "01",
            title: "Waste Collection",
            description:
                "Sugarcane waste, paper, leaves and other suitable eco-friendly raw materials are collected.",
            state: "waste"
        },

        {
            number: "02",
            title: "Cleaning & Sorting",
            description:
                "Collected materials are cleaned and sorted according to their type and usability.",
            state: "clean"
        },

        {
            number: "03",
            title: "Fiber / Pulp Preparation",
            description:
                "Selected materials are prepared into a suitable fiber or pulp form for further processing.",
            state: "pulp"
        },

        {
            number: "04",
            title: "Eco-Material Mixing",
            description:
                "Prepared materials are mixed to create a suitable eco-friendly material for moulding.",
            state: "mixing"
        },

        {
            number: "05",
            title: "Moulding",
            description:
                "The prepared eco-material is placed into a suitable mould to form the required packaging shape.",
            state: "mould"
        },

        {
            number: "06",
            title: "Drying",
            description:
                "The moulded packaging is dried to improve its shape, strength and stability.",
            state: "dry"
        },

        {
            number: "07",
            title: "Finishing",
            description:
                "The dried product is checked, refined and given its final finishing for better usability and appearance.",
            state: "finishing"
        },

        {
            number: "08",
            title: "EcoMold Packaging",
            description:
                "The finished eco-friendly packaging product is ready as the final concept output.",
            state: "final"
        }
    ];


    /* =====================================================
       SELECT ELEMENTS
    ===================================================== */

    const simulation =
        document.querySelector(".manufacturing-simulation");

    const stepItems =
        document.querySelectorAll(".process-step");

    const progressFill =
        document.querySelector(".progress-fill");

    const progressText =
        document.querySelector(".progress-text");

    const currentStage =
        document.querySelector(".current-stage");

    const stageDescription =
        document.querySelector(".stage-description");

    const simulationScene =
        document.querySelector(".simulation-scene");

    const replayButton =
        document.querySelector(".replay-simulation");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!simulation) {
        return;
    }


    /* =====================================================
       VARIABLES
    ===================================================== */

    let currentStep = 0;

    let animationTimer = null;

    let hasStarted = false;


    /* =====================================================
       UPDATE SIMULATION
    ===================================================== */

    function updateStep(index) {

        /* ---------------------------------------------
           LIMIT INDEX
        --------------------------------------------- */

        if (index < 0) {
            index = 0;
        }

        if (index >= processSteps.length) {
            index = processSteps.length - 1;
        }


        currentStep = index;


        const step =
            processSteps[index];


        /* ---------------------------------------------
           UPDATE PROCESS STEP ITEMS
        --------------------------------------------- */

        stepItems.forEach((item, itemIndex) => {

            item.classList.remove(
                "active",
                "completed"
            );


            /* Previous steps */

            if (itemIndex < index) {

                item.classList.add(
                    "completed"
                );
            }


            /* Current step */

            if (itemIndex === index) {

                item.classList.add(
                    "active"
                );
            }

        });


        /* ---------------------------------------------
           UPDATE PROGRESS
        --------------------------------------------- */

        const progress =
            ((index + 1) /
                processSteps.length) *
            100;


        if (progressFill) {

            progressFill.style.width =
                `${progress}%`;
        }


        if (progressText) {

            progressText.textContent =
                `${String(index + 1).padStart(2, "0")} / ${String(processSteps.length).padStart(2, "0")}`;
        }


        /* ---------------------------------------------
           UPDATE CURRENT STAGE TITLE
        --------------------------------------------- */

        if (currentStage) {

            currentStage.textContent =
                step.title;
        }


        /* ---------------------------------------------
           UPDATE DESCRIPTION
        --------------------------------------------- */

        if (stageDescription) {

            stageDescription.textContent =
                step.description;
        }


        /* ---------------------------------------------
           UPDATE SIMULATION SCENE
        --------------------------------------------- */

        if (simulationScene) {

            simulationScene.classList.remove(
                "state-waste",
                "state-clean",
                "state-pulp",
                "state-mixing",
                "state-mould",
                "state-dry",
                "state-finishing",
                "state-final"
            );


            simulationScene.classList.add(
                `state-${step.state}`
            );
        }


        /* ---------------------------------------------
           DATA ATTRIBUTES
        --------------------------------------------- */

        simulation.dataset.step =
            String(index + 1);

        simulation.dataset.state =
            step.state;


        /* ---------------------------------------------
           FINAL STATE
        --------------------------------------------- */

        if (
            index ===
            processSteps.length - 1
        ) {

            simulation.classList.add(
                "simulation-complete"
            );

        } else {

            simulation.classList.remove(
                "simulation-complete"
            );
        }

    }


    /* =====================================================
       START AUTOMATIC SIMULATION
    ===================================================== */

    function startSimulation() {

        /* Clear previous timer */

        clearInterval(
            animationTimer
        );


        /* Reset */

        currentStep = 0;


        simulation.classList.add(
            "simulation-running"
        );

        simulation.classList.remove(
            "simulation-complete"
        );


        /* Show first step */

        updateStep(0);


        /* ---------------------------------------------
           AUTOMATIC STEP CHANGE
        --------------------------------------------- */

        animationTimer =
            setInterval(() => {

                if (
                    currentStep <
                    processSteps.length - 1
                ) {

                    currentStep++;

                    updateStep(
                        currentStep
                    );

                } else {

                    /* ---------------------------------
                       SIMULATION FINISHED
                    --------------------------------- */

                    clearInterval(
                        animationTimer
                    );


                    simulation.classList.remove(
                        "simulation-running"
                    );


                    simulation.classList.add(
                        "simulation-complete"
                    );

                }

            }, 2600);

    }


    /* =====================================================
       REPLAY SIMULATION
    ===================================================== */

    function replaySimulation() {

        /* Stop current animation */

        clearInterval(
            animationTimer
        );


        /* Remove final state */

        simulation.classList.remove(
            "simulation-complete"
        );

        simulation.classList.remove(
            "simulation-running"
        );


        /* Reset */

        currentStep = 0;


        updateStep(0);


        /* ---------------------------------------------
           Restart after small delay
        --------------------------------------------- */

        setTimeout(() => {

            startSimulation();

        }, 250);

    }


    /* =====================================================
       MANUAL STEP SELECTION
    ===================================================== */

    stepItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                () => {

                    /* Stop automatic animation */

                    clearInterval(
                        animationTimer
                    );


                    simulation.classList.remove(
                        "simulation-running"
                    );


                    /* Show selected step */

                    updateStep(
                        index
                    );

                }
            );

        }
    );


    /* =====================================================
       REPLAY BUTTON
    ===================================================== */

    if (replayButton) {

        replayButton.addEventListener(
            "click",
            replaySimulation
        );

    }


    /* =====================================================
       AUTO START ON SCROLL
    ===================================================== */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting &&
                            !hasStarted
                        ) {

                            hasStarted = true;


                            /* Small delay before starting */

                            setTimeout(() => {

                                startSimulation();

                            }, 500);

                        }

                    }
                );

            },
            {
                threshold: 0.25
            }
        );


    observer.observe(
        simulation
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateStep(0);

});
