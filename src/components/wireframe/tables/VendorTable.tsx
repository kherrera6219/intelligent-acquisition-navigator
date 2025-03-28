
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
    <div className="ms-table-container w-full overflow-auto">
      <table className="ms-table w-full">
        <thead className="ms-table-header">
          <tr>
            <th className="ms-table-head">Vendor Name</th>
            <th className="ms-table-head">Description</th>
            <th className="ms-table-head">Contract #</th>
            <th className="ms-table-head">Expiration Date</th>
            <th className="ms-table-head">Federal</th>
            <th className="ms-table-head">State</th>
            <th className="ms-table-head">Approved</th>
            <th className="ms-table-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="ms-table-row">
              <td className="ms-table-cell">
                <div className="ms-flex items-center gap-3">
                  <div className="ms-avatar ms-avatar-sm bg-primary/10 text-primary">
                    {vendor.name.charAt(0)}
                  </div>
                  <span className="ms-text-base">{vendor.name}</span>
                </div>
              </td>
              <td className="ms-table-cell">{vendor.description}</td>
              <td className="ms-table-cell">{vendor.contractNumber}</td>
              <td className="ms-table-cell">{vendor.expiration}</td>
              <td className="ms-table-cell">
                {vendor.federal ? 
                  <span className="ms-status ms-status-success"><span className="ms-status-dot"></span>Yes</span> : 
                  <span className="ms-status ms-status-error"><span className="ms-status-dot"></span>No</span>
                }
              </td>
              <td className="ms-table-cell">
                {vendor.state ? 
                  <span className="ms-status ms-status-success"><span className="ms-status-dot"></span>Yes</span> : 
                  <span className="ms-status ms-status-error"><span className="ms-status-dot"></span>No</span>
                }
              </td>
              <td className="ms-table-cell">
                {vendor.approved ? 
                  <span className="ms-status ms-status-success"><span className="ms-status-dot"></span>Yes</span> : 
                  <span className="ms-status ms-status-error"><span className="ms-status-dot"></span>No</span>
                }
              </td>
              <td className="ms-table-cell">
                <div className="ms-h-stack-sm">
                  <button 
                    className="ms-icon-button" 
                    onClick={() => onViewDetails(vendor.id)}
                    aria-label="View details"
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button 
                    className="ms-icon-button" 
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
