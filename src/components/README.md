
# Components Documentation

This document provides detailed documentation for all React components in the application.

## Core Components

### AuthForm
**Purpose**: Handles user authentication (login/signup)
**Props**:
```typescript
{
  mode: 'login' | 'signup';
  onSubmit: (data: AuthFormData) => Promise<void>;
  loading?: boolean;
}
```
**Usage Example**:
```tsx
<AuthForm 
  mode="login" 
  onSubmit={handleLogin} 
  loading={isLoading} 
/>
```

### DashboardPage
**Purpose**: Main dashboard view displaying metrics and activities
**Props**: None
**Key Features**:
- Real-time metrics display
- Data filtering
- Refresh functionality
- Date range selection

### ProposalsPage
**Purpose**: Displays and manages proposals
**Props**: None
**Key Features**:
- Proposal listing
- Search functionality
- Sorting and filtering
- Pagination

### TexasChatContainer
**Purpose**: Container for Texas-specific chat functionality
**Props**:
```typescript
{
  initialMessages?: TexasMessage[];
  onSendMessage: (message: string) => Promise<void>;
  agencyType: TexasAgencyType;
  userRole: TexasRole;
}
```

## UI Components

### Button
**Purpose**: Reusable button component
**Props**:
```typescript
{
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
```

### Card
**Purpose**: Container component for content sections
**Props**:
```typescript
{
  children: React.ReactNode;
  className?: string;
}
```

### Input
**Purpose**: Form input component
**Props**:
```typescript
{
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}
```

### Toast
**Purpose**: Notification system
**Usage**:
```typescript
const { toast } = useToast();

toast({
  title: "Success",
  description: "Operation completed successfully"
});
```

## Layout Components

### MainLayout
**Purpose**: Main application layout wrapper
**Props**:
```typescript
{
  children: React.ReactNode;
}
```
**Features**:
- Navigation header
- Sidebar menu
- Content area
- Responsive design

### PageHeader
**Purpose**: Consistent header for all pages
**Props**:
```typescript
{
  title: string;
  description?: string;
  actions?: React.ReactNode;
}
```

## Best Practices

1. Component Usage
- Keep components small and focused
- Use TypeScript for type safety
- Follow React hooks rules
- Implement proper error boundaries

2. State Management
- Use React Query for server state
- Local state with useState/useReducer
- Context for global state
- Proper loading states

3. Performance
- Implement proper memoization
- Lazy load components when needed
- Optimize re-renders
- Use proper key props in lists

4. Accessibility
- Proper ARIA labels
- Keyboard navigation
- Color contrast
- Screen reader support
