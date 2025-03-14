
import React from "react";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { MainLayout } from "@/components/layout/MainLayout";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { GradientText } from "@/components/ui/universal/GradientText";
import { Shield, Award, Users, Code, Globe, BookOpen } from "lucide-react";

const AboutPage = () => {
  return (
    <PageErrorBoundary>
      <MainLayout
        variant="fluent"
        showHeader={true}
        showFooter={true}
        forceExternalHeader={true}
        forceExternalFooter={true}
        className="bg-background"
      >
        <Container className="py-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <GradientText>ProcurityIQ</GradientText>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're transforming government procurement with AI-powered intelligence
              across federal, state, and local levels.
            </p>
          </div>

          <Card variant="metal" className="p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              ProcurityIQ was founded with a singular mission: to revolutionize public sector 
              acquisition through the application of cutting-edge artificial intelligence. 
              We believe that efficient, transparent, and compliant procurement practices are 
              essential to the effective operation of government at all levels.
            </p>
            <p className="text-lg text-muted-foreground">
              Our 4D Knowledge Framework integrates regulations and best practices from 
              federal, state, and local jurisdictions, creating a comprehensive solution 
              that streamlines procurement workflows while ensuring strict compliance with 
              all applicable laws and regulations.
            </p>
          </Card>

          <h2 className="text-2xl font-bold mb-8 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card variant="glass" className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-10 h-10 text-primary mr-4" />
                <h3 className="text-xl font-semibold">Compliance</h3>
              </div>
              <p className="text-muted-foreground">
                We prioritize uncompromising compliance with all regulations at every level of government.
              </p>
            </Card>
            
            <Card variant="glass" className="p-6">
              <div className="flex items-center mb-4">
                <Award className="w-10 h-10 text-amber-400 mr-4" />
                <h3 className="text-xl font-semibold">Excellence</h3>
              </div>
              <p className="text-muted-foreground">
                We strive for excellence in every aspect of our solution and services.
              </p>
            </Card>
            
            <Card variant="glass" className="p-6">
              <div className="flex items-center mb-4">
                <Users className="w-10 h-10 text-blue-400 mr-4" />
                <h3 className="text-xl font-semibold">Collaboration</h3>
              </div>
              <p className="text-muted-foreground">
                We believe in working closely with our clients to understand their unique needs.
              </p>
            </Card>
            
            <Card variant="glass" className="p-6">
              <div className="flex items-center mb-4">
                <Code className="w-10 h-10 text-green-400 mr-4" />
                <h3 className="text-xl font-semibold">Innovation</h3>
              </div>
              <p className="text-muted-foreground">
                We continuously leverage the latest AI technology to improve our platform.
              </p>
            </Card>
            
            <Card variant="glass" className="p-6">
              <div className="flex items-center mb-4">
                <Globe className="w-10 h-10 text-violet-400 mr-4" />
                <h3 className="text-xl font-semibold">Accessibility</h3>
              </div>
              <p className="text-muted-foreground">
                We ensure our platform is accessible to all government agencies regardless of size.
              </p>
            </Card>
            
            <Card variant="glass" className="p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-10 h-10 text-rose-400 mr-4" />
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              <p className="text-muted-foreground">
                We're committed to educating and empowering procurement professionals.
              </p>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Want to learn more about how ProcurityIQ can transform your procurement process?
            </p>
            <a 
              href="/contact"
              className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us Today
            </a>
          </div>
        </Container>
      </MainLayout>
    </PageErrorBoundary>
  );
};

export default AboutPage;
