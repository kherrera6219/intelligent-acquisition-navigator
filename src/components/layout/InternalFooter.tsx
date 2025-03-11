
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '@/components/ui/universal/Grid';

export const InternalFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900/95 border-t border-gray-800 py-6">
      <Container>
        <Row className="items-center">
          <Col md={6} className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} ProcurityIQ. All rights reserved.
            </p>
          </Col>
          <Col md={6}>
            <div className="flex flex-wrap gap-4 justify-start md:justify-end">
              <Link to="/help" className="text-sm text-gray-400 hover:text-white transition-colors">Help</Link>
              <Link to="/support" className="text-sm text-gray-400 hover:text-white transition-colors">Support</Link>
              <Link to="/documentation" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
