class ParallaxManager {
    constructor() {
        this.ticking = false;
        this.sections = [];
        this.init();
    }

    init() {
        // Initialize parallax elements
        this.heroParallax = document.querySelector('.hero');
        this.speakerGrid = document.querySelectorAll('.speaker');
        this.brochure = document.querySelector('.event-brochure');

        // Add scroll listener
        window.addEventListener('scroll', () => this.onScroll());

        // Initial position check
        this.updatePositions();
    }

    onScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updatePositions();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updatePositions() {
        const scrolled = window.pageYOffset;

        // Hero parallax effect
        if (this.heroParallax) {
            const heroSpeed = scrolled * 0.5;
            const diagonal1 = this.heroParallax.querySelector('.hero-diagonal-1');
            const diagonal2 = this.heroParallax.querySelector('.hero-diagonal-2');

            if (diagonal1) {
                diagonal1.style.transform = `translateY(${heroSpeed * 0.3}px)`;
            }
            if (diagonal2) {
                diagonal2.style.transform = `translateY(${heroSpeed * 0.6}px)`;
            }
        }

        // Speaker cards staggered parallax
        this.speakerGrid.forEach((speaker, index) => {
            const rect = speaker.getBoundingClientRect();
            const centerPosition = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distanceFromCenter = centerPosition - viewportCenter;
            const parallaxSpeed = distanceFromCenter * 0.1;

            if (this.isElementInView(speaker)) {
                speaker.style.setProperty('--parallax-speed', `${parallaxSpeed}px`);
                speaker.style.opacity = this.calculateOpacity(rect.top);
            }
        });

        // Event brochure parallax
        if (this.brochure && this.isElementInView(this.brochure)) {
            const rect = this.brochure.getBoundingClientRect();
            const parallaxSpeed = rect.top * 0.1;
            this.brochure.style.setProperty('--parallax-speed', `${parallaxSpeed}px`);
        }
    }

    isElementInView(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    calculateOpacity(elementTop) {
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset;
        const elementPosition = elementTop + scrollPosition;
        const distance = Math.abs(scrollPosition + viewportHeight / 2 - elementPosition);
        return Math.max(0, Math.min(1, 1 - distance / (viewportHeight / 2)));
    }
}

// Initialize parallax effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxManager();
}); 