import { useEffect, useState, useRef } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/universal/Card";
import { Grid } from "@/components/ui/universal/Grid";
import { Container } from "@/components/ui/universal/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Clock, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';

interface Solicitation {
  id: string;
  title: string;
  status: string;
  risk_level: string;
  due_date: string;
  department: string;
}

const KnowledgeGraphBackground = () => {
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

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = `hsla(${Math.random() * 60 + 240}, 50%, 50%, 0.3)`;
        this.connections = [];
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        this.connections.forEach(node => {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `hsla(${Math.random() * 60 + 240}, 50%, 50%, 0.1)`;
          ctx.stroke();
        });
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.vx += (Math.random() - 0.5) * 0.1;
        this.vy += (Math.random() - 0.5) * 0.1;

        this.vx = Math.max(Math.min(this.vx, 1), -1);
        this.vy = Math.max(Math.min(this.vy, 1), -1);
      }
    }

    const nodes: Node[] = Array(50).fill(null).map(() => new Node());

    nodes.forEach(node => {
      const connectionCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < connectionCount; i++) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (randomNode !== node && !node.connections.includes(randomNode)) {
          node.connections.push(randomNode);
        }
      }
    });

    const animate = () => {
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      if (Math.random() < 0.01) {
        const nodeA = nodes[Math.floor(Math.random() * nodes.length)];
        const nodeB = nodes[Math.floor(Math.random() * nodes.length)];
        if (nodeA !== nodeB && !nodeA.connections.includes(nodeB)) {
          nodeA.connections.push(nodeB);
        }
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
      className="fixed inset-0 -z-10 bg-[#221F26] opacity-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

const SolicitationReviewPage = () => {
  const { toast } = useToast();
  const [solicitations, setSolicitations] = useState<Solicitation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolicitations();
  }, []);

  const fetchSolicitations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('solicitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching solicitations:', error);
        toast({
          title: "Error",
          description: "Failed to load solicitations",
          variant: "destructive"
        });
      } else {
        setSolicitations(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-400/20 text-green-400";
      case "medium":
        return "bg-yellow-400/20 text-yellow-400";
      case "high":
        return "bg-red-400/20 text-red-400";
      default:
        return "bg-gray-400/20 text-gray-400";
    }
  };

  const handleReviewClick = (id: string) => {
    toast({
      title: "Review Started",
      description: "Opening solicitation review workspace...",
    });
  };

  if (loading) {
    return (
      <Container>
        <KnowledgeGraphBackground />
        <PageHeader
          title="Loading Solicitations"
          description="Please wait while we fetch the data..."
        />
      </Container>
    );
  }

  return (
    <Container>
      <KnowledgeGraphBackground />
      <PageHeader
        title="Solicitation Review"
        description="Review and analyze solicitation documents"
      />

      <Card className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
          <div className="relative w-full sm:w-auto sm:flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search solicitations..."
              className="pl-10 bg-white/5 border-white/10 w-full"
            />
          </div>
          <Button variant="outline" className="border-white/10 w-full sm:w-auto">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>
      </Card>

      <Grid columns={1} gap="lg">
        {solicitations.map((solicitation) => (
          <Card
            key={solicitation.id}
            className="hover:bg-white/5 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
              <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-violet-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white">
                    {solicitation.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-1">
                    <span className="text-sm text-gray-400">
                      {solicitation.department}
                    </span>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <div
                      className={`px-2 py-0.5 rounded-full text-xs ${getRiskBadgeColor(
                        solicitation.risk_level
                      )}`}
                    >
                      {solicitation.risk_level.toUpperCase()} RISK
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-gray-400 justify-center sm:justify-start">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Due {solicitation.due_date}</span>
                </div>
                <Button
                  onClick={() => handleReviewClick(solicitation.id)}
                  className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                           hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600
                           w-full sm:w-auto"
                >
                  Review
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default SolicitationReviewPage;
