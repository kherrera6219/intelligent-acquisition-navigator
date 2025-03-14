
import React from 'react';
import { Card } from '@/components/ui/card';
import { Row, Col } from '@/components/ui/universal/Grid';

const MarketResearchDashboard: React.FC = () => {
  return (
    <Row className="mb-6">
      <Col xl={12}>
        <Card className="p-5 bg-gradient-to-r from-[#9b87f5]/10 to-[#1A1F2C]/5 border-[#9b87f5]/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Market Research Dashboard</h2>
              <p className="text-gray-500">Analyze potential vendors and market opportunities</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 h-9 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.5C3 3.12 4.12 2 5.5 2H18.5C19.88 2 21 3.12 21 4.5V5.5C21 5.78 20.78 6 20.5 6H3.5C3.22 6 3 5.78 3 5.5V4.5Z" fill="currentColor"/>
                  <path d="M3 14.5C3 13.12 4.12 12 5.5 12H18.5C19.88 12 21 13.12 21 14.5V19.5C21 20.88 19.88 22 18.5 22H5.5C4.12 22 3 20.88 3 19.5V14.5Z" fill="currentColor"/>
                  <path d="M10 9.5C10 8.12 8.88 7 7.5 7H3.5C3.22 7 3 7.22 3 7.5V8.5C3 9.88 4.12 11 5.5 11H10V9.5Z" fill="currentColor"/>
                  <path d="M14 9.5C14 8.12 15.12 7 16.5 7H20.5C20.78 7 21 7.22 21 7.5V8.5C21 9.88 19.88 11 18.5 11H14V9.5Z" fill="currentColor"/>
                </svg>
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="flex items-center gap-2 h-9 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" fill="currentColor"/>
                  <path d="M13 10V18H11V10H13ZM12 8.5C11.1716 8.5 10.5 7.82843 10.5 7C10.5 6.17157 11.1716 5.5 12 5.5C12.8284 5.5 13.5 6.17157 13.5 7C13.5 7.82843 12.8284 8.5 12 8.5Z" fill="white"/>
                </svg>
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center gap-2 h-9 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" fill="currentColor"/>
                  <path d="M15.7071 11.2929L12 7.58579L8.29289 11.2929L9.70711 12.7071L11 11.4142V16H13V11.4142L14.2929 12.7071L15.7071 11.2929Z" fill="white"/>
                </svg>
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-white/10 backdrop-blur-sm border border-[#9b87f5]/10">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Companies</h3>
              <p className="text-2xl font-bold">128</p>
            </Card>
            <Card className="p-4 bg-white/10 backdrop-blur-sm border border-[#9b87f5]/10">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Active Research</h3>
              <p className="text-2xl font-bold">42</p>
            </Card>
            <Card className="p-4 bg-white/10 backdrop-blur-sm border border-[#9b87f5]/10">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Market Value</h3>
              <p className="text-2xl font-bold">$24.5M</p>
            </Card>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default MarketResearchDashboard;
