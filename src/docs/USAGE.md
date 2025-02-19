
# Usage Guide

## Getting Started

### Authentication
```typescript
// Login
const { user } = await auth.signIn({
  email: 'user@example.com',
  password: 'password'
});

// Signup
const { user } = await auth.signUp({
  email: 'user@example.com',
  password: 'password'
});
```

### Proposals Management
```typescript
// List proposals
const { proposals } = await proposalsApi.list();

// Create proposal
const newProposal = await proposalsApi.create({
  title: 'New Proposal',
  description: 'Description'
});

// Update proposal
await proposalsApi.update(id, {
  status: 'approved'
});
```

### Dashboard Usage
```typescript
// Fetch metrics
const metrics = await dashboardApi.getMetrics();

// Update date range
await dashboardApi.updateDateRange({
  start: new Date(),
  end: new Date()
});
```

## Best Practices

### Error Handling
```typescript
try {
  await api.someOperation();
} catch (error) {
  if (error instanceof AuthError) {
    // Handle auth errors
  } else {
    // Handle other errors
  }
}
```

### State Management
```typescript
// Using React Query
const { data, isLoading } = useQuery({
  queryKey: ['proposals'],
  queryFn: fetchProposals
});

// Local state
const [filterValue, setFilterValue] = useState('');
```

### Component Usage
```typescript
// Page layout
<MainLayout>
  <PageHeader 
    title="Dashboard"
    description="Overview of key metrics"
  />
  <DashboardContent />
</MainLayout>

// Forms
<AuthForm
  mode="login"
  onSubmit={handleLogin}
  loading={isLoading}
/>
```

## Advanced Features

### Custom Hooks
```typescript
// Using custom hooks
const { metrics, isLoading } = useMetrics();
const { proposals } = useProposals();
const { user } = useAuth();
```

### Keyboard Shortcuts
```typescript
// Register shortcuts
useKeyboardShortcuts({
  'ctrl+s': handleSave,
  'esc': handleCancel
});
```

### Accessibility
```typescript
// Screen reader text
<span className="sr-only">Loading...</span>

// ARIA labels
<button aria-label="Close modal">×</button>
```

## Troubleshooting

1. Authentication Issues
- Check credentials
- Verify token expiration
- Clear local storage

2. Data Loading
- Check network requests
- Verify API endpoints
- Review error responses

3. UI Problems
- Check browser console
- Verify component props
- Review style overrides
