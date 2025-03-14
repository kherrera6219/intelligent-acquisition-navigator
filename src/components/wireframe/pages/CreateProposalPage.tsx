
import React, { useState } from 'react';
import { ProcurityIQLayout } from '../ProcurityIQLayout';
import { CalendarIcon, DollarSign, PlusCircle } from 'lucide-react';

export const CreateProposalPage: React.FC = () => {
  // Form state
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    budget: '',
    startDate: '',
    endDate: '',
    requestor: '',
    priority: 'medium',
    itemsToOrder: []
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form data
    console.log('Form submitted:', formData);
  };
  
  // Navigate between form steps
  const nextStep = () => setFormStep(prev => prev + 1);
  const prevStep = () => setFormStep(prev => prev - 1);
  
  return (
    <ProcurityIQLayout 
      pageTitle="Create New Proposal" 
      currentSection="proposal"
      pageDescription="Enter the details for your new acquisition proposal"
    >
      <div className="procurity-create-proposal">
        {/* Form Progress */}
        <div className="procurity-form-progress">
          <div className={`procurity-progress-step ${formStep >= 1 ? 'active' : ''}`}>
            <div className="procurity-step-number">1</div>
            <span className="procurity-step-label">Basic Details</span>
          </div>
          <div className="procurity-progress-connector"></div>
          <div className={`procurity-progress-step ${formStep >= 2 ? 'active' : ''}`}>
            <div className="procurity-step-number">2</div>
            <span className="procurity-step-label">Product Catalog</span>
          </div>
          <div className="procurity-progress-connector"></div>
          <div className={`procurity-progress-step ${formStep >= 3 ? 'active' : ''}`}>
            <div className="procurity-step-number">3</div>
            <span className="procurity-step-label">Additional Details</span>
          </div>
          <div className="procurity-progress-connector"></div>
          <div className={`procurity-progress-step ${formStep >= 4 ? 'active' : ''}`}>
            <div className="procurity-step-number">4</div>
            <span className="procurity-step-label">Review & Submit</span>
          </div>
        </div>
        
        {/* Form Container */}
        <div className="procurity-card procurity-mt-md">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Details */}
            {formStep === 1 && (
              <div className="procurity-form-step">
                <h2 className="procurity-section-title">Basic Proposal Details</h2>
                
                <div className="procurity-form-grid">
                  <div className="procurity-form-group">
                    <label htmlFor="title" className="procurity-form-label">Proposal Title</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="procurity-form-input"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter a descriptive title"
                      required
                    />
                  </div>
                  
                  <div className="procurity-form-group">
                    <label htmlFor="department" className="procurity-form-label">Department</label>
                    <select
                      id="department"
                      name="department"
                      className="procurity-form-select"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="it">Information Technology</option>
                      <option value="hr">Human Resources</option>
                      <option value="finance">Finance</option>
                      <option value="operations">Operations</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                </div>
                
                <div className="procurity-form-group">
                  <label htmlFor="description" className="procurity-form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="procurity-form-textarea"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide a detailed description of this proposal"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="procurity-form-grid">
                  <div className="procurity-form-group">
                    <label htmlFor="budget" className="procurity-form-label">Budget</label>
                    <div className="procurity-input-with-icon">
                      <DollarSign size={16} className="procurity-input-icon" />
                      <input
                        id="budget"
                        name="budget"
                        type="text"
                        className="procurity-form-input procurity-input-with-left-icon"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div className="procurity-form-group">
                    <label htmlFor="priority" className="procurity-form-label">Priority</label>
                    <select
                      id="priority"
                      name="priority"
                      className="procurity-form-select"
                      value={formData.priority}
                      onChange={handleInputChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                
                <div className="procurity-form-grid">
                  <div className="procurity-form-group">
                    <label htmlFor="startDate" className="procurity-form-label">Start Date</label>
                    <div className="procurity-input-with-icon">
                      <CalendarIcon size={16} className="procurity-input-icon" />
                      <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        className="procurity-form-input procurity-input-with-left-icon"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="procurity-form-group">
                    <label htmlFor="endDate" className="procurity-form-label">End Date</label>
                    <div className="procurity-input-with-icon">
                      <CalendarIcon size={16} className="procurity-input-icon" />
                      <input
                        id="endDate"
                        name="endDate"
                        type="date"
                        className="procurity-form-input procurity-input-with-left-icon"
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Product Catalog */}
            {formStep === 2 && (
              <div className="procurity-form-step">
                <h2 className="procurity-section-title">Product Catalog</h2>
                <p className="procurity-form-description">
                  Select products from the catalog to add to your proposal.
                </p>
                
                <div className="procurity-search-filters procurity-mt-md">
                  <div className="procurity-search-container procurity-full-width">
                    <input 
                      type="text" 
                      className="procurity-form-input" 
                      placeholder="Search products..."
                    />
                  </div>
                  
                  <div className="procurity-filters procurity-mt-sm">
                    <div className="procurity-filter">
                      <label className="procurity-filter-label">Vendor</label>
                      <select className="procurity-form-select">
                        <option value="">All Vendors</option>
                        <option value="apple">Apple Inc.</option>
                        <option value="microsoft">Microsoft</option>
                        <option value="dell">Dell Technologies</option>
                        <option value="hp">HP Inc.</option>
                      </select>
                    </div>
                    
                    <div className="procurity-filter">
                      <label className="procurity-filter-label">Category</label>
                      <select className="procurity-form-select">
                        <option value="">All Categories</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Software</option>
                        <option value="services">Services</option>
                        <option value="cloud">Cloud</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="procurity-product-grid procurity-mt-md">
                  {/* Sample Products */}
                  <div className="procurity-product-card">
                    <div className="procurity-product-header">
                      <div className="procurity-product-logo">A</div>
                      <div className="procurity-product-vendor">Apple Inc.</div>
                    </div>
                    <h3 className="procurity-product-name">MacBook Pro</h3>
                    <p className="procurity-product-description">
                      13-inch MacBook Pro with M2 chip, 8GB RAM, 256GB SSD
                    </p>
                    <div className="procurity-product-price">$1,299.00</div>
                    <button type="button" className="procurity-button procurity-button-primary procurity-mt-sm">
                      Add to Proposal
                    </button>
                  </div>
                  
                  <div className="procurity-product-card">
                    <div className="procurity-product-header">
                      <div className="procurity-product-logo">A</div>
                      <div className="procurity-product-vendor">Apple Inc.</div>
                    </div>
                    <h3 className="procurity-product-name">iPad Pro</h3>
                    <p className="procurity-product-description">
                      11-inch iPad Pro with M2 chip, 128GB storage
                    </p>
                    <div className="procurity-product-price">$799.00</div>
                    <button type="button" className="procurity-button procurity-button-primary procurity-mt-sm">
                      Add to Proposal
                    </button>
                  </div>
                  
                  <div className="procurity-product-card">
                    <div className="procurity-product-header">
                      <div className="procurity-product-logo">M</div>
                      <div className="procurity-product-vendor">Microsoft</div>
                    </div>
                    <h3 className="procurity-product-name">Surface Laptop 5</h3>
                    <p className="procurity-product-description">
                      13.5-inch Surface Laptop 5, Intel Core i5, 8GB RAM, 256GB SSD
                    </p>
                    <div className="procurity-product-price">$999.99</div>
                    <button type="button" className="procurity-button procurity-button-primary procurity-mt-sm">
                      Add to Proposal
                    </button>
                  </div>
                  
                  <div className="procurity-product-card">
                    <div className="procurity-product-header">
                      <div className="procurity-product-logo">D</div>
                      <div className="procurity-product-vendor">Dell</div>
                    </div>
                    <h3 className="procurity-product-name">XPS 13</h3>
                    <p className="procurity-product-description">
                      Dell XPS 13, Intel Core i7, 16GB RAM, 512GB SSD
                    </p>
                    <div className="procurity-product-price">$1,299.99</div>
                    <button type="button" className="procurity-button procurity-button-primary procurity-mt-sm">
                      Add to Proposal
                    </button>
                  </div>
                </div>
                
                <div className="procurity-selected-products procurity-mt-md">
                  <h2 className="procurity-section-title">Selected Products</h2>
                  
                  <div className="procurity-empty-state">
                    <div className="procurity-empty-state-icon">
                      <PlusCircle size={48} />
                    </div>
                    <h3 className="procurity-empty-state-title">No products selected</h3>
                    <p className="procurity-empty-state-description">
                      Add products from the catalog to include in your proposal.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Additional Details */}
            {formStep === 3 && (
              <div className="procurity-form-step">
                <h2 className="procurity-section-title">Additional Details</h2>
                
                <div className="procurity-form-group">
                  <label className="procurity-form-label">
                    Attach Supporting Documents
                  </label>
                  <div className="procurity-file-upload">
                    <div className="procurity-file-upload-dropzone">
                      <div className="procurity-file-upload-icon">
                        <PlusCircle size={24} />
                      </div>
                      <div className="procurity-file-upload-text">
                        <p className="procurity-file-upload-title">
                          Drag and drop files here or click to browse
                        </p>
                        <p className="procurity-file-upload-description">
                          Acceptable file formats: PDF, DOCX, XLSX, JPG, PNG (max 10MB)
                        </p>
                      </div>
                      <input 
                        type="file" 
                        className="procurity-file-upload-input" 
                        multiple 
                        accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="procurity-form-group procurity-mt-md">
                  <label htmlFor="additionalNotes" className="procurity-form-label">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    className="procurity-form-textarea"
                    placeholder="Any additional information or special requirements..."
                    rows={4}
                  />
                </div>
                
                <div className="procurity-form-grid">
                  <div className="procurity-form-group">
                    <label htmlFor="approvers" className="procurity-form-label">
                      Required Approvers
                    </label>
                    <select
                      id="approvers"
                      name="approvers"
                      className="procurity-form-select"
                      multiple
                    >
                      <option value="john.doe">John Doe (Department Head)</option>
                      <option value="jane.smith">Jane Smith (Finance)</option>
                      <option value="robert.johnson">Robert Johnson (Procurement)</option>
                      <option value="sarah.williams">Sarah Williams (Legal)</option>
                    </select>
                    <span className="procurity-form-hint">
                      Hold Ctrl (or Cmd) to select multiple approvers
                    </span>
                  </div>
                  
                  <div className="procurity-form-group">
                    <label htmlFor="notification" className="procurity-form-label">
                      Notification Preferences
                    </label>
                    <div className="procurity-checkbox-group">
                      <div className="procurity-checkbox">
                        <input type="checkbox" id="notifyOnApproval" />
                        <label htmlFor="notifyOnApproval">
                          Notify me on approval state changes
                        </label>
                      </div>
                      <div className="procurity-checkbox">
                        <input type="checkbox" id="notifyOnComments" />
                        <label htmlFor="notifyOnComments">
                          Notify me when comments are added
                        </label>
                      </div>
                      <div className="procurity-checkbox">
                        <input type="checkbox" id="notifyOnCompletion" />
                        <label htmlFor="notifyOnCompletion">
                          Notify me on proposal completion
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Review & Submit */}
            {formStep === 4 && (
              <div className="procurity-form-step">
                <h2 className="procurity-section-title">Review Your Proposal</h2>
                <p className="procurity-form-description">
                  Please review the information below before submitting your proposal.
                </p>
                
                <div className="procurity-review-section">
                  <h3 className="procurity-review-heading">Basic Details</h3>
                  <div className="procurity-review-grid">
                    <div className="procurity-review-item">
                      <span className="procurity-review-label">Title</span>
                      <span className="procurity-review-value">
                        {formData.title || 'Not provided'}
                      </span>
                    </div>
                    
                    <div className="procurity-review-item">
                      <span className="procurity-review-label">Department</span>
                      <span className="procurity-review-value">
                        {formData.department || 'Not selected'}
                      </span>
                    </div>
                    
                    <div className="procurity-review-item">
                      <span className="procurity-review-label">Budget</span>
                      <span className="procurity-review-value">
                        {formData.budget ? `$${formData.budget}` : 'Not provided'}
                      </span>
                    </div>
                    
                    <div className="procurity-review-item">
                      <span className="procurity-review-label">Priority</span>
                      <span className="procurity-review-value">
                        {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
                      </span>
                    </div>
                    
                    <div className="procurity-review-item">
                      <span className="procurity-review-label">Start Date</span>
                      <span className="procurity-review-value">
                        {formData.startDate || 'Not provided'}
                      </span>
                    </div>
                    
                    <div className="procurity-review-item">
                      <span className="procurity-review-label">End Date</span>
                      <span className="procurity-review-value">
                        {formData.endDate || 'Not provided'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="procurity-review-item procurity-mt-sm">
                    <span className="procurity-review-label">Description</span>
                    <p className="procurity-review-value procurity-review-text">
                      {formData.description || 'Not provided'}
                    </p>
                  </div>
                </div>
                
                <div className="procurity-review-section procurity-mt-md">
                  <h3 className="procurity-review-heading">Selected Products</h3>
                  <div className="procurity-empty-state">
                    <div className="procurity-empty-state-icon">
                      <PlusCircle size={32} />
                    </div>
                    <h3 className="procurity-empty-state-title">No products selected</h3>
                    <p className="procurity-empty-state-description">
                      You haven't selected any products for this proposal.
                    </p>
                    <button 
                      type="button" 
                      className="procurity-button procurity-button-secondary"
                      onClick={() => setFormStep(2)}
                    >
                      Add Products
                    </button>
                  </div>
                </div>
                
                <div className="procurity-total-section procurity-mt-md">
                  <div className="procurity-total-row">
                    <span className="procurity-total-label">Subtotal</span>
                    <span className="procurity-total-value">$0.00</span>
                  </div>
                  <div className="procurity-total-row">
                    <span className="procurity-total-label">Tax (8.25%)</span>
                    <span className="procurity-total-value">$0.00</span>
                  </div>
                  <div className="procurity-total-row procurity-total-final">
                    <span className="procurity-total-label">Total</span>
                    <span className="procurity-total-value">$0.00</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Form Navigation Buttons */}
            <div className="procurity-form-navigation">
              {formStep > 1 && (
                <button
                  type="button"
                  className="procurity-button procurity-button-secondary"
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}
              
              {formStep < 4 ? (
                <button
                  type="button"
                  className="procurity-button procurity-button-primary"
                  onClick={nextStep}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="procurity-button procurity-button-primary"
                >
                  Submit Proposal
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </ProcurityIQLayout>
  );
};
