
import React from 'react';

export const Partners: React.FC = () => {
  const partnerCategories = [
    {
      title: "Technology Partners",
      partners: [
        "Microsoft",
        "Oracle",
        "Salesforce",
        "AWS",
        "IBM"
      ]
    },
    {
      title: "Government Associations",
      partners: [
        "National Association of State Procurement Officials",
        "American Council for Technology",
        "Government Finance Officers Association",
        "National Contract Management Association"
      ]
    },
    {
      title: "Research Collaborators",
      partners: [
        "Center for Digital Government",
        "Government Technology Institute",
        "Public Procurement Research Center",
        "Digital Government Society"
      ]
    }
  ];
  
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Partners & Collaborators</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We work with leading organizations to advance the future of government acquisition.
        </p>
      </div>
      
      <div className="space-y-12">
        {partnerCategories.map((category, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold mb-6 text-center">{category.title}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {category.partners.map((partner, partnerIndex) => (
                <div 
                  key={partnerIndex}
                  className="bg-[#1A1F2C]/50 border border-border/10 rounded-lg p-4 flex items-center justify-center h-24"
                >
                  <span className="text-center text-muted-foreground hover:text-foreground transition-colors">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
