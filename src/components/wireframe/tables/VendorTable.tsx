
import React from 'react';
import { Check, X, MoreHorizontal, ExternalLink } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  description: string;
  contractNumber: string;
  expiration: string;
  federal: boolean;
  state: boolean;
  approved: boolean;
}

interface VendorTableProps {
  vendors: Vendor[];
  onViewDetails: (id: string) => void;
}

export const VendorTable: React.FC<VendorTableProps> = ({ 
  vendors,
  onViewDetails
}) => {
  return (
    <div className="procurity-table-container">
      <table className="procurity-table">
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Description</th>
            <th>Contract #</th>
            <th>Expiration Date</th>
            <th>Federal</th>
            <th>State</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>
                <div className="procurity-flex procurity-items-center procurity-gap-sm">
                  <div className="procurity-vendor-icon">{vendor.name.charAt(0)}</div>
                  <span>{vendor.name}</span>
                </div>
              </td>
              <td>{vendor.description}</td>
              <td>{vendor.contractNumber}</td>
              <td>{vendor.expiration}</td>
              <td>
                {vendor.federal ? 
                  <Check className="procurity-icon-success" size={16} /> : 
                  <X className="procurity-icon-error" size={16} />
                }
              </td>
              <td>
                {vendor.state ? 
                  <Check className="procurity-icon-success" size={16} /> : 
                  <X className="procurity-icon-error" size={16} />
                }
              </td>
              <td>
                {vendor.approved ? 
                  <Check className="procurity-icon-success" size={16} /> : 
                  <X className="procurity-icon-error" size={16} />
                }
              </td>
              <td>
                <div className="procurity-flex procurity-items-center procurity-gap-sm">
                  <button 
                    className="procurity-icon-button" 
                    onClick={() => onViewDetails(vendor.id)}
                    aria-label="View details"
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button 
                    className="procurity-icon-button" 
                    aria-label="More options"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
