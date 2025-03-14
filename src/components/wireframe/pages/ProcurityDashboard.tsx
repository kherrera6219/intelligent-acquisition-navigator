
import React from 'react';
import { ProcurityIQLayout } from '../ProcurityIQLayout';
import { BarChart2, Clock, AlertCircle, Flag } from 'lucide-react';

export const ProcurityDashboard: React.FC = () => {
  // Sample data for dashboard
  const metrics = [
    { id: 'proposals', label: 'Total Proposals', value: '10', icon: BarChart2 },
    { id: 'approved', label: 'Approved Proposals', value: '12', icon: Flag },
    { id: 'pending', label: 'Pending Approvals', value: '75', icon: Clock },
  ];

  const recentProposals = [
    { id: '1', name: 'Software License', status: 'Approved', date: '07/15/2023', amount: '$8,950.00' },
    { id: '2', name: 'Hardware Purchase', status: 'Pending', date: '07/14/2023', amount: '$12,450.00' },
    { id: '3', name: 'Consulting Services', status: 'Rejected', date: '07/10/2023', amount: '$24,500.00' },
    { id: '4', name: 'Cloud Services', status: 'Approved', date: '07/05/2023', amount: '$18,000.00' },
    { id: '5', name: 'Training Services', status: 'Pending', date: '07/01/2023', amount: '$4,500.00' },
  ];

  return (
    <ProcurityIQLayout 
      pageTitle="Dashboard"
      pageDescription="Welcome back, Olivia"
      currentSection="dashboard"
    >
      <div className="procurity-dashboard">
        {/* Metrics Section */}
        <div className="procurity-metrics-grid">
          {metrics.map((metric) => (
            <div key={metric.id} className="procurity-metric-card">
              <div className="procurity-metric-icon">
                <metric.icon size={24} />
              </div>
              <div className="procurity-metric-content">
                <h3 className="procurity-metric-value">{metric.value}</h3>
                <p className="procurity-metric-label">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Recent Proposals */}
        <div className="procurity-card procurity-mt-md">
          <div className="procurity-card-header">
            <h2 className="procurity-card-title">Recent Proposals</h2>
            <button className="procurity-button procurity-button-secondary">
              View All
            </button>
          </div>
          
          <div className="procurity-table-container">
            <table className="procurity-table">
              <thead>
                <tr>
                  <th>Proposal Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentProposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td>{proposal.name}</td>
                    <td>{proposal.date}</td>
                    <td>
                      <span className={`procurity-badge procurity-badge-${getStatusClass(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </td>
                    <td>{proposal.amount}</td>
                    <td>
                      <div className="procurity-flex procurity-gap-sm">
                        <button className="procurity-button procurity-button-secondary">View</button>
                        <button className="procurity-button procurity-button-primary">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Action Items */}
        <div className="procurity-card procurity-mt-md">
          <div className="procurity-card-header">
            <h2 className="procurity-card-title">Action Items</h2>
          </div>
          
          <div className="procurity-action-items">
            <div className="procurity-action-item">
              <div className="procurity-action-icon">
                <AlertCircle size={20} className="procurity-icon-warning" />
              </div>
              <div className="procurity-action-content">
                <h3 className="procurity-action-title">Proposal Review Required</h3>
                <p className="procurity-action-description">
                  3 proposals awaiting your review and approval
                </p>
              </div>
              <button className="procurity-button procurity-button-primary">
                Review Now
              </button>
            </div>
            
            <div className="procurity-action-item">
              <div className="procurity-action-icon">
                <Clock size={20} className="procurity-icon-info" />
              </div>
              <div className="procurity-action-content">
                <h3 className="procurity-action-title">Expiring Contracts</h3>
                <p className="procurity-action-description">
                  2 vendor contracts expiring in the next 30 days
                </p>
              </div>
              <button className="procurity-button procurity-button-primary">
                View Contracts
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProcurityIQLayout>
  );
};

// Helper function to get status class
function getStatusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'success';
    case 'pending':
      return 'warning';
    case 'rejected':
      return 'error';
    default:
      return 'info';
  }
}
