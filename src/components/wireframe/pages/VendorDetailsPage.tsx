
import React, { useState } from 'react';
import { ProcurityIQLayout } from '../ProcurityIQLayout';
import { FileText, User, Phone, Mail, Globe, Building, Check, X } from 'lucide-react';

export const VendorDetailsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('details');
  
  // Sample vendor data
  const vendor = {
    id: 'v12345',
    name: 'Apple Inc.',
    logo: '/apple-logo.png',
    description: 'Technology company that designs, develops, and sells consumer electronics, computer software, and online services.',
    federalContract: 'GS-35F-0119Y',
    stateContract: 'DIR-TSO-4288',
    websiteUrl: 'https://www.apple.com',
    contactName: 'John Smith',
    contactEmail: 'john.smith@apple.com',
    contactPhone: '(555) 123-4567',
    approved: true,
    federalApproved: true,
    stateApproved: true,
    address: {
      street: '1 Apple Park Way',
      city: 'Cupertino',
      state: 'CA',
      zipCode: '95014'
    },
    products: [
      { id: 'p1', name: 'MacBook Pro', price: '$1,999.00', category: 'Hardware' },
      { id: 'p2', name: 'iPad Pro', price: '$799.00', category: 'Hardware' },
      { id: 'p3', name: 'iPhone 14', price: '$999.00', category: 'Hardware' }
    ]
  };

  return (
    <ProcurityIQLayout 
      pageTitle="Vendor Details"
      pageDescription="View and manage vendor information"
      currentSection="vendors"
    >
      <div className="procurity-vendor-details">
        {/* Header Section */}
        <div className="procurity-card procurity-vendor-header">
          <div className="procurity-flex procurity-items-center procurity-gap-md">
            <div className="procurity-vendor-logo">
              <img 
                src={vendor.logo} 
                alt={`${vendor.name} logo`} 
                className="procurity-vendor-logo-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.textContent = vendor.name.charAt(0);
                }}
              />
            </div>
            <div className="procurity-vendor-header-info">
              <h1 className="procurity-vendor-name">{vendor.name}</h1>
              <p className="procurity-vendor-description">{vendor.description}</p>
            </div>
          </div>
          
          <div className="procurity-vendor-badges procurity-mt-sm">
            <div className="procurity-flex procurity-gap-sm">
              <span className="procurity-badge procurity-badge-info">Technology</span>
              {vendor.federalApproved && (
                <span className="procurity-badge procurity-badge-success">Federal Approved</span>
              )}
              {vendor.stateApproved && (
                <span className="procurity-badge procurity-badge-success">State Approved</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="procurity-tabs procurity-mt-md">
          <button 
            className={`procurity-tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button 
            className={`procurity-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={`procurity-tab ${activeTab === 'contracts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contracts')}
          >
            Contracts
          </button>
          <button 
            className={`procurity-tab ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
          <button 
            className={`procurity-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="procurity-tab-content procurity-mt-md">
          {activeTab === 'details' && (
            <div className="procurity-detail-panel">
              <div className="procurity-detail-main">
                <h2 className="procurity-section-title">Company Information</h2>
                
                <div className="procurity-detail-grid">
                  <div className="procurity-detail-item">
                    <div className="procurity-detail-icon">
                      <Building size={16} />
                    </div>
                    <div className="procurity-detail-content">
                      <span className="procurity-detail-label">Address</span>
                      <div className="procurity-detail-value">
                        {vendor.address.street}<br />
                        {vendor.address.city}, {vendor.address.state} {vendor.address.zipCode}
                      </div>
                    </div>
                  </div>
                  
                  <div className="procurity-detail-item">
                    <div className="procurity-detail-icon">
                      <Globe size={16} />
                    </div>
                    <div className="procurity-detail-content">
                      <span className="procurity-detail-label">Website</span>
                      <a href={vendor.websiteUrl} className="procurity-detail-value procurity-link" target="_blank" rel="noopener noreferrer">
                        {vendor.websiteUrl}
                      </a>
                    </div>
                  </div>
                  
                  <div className="procurity-detail-item">
                    <div className="procurity-detail-icon">
                      <FileText size={16} />
                    </div>
                    <div className="procurity-detail-content">
                      <span className="procurity-detail-label">Federal Contract</span>
                      <div className="procurity-detail-value">
                        {vendor.federalContract}
                      </div>
                    </div>
                  </div>
                  
                  <div className="procurity-detail-item">
                    <div className="procurity-detail-icon">
                      <FileText size={16} />
                    </div>
                    <div className="procurity-detail-content">
                      <span className="procurity-detail-label">State Contract</span>
                      <div className="procurity-detail-value">
                        {vendor.stateContract}
                      </div>
                    </div>
                  </div>
                </div>
                
                <h2 className="procurity-section-title procurity-mt-md">Approval Status</h2>
                
                <div className="procurity-status-grid">
                  <div className="procurity-status-item">
                    <span className="procurity-status-label">Federal Approved</span>
                    <div className="procurity-status-value">
                      {vendor.federalApproved ? 
                        <Check size={20} className="procurity-icon-success" /> : 
                        <X size={20} className="procurity-icon-error" />
                      }
                    </div>
                  </div>
                  
                  <div className="procurity-status-item">
                    <span className="procurity-status-label">State Approved</span>
                    <div className="procurity-status-value">
                      {vendor.stateApproved ? 
                        <Check size={20} className="procurity-icon-success" /> : 
                        <X size={20} className="procurity-icon-error" />
                      }
                    </div>
                  </div>
                  
                  <div className="procurity-status-item">
                    <span className="procurity-status-label">Overall Approval</span>
                    <div className="procurity-status-value">
                      {vendor.approved ? 
                        <Check size={20} className="procurity-icon-success" /> : 
                        <X size={20} className="procurity-icon-error" />
                      }
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="procurity-detail-sidebar">
                <h2 className="procurity-section-title">Contact Information</h2>
                
                <div className="procurity-contact-card">
                  <div className="procurity-contact-header">
                    <div className="procurity-contact-avatar">
                      <User size={24} />
                    </div>
                    <h3 className="procurity-contact-name">{vendor.contactName}</h3>
                  </div>
                  
                  <div className="procurity-contact-details">
                    <div className="procurity-contact-item">
                      <Mail size={16} className="procurity-contact-icon" />
                      <a href={`mailto:${vendor.contactEmail}`} className="procurity-contact-value procurity-link">
                        {vendor.contactEmail}
                      </a>
                    </div>
                    
                    <div className="procurity-contact-item">
                      <Phone size={16} className="procurity-contact-icon" />
                      <a href={`tel:${vendor.contactPhone}`} className="procurity-contact-value procurity-link">
                        {vendor.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="procurity-actions-card procurity-mt-md">
                  <h2 className="procurity-section-title">Actions</h2>
                  
                  <div className="procurity-action-buttons">
                    <button className="procurity-button procurity-button-primary procurity-full-width">
                      Create New Proposal
                    </button>
                    
                    <button className="procurity-button procurity-button-secondary procurity-full-width procurity-mt-sm">
                      Edit Vendor Information
                    </button>
                    
                    <button className="procurity-button procurity-button-danger procurity-full-width procurity-mt-sm">
                      Remove Vendor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'products' && (
            <div className="procurity-card">
              <div className="procurity-card-header">
                <h2 className="procurity-card-title">Products</h2>
                <button className="procurity-button procurity-button-primary">
                  Add Product
                </button>
              </div>
              
              <div className="procurity-table-container">
                <table className="procurity-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendor.products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>
                          <div className="procurity-flex procurity-gap-sm">
                            <button className="procurity-button procurity-button-secondary">View</button>
                            <button className="procurity-button procurity-button-primary">Add to Order</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {(activeTab === 'contracts' || activeTab === 'documents' || activeTab === 'history') && (
            <div className="procurity-card">
              <div className="procurity-empty-state">
                <div className="procurity-empty-state-icon">
                  <FileText size={48} />
                </div>
                <h3 className="procurity-empty-state-title">No {activeTab} available</h3>
                <p className="procurity-empty-state-description">
                  There are no {activeTab} available for this vendor.
                </p>
                <button className="procurity-button procurity-button-primary">
                  Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProcurityIQLayout>
  );
};
