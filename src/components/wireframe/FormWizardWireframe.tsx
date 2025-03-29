
import React from 'react';
import { WireframeBase, WireframePlaceholder } from './WireframeBase';
import { 
  CheckCircle, 
  Circle, 
  ChevronRight, 
  FileText, 
  Users, 
  Settings, 
  CreditCard,
  ArrowLeft,
  ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormWizardWireframeProps {
  className?: string;
  withPlaceholders?: boolean;
  title?: string;
  currentStep?: number;
}

export const FormWizardWireframe: React.FC<FormWizardWireframeProps> = ({
  className,
  withPlaceholders = true,
  title = 'Multi-Step Form',
  currentStep = 2,
}) => {
  const steps = [
    { id: 1, label: 'Basic Information', icon: FileText, status: 'completed' },
    { id: 2, label: 'User Details', icon: Users, status: 'current' },
    { id: 3, label: 'Preferences', icon: Settings, status: 'upcoming' },
    { id: 4, label: 'Payment', icon: CreditCard, status: 'upcoming' },
  ];

  return (
    <WireframeBase className={cn('ms-wizard-wireframe', className)}>
      <div className="ms-header-wireframe mb-6">
        <h1 className="ms-heading-3 font-semibold">{title}</h1>
        <p className="ms-text-muted text-sm mt-1">Complete all steps to finish the process.</p>
      </div>

      <div className="ms-wizard-steps mb-8">
        <div className="hidden md:flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={cn(
                "ms-wizard-step flex flex-col items-center",
                step.status === 'completed' && 'text-emerald-500',
                step.status === 'current' && 'text-primary font-medium',
                step.status === 'upcoming' && 'text-muted-foreground'
              )}>
                <div className={cn(
                  "ms-wizard-step-icon h-8 w-8 rounded-full flex items-center justify-center",
                  step.status === 'completed' && 'bg-emerald-500/10',
                  step.status === 'current' && 'bg-primary/10',
                  step.status === 'upcoming' && 'bg-muted'
                )}>
                  {step.status === 'completed' && <CheckCircle size={18} />}
                  {step.status === 'current' && <step.icon size={18} />}
                  {step.status === 'upcoming' && <Circle size={18} />}
                </div>
                <span className="ms-wizard-step-label text-sm mt-2">{step.label}</span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={cn(
                  "ms-wizard-step-connector h-0.5 w-16",
                  index < currentStep - 1 ? 'bg-emerald-500' : 'bg-muted'
                )}>
                  <ChevronRight className="hidden" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="flex md:hidden items-center justify-between mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "ms-wizard-step-mobile h-2 flex-1 rounded-full",
                step.status === 'completed' && 'bg-emerald-500',
                step.status === 'current' && 'bg-primary',
                step.status === 'upcoming' && 'bg-muted'
              )}
            />
          ))}
        </div>
        
        <div className="flex md:hidden items-center justify-between">
          <p className="text-sm font-medium">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.label}
          </p>
        </div>
      </div>

      <div className="ms-wizard-content mb-8 border border-border rounded-md bg-card/30 p-5">
        <h2 className="text-lg font-medium mb-4">{steps[currentStep - 1]?.label}</h2>
        
        {withPlaceholders && (
          <div className="grid grid-cols-1 gap-5 max-w-2xl">
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Project Name</label>
                  <WireframePlaceholder height="h-9" text="My New Project" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <WireframePlaceholder height="h-24" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <WireframePlaceholder height="h-9" text="2023-06-15" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <WireframePlaceholder height="h-9" text="2023-12-31" />
                  </div>
                </div>
              </>
            )}
            
            {currentStep === 2 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <WireframePlaceholder height="h-9" text="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <WireframePlaceholder height="h-9" text="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <WireframePlaceholder height="h-9" text="john.doe@example.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <WireframePlaceholder height="h-9" text="+1 (555) 123-4567" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <WireframePlaceholder height="h-9" text="Administrator" />
                </div>
              </>
            )}
            
            {currentStep === 3 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Theme Preference</label>
                  <div className="flex gap-2">
                    <WireframePlaceholder height="h-9" width="w-24" text="Light" />
                    <WireframePlaceholder height="h-9" width="w-24" text="Dark" />
                    <WireframePlaceholder height="h-9" width="w-24" text="System" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <WireframePlaceholder height="h-9" text="English (US)" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Notification Settings</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <WireframePlaceholder height="h-5" width="w-5" className="rounded" />
                      <span>Email notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <WireframePlaceholder height="h-5" width="w-5" className="rounded" />
                      <span>Push notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <WireframePlaceholder height="h-5" width="w-5" className="rounded" />
                      <span>SMS notifications</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {currentStep === 4 && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Method</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <WireframePlaceholder height="h-5" width="w-5" className="rounded-full" />
                      <span>Credit Card</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <WireframePlaceholder height="h-5" width="w-5" className="rounded-full" />
                      <span>PayPal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <WireframePlaceholder height="h-5" width="w-5" className="rounded-full" />
                      <span>Bank Transfer</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <WireframePlaceholder height="h-9" text="**** **** **** 1234" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiration Date</label>
                    <WireframePlaceholder height="h-9" text="12/24" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVC</label>
                    <WireframePlaceholder height="h-9" text="***" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Billing Address</label>
                  <WireframePlaceholder height="h-9" text="123 Main St, San Francisco, CA 94103" />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="ms-wizard-footer flex items-center justify-between">
        <button 
          className={cn(
            "ms-button ms-button-outline flex items-center gap-1 h-9 px-4 rounded-md border border-border bg-transparent text-foreground text-sm",
            currentStep === 1 && "opacity-50 cursor-not-allowed"
          )}
          disabled={currentStep === 1}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        
        <div className="flex items-center gap-2">
          <button className="ms-button ms-button-ghost text-muted-foreground h-9 px-4 rounded-md text-sm">
            Save Draft
          </button>
          
          <button className={cn(
            "ms-button ms-button-primary flex items-center gap-1 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm",
            currentStep === steps.length ? "ms-button-success bg-emerald-500 hover:bg-emerald-600" : ""
          )}>
            <span>{currentStep === steps.length ? 'Complete' : 'Continue'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </WireframeBase>
  );
};
