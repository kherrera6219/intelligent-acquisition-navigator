
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Globe, Users, ShieldCheck, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Alex Wilson',
      role: 'CEO & Founder',
      image: '/images/avatar1.jpg',
      initials: 'AW',
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      image: '/images/avatar2.jpg',
      initials: 'SC',
    },
    {
      name: 'Michael Johnson',
      role: 'Head of Acquisition Knowledge',
      image: '/images/avatar3.jpg',
      initials: 'MJ',
    },
    {
      name: 'Jesse Smith',
      role: 'Federal Compliance Director',
      image: '/images/avatar4.jpg',
      initials: 'JS',
    },
  ];

  const valueProps = [
    {
      icon: <CheckCircle className="h-10 w-10 text-blue-500" />,
      title: 'Compliance Focused',
      description: 'We prioritize adherence to all federal acquisition regulations, ensuring your procurement processes remain compliant.',
    },
    {
      icon: <Award className="h-10 w-10 text-blue-500" />,
      title: 'Excellence in Service',
      description: 'Our commitment to excellence drives us to deliver comprehensive acquisition solutions that exceed expectations.',
    },
    {
      icon: <Globe className="h-10 w-10 text-blue-500" />,
      title: 'Global Standards',
      description: 'We implement best practices from around the world, tailored to meet federal acquisition requirements.',
    },
    {
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: 'Collaborative Approach',
      description: 'We work closely with stakeholders to ensure transparency and inclusion throughout the acquisition process.',
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-blue-500" />,
      title: 'Secure and Trusted',
      description: 'Our platform meets rigorous security standards, protecting sensitive acquisition data at all times.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-blue-500" />,
      title: 'Innovative Solutions',
      description: 'We continuously evolve our tools and methodologies to address the changing landscape of federal acquisition.',
    },
  ];

  return (
    <ExternalPageLayout title="About Us" description="Learn more about our mission, team, and values.">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Our Story</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About Acquisition Knowledge Framework</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're dedicated to revolutionizing federal acquisition processes through intelligent automation, 
            comprehensive knowledge management, and regulatory compliance.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="p-8 bg-gradient-to-br from-blue-900/40 to-gray-800 border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-gray-300">
              To empower federal agencies with integrated acquisition solutions that streamline processes, 
              ensure compliance, and maximize value for taxpayer dollars through innovative technology and expert guidance.
            </p>
          </Card>
          
          <Card className="p-8 bg-gradient-to-br from-indigo-900/40 to-gray-800 border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
            <p className="text-gray-300">
              A future where federal acquisition is efficient, transparent, and accessible, 
              leveraging cutting-edge technology to serve the public interest with integrity and excellence.
            </p>
          </Card>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">What We Stand For</Badge>
            <h2 className="text-3xl font-bold text-white">Our Core Values</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueProps.map((value, index) => (
              <Card key={index} className="p-6 bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Meet Our Team</Badge>
            <h2 className="text-3xl font-bold text-white">Leadership Team</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
              Our team brings decades of experience in federal acquisition, technology, and regulatory compliance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 bg-gray-800 border-gray-700 text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="bg-blue-700 text-white text-lg">{member.initials}</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Our Journey</Badge>
            <h2 className="text-3xl font-bold text-white">Company History</h2>
          </div>
          
          <div className="relative border-l border-gray-700 pl-8 ml-4 space-y-10">
            <div className="relative">
              <div className="absolute -left-11 mt-1.5 h-6 w-6 rounded-full border border-blue-500 bg-gray-900 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">2018: Foundation</h3>
                <p className="text-gray-400 mt-2">
                  AKF was established with the mission to modernize federal acquisition processes.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-11 mt-1.5 h-6 w-6 rounded-full border border-blue-500 bg-gray-900 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">2020: Platform Launch</h3>
                <p className="text-gray-400 mt-2">
                  Released our flagship Acquisition Knowledge Platform to streamline federal procurement.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-11 mt-1.5 h-6 w-6 rounded-full border border-blue-500 bg-gray-900 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">2022: AI Integration</h3>
                <p className="text-gray-400 mt-2">
                  Implemented advanced AI technologies to enhance decision-making and regulatory compliance.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-11 mt-1.5 h-6 w-6 rounded-full border border-blue-500 bg-gray-900 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">2024: Global Expansion</h3>
                <p className="text-gray-400 mt-2">
                  Expanded services to support international acquisition standards while maintaining our focus on federal compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExternalPageLayout>
  );
}
