import React, { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 3 + 1;
        this.density = Math.random() * 30 + 1;
        this.color = this.getRandomColor();
      }

      getRandomColor() {
        const colors = [
          'rgba(233, 30, 99, 0.25)',   // primary pink
          'rgba(186, 104, 200, 0.25)',  // purple
          'rgba(248, 187, 208, 0.25)',  // soft pink
          'rgba(212, 175, 55, 0.2)',    // gold
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 180; // Increased from 150 for larger effect area
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const directionX = dx / distance;
          const directionY = dy / distance;
          const moveX = directionX * force * this.density * 0.3; // Increased from 0.2
          const moveY = directionY * force * this.density * 0.3;
          
          this.x -= moveX;
          this.y -= moveY;
        } else {
          // Return to base position
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const spacing = 35; // Reduced from 50 for more particles
      for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
          particlesRef.current.push(new Particle(x, y));
        }
      }
    };
    initParticles();

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.x;
      mouseRef.current.y = e.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current.x, mouseRef.current.y);
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-background" />;
};

export default ParticleBackground;
