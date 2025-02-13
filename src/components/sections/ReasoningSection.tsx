
import { Book, Scale, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const ReasoningSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      className="py-24 relative overflow-hidden"
      aria-labelledby="reasoning-title"
    >
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="container-module">
        <motion.div 
          className="flex-module-col flex-module-center text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 
                        bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm rounded-full"
                        role="presentation">
            <Book className="w-4 h-4 text-violet-400 mr-2" aria-hidden="true" />
            <span className="text-sm text-violet-300 font-medium">Why Choose Our Solution</span>
          </div>
          <h2 
            id="reasoning-title"
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                       bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 mb-6"
          >
            Federal Acquisition Excellence
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering acquisition professionals with AI-driven insights while maintaining 
            strict compliance with federal regulations.
          </p>
        </motion.div>

        <div className="grid-module-3 grid-module-gap-lg mb-16">
          {[
            {
              id: "far-compliance",
              title: "FAR Compliance",
              description: "Built-in compliance checks ensure adherence to Federal Acquisition Regulations and agency-specific requirements.",
              icon: Scale,
              color: "violet"
            },
            {
              id: "security",
              title: "Security First",
              description: "FedRAMP High and CMMC Level 3 certified platform with end-to-end encryption and comprehensive audit trails.",
              icon: Shield,
              color: "fuchsia"
            },
            {
              id: "results",
              title: "Proven Results",
              description: "Streamline acquisition processes by up to 60% while maintaining accuracy and regulatory compliance.",
              icon: CheckCircle,
              color: "pink"
            }
          ].map(({ id, title, description, icon: Icon, color }, index) => (
            <motion.div 
              key={id}
              className="glass-card spacing-module-lg glass-card-hover group"
              role="article"
              aria-labelledby={`${id}-title`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={fadeInUp}
            >
              <div className="flex-module-start flex-module-gap-md mb-6">
                <div className={`p-3 rounded-lg bg-${color}-500/20`}>
                  <Icon className={`h-6 w-6 text-${color}-400 group-hover:scale-110 transition-transform`} aria-hidden="true" />
                </div>
                <h3 id={`${id}-title`} className="text-xl font-semibold text-white">{title}</h3>
              </div>
              <p className="text-gray-400">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
