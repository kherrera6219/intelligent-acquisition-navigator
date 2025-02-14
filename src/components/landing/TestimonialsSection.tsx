
import { GlassCard } from "@/components/ui/universal/GlassCard";

const testimonials = [
  {
    quote: "ProcurityIQ has revolutionized our acquisition process, saving us countless hours while ensuring compliance at every step.",
    author: "Alice Brown",
    role: "Contracting Officer"
  },
  {
    quote: "The AI-powered insights have dramatically improved our market research efficiency and accuracy.",
    author: "James Wilson",
    role: "Program Manager"
  },
  {
    quote: "Outstanding compliance tracking and documentation management capabilities.",
    author: "Sarah Chen",
    role: "Procurement Analyst"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24" aria-labelledby="testimonials-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="testimonials-title" className="text-3xl font-bold text-white mb-4">
            Trusted by Federal Agencies
          </h2>
          <p className="text-xl text-gray-400">
            See how ProcurityIQ is transforming federal acquisition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <GlassCard key={i}>
              <p className="text-gray-400 mb-4">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                             rounded-full flex items-center justify-center">
                  <span className="text-fuchsia-400 font-semibold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
