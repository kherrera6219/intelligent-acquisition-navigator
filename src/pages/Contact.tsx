import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GradientText } from "@/components/ui/universal/GradientText";
import { GlassCard } from "@/components/ui/universal/GlassCard";
import { GradientButton } from "@/components/ui/universal/GradientButton";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    // TODO: integrate with a backend email service (e.g., Supabase Edge Function)
    await new Promise<void>((resolve) => setTimeout(resolve, 500)); // simulated network
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    reset();
  };

  const contactItems = [
    { icon: Mail, title: "Email", info: import.meta.env.VITE_CONTACT_EMAIL as string | undefined ?? "contact@acquisitionnavigator.gov" },
    { icon: Phone, title: "Phone", info: import.meta.env.VITE_CONTACT_PHONE as string | undefined ?? "+1 (800) 555-0100" },
    { icon: MessageSquare, title: "Live Chat", info: "Available 24/7" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <GradientText>Get in Touch</GradientText>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      autoComplete="name"
                      {...register("name")}
                      className="bg-white/5 border-white/10 text-white"
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      className="bg-white/5 border-white/10 text-white"
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="mt-1 text-sm text-red-400" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    {...register("subject")}
                    className="bg-white/5 border-white/10 text-white"
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    className="bg-white/5 border-white/10 text-white h-32"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <GradientButton
                  type="submit"
                  className="w-full"
                  gradientVariant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </GradientButton>
              </form>
            </GlassCard>
          </div>

          <div className="space-y-6">
            {contactItems.map((item) => (
              <GlassCard key={item.title}>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20
                                 rounded-lg flex items-center justify-center" aria-hidden="true">
                    <item.icon className="h-6 w-6 text-fuchsia-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.info}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
