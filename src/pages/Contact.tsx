
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8 bg-black/40 backdrop-blur-sm border-white/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white h-32"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                             hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                               rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-fuchsia-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-gray-400">contact@procurityiq.com</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                               rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-fuchsia-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                               rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-fuchsia-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Live Chat</h3>
                  <p className="text-gray-400">Available 24/7</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
