// Future animations or interactions can go here.
console.log("Page loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {
    const speakers = document.querySelectorAll(".speaker");

    function fadeInOnScroll() {
        speakers.forEach((speaker) => {
            const rect = speaker.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                speaker.style.opacity = "1";
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // Run initially
});

document.addEventListener("DOMContentLoaded", function () {
    const speakers = document.querySelectorAll(".speaker");

    function applyParallax() {
        speakers.forEach((speaker) => {
            let speed = 0.3; // Adjust speed for the parallax effect
            let offset = window.scrollY * speed;
            speaker.style.transform = `translateY(${offset}px)`;
        });
    }

    window.addEventListener("scroll", applyParallax);
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const imageContainers = document.querySelectorAll(".image-container img");
    const closeButton = document.querySelector(".close-btn");

    // Open Modal on Image Click
    imageContainers.forEach(image => {
        image.addEventListener("click", function () {
            modal.style.display = "flex";
            modalImage.src = this.src;
        });
    });

    // Close Modal on Close Button Click
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close Modal on Click Outside Image
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
