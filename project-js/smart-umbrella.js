document.addEventListener("DOMContentLoaded", () => {

    const simulation = document.querySelector(".simulation");

    const startButton = document.getElementById("startSimulation");

    const resetButton = document.getElementById("resetSimulation");

    const progressFill = document.getElementById("progressFill");

    const progressLabel = document.getElementById("progressLabel");

    const progressPercent = document.getElementById("progressPercent");

    const simulationStep = document.getElementById("simulationStep");

    const waterLevel = document.getElementById("waterLevel");

    const umbrellaObject = document.getElementById("umbrellaObject");

    const workingSteps = document.querySelectorAll(".working-step");


    let timer = null;

    let currentStep = 0;

    const steps = [

        {
            label: "UMBRELLA PLACED",
            progress: 15,
            text: "Wet umbrella placed inside the stand."
        },

        {
            label: "AIR FLOW STARTED",
            progress: 35,
            text: "Proposed air-flow mechanism activated."
        },

        {
            label: "DRYING IN PROGRESS",
            progress: 60,
            text: "Air movement helps remove surface moisture."
        },

        {
            label: "WATER COLLECTING",
            progress: 82,
            text: "Water droplets are directed into the tray."
        },

        {
            label: "DRYING COMPLETE",
            progress: 100,
            text: "Proposed drying cycle completed."
        }

    ];


    function updateStep(index) {

        const step = steps[index];

        if (!step) return;


        currentStep = index;


        simulationStep.textContent = step.label;

        progressLabel.textContent = step.text;

        progressPercent.textContent = `${step.progress}%`;

        progressFill.style.width = `${step.progress}%`;


        workingSteps.forEach((item, itemIndex) => {

            item.classList.toggle(
                "active-step",
                itemIndex === index
            );

        });


        if (index === 0) {

            umbrellaObject.style.transform =
                "translateX(-50%)";

        }


        if (index === 1) {

            umbrellaObject.style.transform =
                "translateX(-50%) translateY(10px)";

        }


        if (index === 2) {

            umbrellaObject.style.transform =
                "translateX(-50%) translateY(15px)";

        }


        if (index === 3) {

            umbrellaObject.style.transform =
                "translateX(-50%) translateY(18px)";

            waterLevel.style.height = "55%";

        }


        if (index === 4) {

            umbrellaObject.style.transform =
                "translateX(-50%) translateY(20px)";

            waterLevel.style.height = "72%";

        }

    }


    function startSimulation() {

        clearInterval(timer);

        currentStep = 0;


        simulation.classList.add("playing");

        startButton.disabled = true;

        startButton.style.opacity = "0.6";

        startButton.innerHTML =
            "<span>●</span> Simulation Running";


        waterLevel.style.height = "0%";


        updateStep(0);


        timer = setInterval(() => {

            currentStep++;


            if (currentStep >= steps.length) {

                clearInterval(timer);

                simulation.classList.remove("playing");

                startButton.disabled = false;

                startButton.style.opacity = "1";

                startButton.innerHTML =
                    "<span>▶</span> Start Again";

                return;

            }


            updateStep(currentStep);

        }, 2200);

    }


    function resetSimulation() {

        clearInterval(timer);

        simulation.classList.remove("playing");


        currentStep = 0;


        progressFill.style.width = "0%";

        progressLabel.textContent =
            "Ready to start";

        progressPercent.textContent =
            "0%";

        simulationStep.textContent =
            "READY";


        waterLevel.style.height = "0%";


        umbrellaObject.style.transform =
            "translateX(-50%)";


        workingSteps.forEach((item, index) => {

            item.classList.toggle(
                "active-step",
                index === 0
            );

        });


        startButton.disabled = false;

        startButton.style.opacity = "1";

        startButton.innerHTML =
            "<span>▶</span> Start Simulation";

    }


    startButton.addEventListener(
        "click",
        startSimulation
    );


    resetButton.addEventListener(
        "click",
        resetSimulation
    );


    /* Initial State */

    resetSimulation();


    /* Scroll reveal */

    const revealElements =
        document.querySelectorAll(
            ".solution-card, .benefit-card, .component-item, .working-step"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(element);

    });

});