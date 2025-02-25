
import { useEffect, useRef } from "react";

export const KnowledgeGraphAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Node {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      baseGlow: number;
      glow: number;
      glowDirection: number;
      connections: Node[];
      targetX: number;
      targetY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.baseGlow = 0.3 + Math.random() * 0.3;
        this.glow = this.baseGlow;
        this.glowDirection = Math.random() < 0.5 ? -1 : 1;
        this.connections = [];
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height;
      }

      draw() {
        if (!ctx) return;

        // Pulsating glow effect
        this.glow += 0.01 * this.glowDirection;
        if (this.glow > this.baseGlow + 0.3 || this.glow < this.baseGlow - 0.3) {
          this.glowDirection *= -1;
        }
        
        // Enhanced glow effect with multiple layers
        const gradientInner = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 4
        );
        gradientInner.addColorStop(0, `rgba(255, 255, 255, ${this.glow})`);
        gradientInner.addColorStop(0.5, `rgba(220, 220, 255, ${this.glow * 0.5})`);
        gradientInner.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradientInner;
        ctx.fill();

        // Draw connections with gradient and glow
        this.connections.forEach(node => {
          const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y);
          const alpha = Math.max(0.05, 
            (1 - Math.hypot(this.x - node.x, this.y - node.y) / 300) * 0.2
          );
          
          gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * this.glow})`);
          gradient.addColorStop(1, `rgba(220, 220, 255, ${alpha * node.glow})`);

          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      }

      update() {
        // Smooth movement with inertia
        this.vx += (this.targetX - this.x) * 0.0002;
        this.vy += (this.targetY - this.y) * 0.0002;
        
        this.x += this.vx;
        this.y += this.vy;

        // Boundary check with smooth transition
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -0.5;
          this.targetX = Math.random() * canvas.width;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -0.5;
          this.targetY = Math.random() * canvas.height;
        }

        // Damping for smoother movement
        this.vx *= 0.99;
        this.vy *= 0.99;
      }
    }

    // Create nodes network
    const nodes: Node[] = Array(60).fill(null).map(() => new Node());

    // Create initial connections
    nodes.forEach(node => {
      const connectionCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < connectionCount; i++) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (randomNode !== node && !node.connections.includes(randomNode)) {
          node.connections.push(randomNode);
        }
      }
    });

    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(34, 31, 38, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      // Dynamic connections
      if (Math.random() < 0.01) {
        const nodeA = nodes[Math.floor(Math.random() * nodes.length)];
        const nodeB = nodes[Math.floor(Math.random() * nodes.length)];
        if (nodeA !== nodeB && !nodeA.connections.includes(nodeB)) {
          nodeA.connections = nodeA.connections.filter(n => 
            Math.hypot(n.x - nodeA.x, n.y - nodeA.y) < 300
          );
          nodeA.connections.push(nodeB);
        }
      }

      // Update target positions occasionally
      if (Math.random() < 0.005) {
        nodes[Math.floor(Math.random() * nodes.length)].targetX = Math.random() * canvas.width;
        nodes[Math.floor(Math.random() * nodes.length)].targetY = Math.random() * canvas.height;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-80"
      style={{ 
        mixBlendMode: 'screen',
        background: 'linear-gradient(to bottom right, rgba(40,38,45,0.9), rgba(34,31,38,0.95))'
      }}
    />
  );
};
