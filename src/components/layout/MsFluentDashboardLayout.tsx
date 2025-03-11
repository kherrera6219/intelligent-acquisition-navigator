
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { Container, Row, Col } from "@/components/ui/universal/Grid";
import { Card } from "@/components/ui/universal/Card";
import { Link } from "react-router-dom";
import { HelpCircle, Settings, Search, Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlexBetween } from "@/components/ui/universal/Flexbox";

interface MsFluentDashboardLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  fullWidth?: boolean;
}

export function MsFluentDashboardLayout({
  children,
  title,
  description,
  className,
  sidebar,
  header,
  footer,
  fullWidth = false,
}: MsFluentDashboardLayoutProps) {
  // Sidebar Nav Items - These could be passed as props in a more flexible implementation
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'Home' },
    { name: 'Documents', href: '/acquisition/document-control', icon: 'FileText' },
    { name: 'Analytics', href: '/analytics', icon: 'BarChart' },
    { name: 'Proposals', href: '/proposals', icon: 'ClipboardCheck' },
    { name: 'Knowledge Base', href: '/knowledge-base', icon: 'Book' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
  ];

  return (
    <div className="ms-layout-container min-h-screen h-full bg-background">
      {/* Top Navigation Bar */}
      {header || (
        <header className="ms-fluent-panel border-b border-border/40 py-2 px-3 md:px-6 h-16 sticky top-0 z-40">
          <Container fluid>
            <FlexBetween>
              <div className="flex items-center space-x-4">
                <div className="font-semibold text-xl tracking-tight ms-text-balance">
                  {title || "Procurity Dashboard"}
                </div>
                
                {/* Search bar */}
                <div className="hidden md:flex relative">
                  <span className="absolute left-2.5 top-2.5 text-gray-400">
                    <Search className="h-4 w-4" />
                  </span>
                  <input 
                    type="search" 
                    placeholder="Search..." 
                    className="pl-9 pr-4 py-2 bg-white/5 border border-border/40 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 w-64"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <HelpCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Settings className="h-5 w-5" />
                </Button>
                <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-medium">
                  AM
                </div>
              </div>
            </FlexBetween>
          </Container>
        </header>
      )}

      <div className="flex flex-1 h-[calc(100vh-4rem)]">
        {/* Side Navigation */}
        <div className={cn(
          "w-64 border-r border-border/40 p-4 hidden md:block transition-all",
          sidebar ? "md:block" : "md:block"
        )}>
          {sidebar || (
            <nav className="space-y-1 flex flex-col h-full">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="ms-nav-link flex items-center px-3 py-2 text-sm rounded-md transition-colors group hover:bg-white/5"
                  >
                    <span className="flex-1">{item.name}</span>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto pt-4 border-t border-border/40">
                <a href="#help" className="ms-nav-link text-sm">Help & Support</a>
                <a href="#feedback" className="ms-nav-link text-sm">Send Feedback</a>
              </div>
            </nav>
          )}
        </div>

        {/* Main Content Area */}
        <div className={cn(
          "flex-1 overflow-y-auto",
          className
        )}>
          <Container 
            fluid={fullWidth}
            className="py-6"
          >
            {description && (
              <Row className="mb-6">
                <Col>
                  <p className="text-muted-foreground">{description}</p>
                </Col>
              </Row>
            )}
            
            {/* Main Content */}
            {children}
          </Container>

          {/* Footer */}
          {footer || (
            <footer className="border-t border-border/40 py-4 px-6 mt-auto">
              <Container>
                <Row>
                  <Col className="text-sm text-muted-foreground">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
                      <div>© 2024 Procurity. All rights reserved.</div>
                      <div className="d-flex gap-4">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
