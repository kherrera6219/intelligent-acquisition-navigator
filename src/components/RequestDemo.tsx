
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const RequestDemo = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo requested!",
      description: "We'll be in touch with you shortly.",
    });
  };

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Acquisition Process?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Request a demo today and see how Procurity.AI can revolutionize your organization.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your work email"
              className="w-full bg-white/10 text-white placeholder:text-white/60 border-white/20"
              required
            />
            <Button size="lg" variant="default" className="w-full bg-white text-primary hover:bg-white/90">
              Request Demo
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RequestDemo;
