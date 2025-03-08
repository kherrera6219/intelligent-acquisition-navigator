
import React from 'react';
import { FileText, Calendar, User, Tag } from 'lucide-react';

export interface Document {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'published' | 'archived';
  lastModified: string;
  author: string;
}

export interface DocumentListProps {
  category: 'all' | 'drafts' | 'published' | 'archived';
  searchTerm: string;
}

export const DocumentList: React.FC<DocumentListProps> = ({ category, searchTerm }) => {
  // Mock data
  const documents: Document[] = [
    { 
      id: '1', 
      title: 'Request for Proposal - IT Services', 
      type: 'RFP', 
      status: 'published', 
      lastModified: '2024-04-15', 
      author: 'John Smith' 
    },
    { 
      id: '2', 
      title: 'Statement of Work - Cloud Migration', 
      type: 'SOW', 
      status: 'draft', 
      lastModified: '2024-04-10', 
      author: 'Jane Doe' 
    },
    { 
      id: '3', 
      title: 'Contract - Software Licensing', 
      type: 'Contract', 
      status: 'published', 
      lastModified: '2024-03-22', 
      author: 'Robert Johnson' 
    },
    { 
      id: '4', 
      title: 'Vendor Evaluation - Hardware Suppliers', 
      type: 'Evaluation', 
      status: 'archived', 
      lastModified: '2023-11-05', 
      author: 'Sarah Williams' 
    },
  ];

  // Filter documents based on category and search term
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = category === 'all' || doc.status === category;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredDocuments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
        <p>No documents found</p>
        {searchTerm && <p className="text-sm mt-2">Try adjusting your search criteria</p>}
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {filteredDocuments.map(doc => (
        <div key={doc.id} className="py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-4 -mx-4 cursor-pointer transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-9 w-9 text-blue-500 bg-blue-500/10 p-2 rounded" />
              <div>
                <h3 className="font-medium text-lg">{doc.title}</h3>
                <div className="flex space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Tag className="h-3.5 w-3.5 mr-1" />
                    <span>{doc.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>{doc.lastModified}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-1" />
                    <span>{doc.author}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${doc.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' : 
                  doc.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' : 
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
