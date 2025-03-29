
import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  imageSrc?: string;
  bio: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  imageSrc, 
  bio,
  socialLinks
}) => {
  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border/5 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:translate-y-[-4px] hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-primary/20">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl font-bold text-primary/20">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-primary text-sm mb-3">{role}</p>
        <p className="text-muted-foreground text-sm mb-4">{bio}</p>
        
        {socialLinks && (
          <div className="flex space-x-3">
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {socialLinks.email && (
              <a href={`mailto:${socialLinks.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const TeamSection: React.FC = () => {
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Jennifer Blakely",
      role: "Chief Executive Officer",
      bio: "Former procurement director with 15+ years of government acquisition experience. Leading the vision for intelligent procurement solutions.",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        email: "jennifer@procurityiq.com"
      }
    },
    {
      name: "Michael Tran",
      role: "Chief Technology Officer",
      bio: "AI and machine learning expert with a background in federal IT systems. Architecting the technological foundation of our platform.",
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Sarah Williams",
      role: "Chief Compliance Officer",
      bio: "Former federal acquisition attorney with deep expertise in procurement regulations across all government levels.",
      socialLinks: {
        linkedin: "#",
        email: "sarah@procurityiq.com"
      }
    },
    {
      name: "David Rodriguez",
      role: "VP of Customer Success",
      bio: "Specializes in government digital transformation initiatives with a focus on user adoption and measured outcomes.",
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];
  
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet the experienced professionals driving our mission forward with expertise in government acquisition, technology, and compliance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            role={member.role}
            imageSrc={member.imageSrc}
            bio={member.bio}
            socialLinks={member.socialLinks}
          />
        ))}
      </div>
    </div>
  );
};
