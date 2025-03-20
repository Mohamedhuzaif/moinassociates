// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Highlight active menu item on scroll
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("nav ul li a");
    
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 50;
        let height = section.offsetHeight;
        let id = section.getAttribute("id");
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});

//scroll to document row and highlight
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".service-card").forEach((card) => {
        card.addEventListener("click", function () {
            let docId = this.getAttribute("data-doc"); // Get the related document ID
            if (docId) {
                let targetRow = document.getElementById(docId); // Find the table row

                if (targetRow) {
                    // Scroll smoothly to the exact document row
                    targetRow.scrollIntoView({ behavior: "smooth", block: "center" });

                    // Wait for scrolling to complete, then highlight
                    setTimeout(() => {
                        // Remove existing highlights
                        document.querySelectorAll("tr").forEach((row) => {
                            row.style.transition = "background-color 0.5s ease-in-out";
                            row.style.backgroundColor = "";
                        });

                        // Highlight the target row
                        targetRow.style.backgroundColor = "yellow";

                        // Remove highlight after 3 seconds
                        setTimeout(() => {
                            targetRow.style.backgroundColor = "";
                        }, 3000);
                    }, 700); // Wait for 700ms before highlighting
                }
            }
        });
    });
});

// image slider amination
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".image-slider");
    const images = slider.querySelectorAll("img");
    const sliderWrapper = document.querySelector(".image-slider-wrapper");

    // Clone images to create an infinite scrolling effect
    images.forEach(img => {
        let clone = img.cloneNode(true);
        slider.appendChild(clone);
    });

    let scrollSpeed = 1; // Adjust speed
    let scrollAmount = 0;

    function slideImages() {
        scrollAmount -= scrollSpeed;
        slider.style.transform = `translateX(${scrollAmount}px)`;

        // Reset position when reaching the end
        if (Math.abs(scrollAmount) >= slider.scrollWidth / 2) {
            scrollAmount = 0;
        }

        requestAnimationFrame(slideImages);
    }

    slideImages();
});