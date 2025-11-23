/**
 * Particle Playground
 * A high-performance interactive particle system using HTML5 Canvas.
 */

class Particle {
    constructor(x, y, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // Random velocity
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;

        // Base properties
        this.baseSize = Math.random() * 3 + 1;
        this.size = this.baseSize;
        this.friction = 0.98; // For smooth movement
        this.ease = 0.1; // For lerping

        // Color (HSL)
        this.hue = Math.random() * 360;
        this.lightness = 50;
    }

    update(mouse, config) {
        // Calculate distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse interaction radius
        const radius = 150;

        if (distance < radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (radius - distance) / radius;

            if (config.repel) {
                // Repel force
                const repelStrength = 5;
                this.vx -= forceDirectionX * force * repelStrength;
                this.vy -= forceDirectionY * force * repelStrength;
            } else if (config.orbit) {
                // Orbit force (perpendicular to direction)
                const orbitStrength = 2;
                this.vx += forceDirectionY * force * orbitStrength;
                this.vy -= forceDirectionX * force * orbitStrength;

                // Gentle attraction to keep them in orbit
                this.vx += forceDirectionX * force * 0.5;
                this.vy += forceDirectionY * force * 0.5;
            } else {
                // Default: Gentle attraction/disturbance
                // this.vx += forceDirectionX * force * 0.5;
                // this.vy += forceDirectionY * force * 0.5;
            }

            // Color shift based on proximity/speed
            this.lightness = 70;
        } else {
            this.lightness = 50;
        }

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Friction (damping)
        this.vx *= this.friction;
        this.vy *= this.friction;

        // Boundary wrap
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.x > this.canvasWidth) this.x = 0;
        if (this.y < 0) this.y = this.canvasHeight;
        if (this.y > this.canvasHeight) this.y = 0;

        // Minimum movement to keep scene alive
        if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.2;
        if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`;
        ctx.fill();
        // Glow effect is handled by global composite operation or shadowBlur
        // but for performance with many particles, we might skip individual shadows
        // and rely on the trail effect for glow.
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -1000, y: -1000 }; // Start off-screen

        this.config = {
            trail: true,
            repel: true,
            orbit: false,
            particleCount: 800,
            darkMode: true
        };

        this.resize();
        this.initParticles();
        this.setupEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Update canvas dimensions for existing particles
        this.particles.forEach(p => {
            p.canvasWidth = this.canvas.width;
            p.canvasHeight = this.canvas.height;
        });
    }

    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particles.push(new Particle(x, y, this.canvas.width, this.canvas.height));
        }
    }

    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => this.resize());

        // Mouse movement
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // UI Controls
        document.getElementById('trail-toggle').addEventListener('change', (e) => {
            this.config.trail = e.target.checked;
        });

        document.getElementById('repel-toggle').addEventListener('change', (e) => {
            this.config.repel = e.target.checked;
            if (this.config.repel) {
                this.config.orbit = false;
                document.getElementById('orbit-toggle').checked = false;
            }
        });

        document.getElementById('orbit-toggle').addEventListener('change', (e) => {
            this.config.orbit = e.target.checked;
            if (this.config.orbit) {
                this.config.repel = false;
                document.getElementById('repel-toggle').checked = false;
            }
        });

        const countSlider = document.getElementById('particle-count');
        const countDisplay = document.getElementById('count-display');
        countSlider.addEventListener('input', (e) => {
            this.config.particleCount = parseInt(e.target.value);
            countDisplay.textContent = this.config.particleCount;
            // Re-init if count changes significantly or just add/remove?
            // For simplicity, re-init (might be abrupt) or adjust array
            this.adjustParticleCount();
        });

        document.getElementById('dark-mode-toggle').addEventListener('change', (e) => {
            this.config.darkMode = e.target.checked;
            if (this.config.darkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        });

        // Initialize theme
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    adjustParticleCount() {
        const currentCount = this.particles.length;
        const targetCount = this.config.particleCount;

        if (targetCount > currentCount) {
            for (let i = 0; i < targetCount - currentCount; i++) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                this.particles.push(new Particle(x, y, this.canvas.width, this.canvas.height));
            }
        } else if (targetCount < currentCount) {
            this.particles.splice(targetCount);
        }
    }

    animate() {
        // Clear canvas
        if (this.config.trail) {
            // Trail effect: draw semi-transparent rectangle instead of clearing
            this.ctx.fillStyle = this.config.darkMode ? 'rgba(10, 10, 10, 0.2)' : 'rgba(240, 240, 240, 0.2)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Composite operation for glow effect (additive blending)
        if (this.config.darkMode) {
            this.ctx.globalCompositeOperation = 'lighter';
        } else {
            this.ctx.globalCompositeOperation = 'source-over'; // Normal blending for light mode
        }

        // Update and draw particles
        for (let particle of this.particles) {
            particle.update(this.mouse, this.config);
            particle.draw(this.ctx);
        }

        // Reset composite operation
        this.ctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame(() => this.animate());
    }
}

// Start the app
window.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
