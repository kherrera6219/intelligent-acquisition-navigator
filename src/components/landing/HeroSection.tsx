
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { GradientText } from "@/components/ui/universal/GradientText";
import { GradientButton } from "@/components/ui/universal/GradientButton";
import { useToast } from "@/hooks/use-toast";

const KnowledgeGraphAnimation = () => {
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
      color: string;
      connections: Node[];
      targetX: number;
      targetY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 2; // Larger nodes
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.color = `hsla(${Math.random() * 40 + 220}, 70%, 80%, 0.6)`; // Brighter, silvery colors
        this.connections = [];
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height;
      }

      draw() {
        if (!ctx) return;
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 2
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections with gradient
        this.connections.forEach(node => {
          const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y);
          gradient.addColorStop(0, `hsla(220, 70%, 80%, 0.15)`);
          gradient.addColorStop(1, `hsla(240, 70%, 80%, 0.05)`);

          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      }

      update() {
        // Smooth movement towards target
        this.vx += (this.targetX - this.x) * 0.0005;
        this.vy += (this.targetY - this.y) * 0.0005;
        
        this.x += this.vx;
        this.y += this.vy;

        // Boundary check
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -0.5;
          this.targetX = Math.random() * canvas.width;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -0.5;
          this.targetY = Math.random() * canvas.height;
        }

        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;
      }
    }

    // Create more nodes for a denser network
    const nodes: Node[] = Array(80).fill(null).map(() => new Node());

    // Create more connections
    nodes.forEach(node => {
      const connectionCount = Math.floor(Math.random() * 4) + 2;
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

      // Occasionally create new connections
      if (Math.random() < 0.03) {
        const nodeA = nodes[Math.floor(Math.random() * nodes.length)];
        const nodeB = nodes[Math.floor(Math.random() * nodes.length)];
        if (nodeA !== nodeB && !nodeA.connections.includes(nodeB)) {
          nodeA.connections.push(nodeB);
        }
      }

      // Occasionally update target positions
      if (Math.random() < 0.01) {
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
      className="absolute inset-0 w-full h-full opacity-70"
      style={{ 
        mixBlendMode: 'screen',
        background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(200,200,255,0.05))'
      }}
    />
  );
};

export const HeroSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDemoRequest = () => {
    toast({
      title: "Demo Request Received",
      description: "Our team will contact you shortly to schedule a demo.",
    });
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-[#221F26]">
        <KnowledgeGraphAnimation />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 id="hero-title" className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            <GradientText>Next-Generation</GradientText>
            <br />
            <span className="text-white">
              Acquisition Management
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10">
            Streamline your procurement process with AI-powered insights and compliance automation.
          </p>
          <div className="flex gap-4 justify-center">
            <GradientButton
              onClick={() => navigate("/signup")}
              size="lg"
              gradientVariant="primary"
              aria-label="Get started with ProcurityIQ"
            >
              Get Started
            </GradientButton>
            <GradientButton
              onClick={handleDemoRequest}
              gradientVariant="secondary"
              size="lg"
              aria-label="Request a demo of ProcurityIQ"
            >
              Request Demo
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
};
