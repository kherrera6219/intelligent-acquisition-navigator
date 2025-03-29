
import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import { usePagination } from './hooks/usePagination';
import { SimplePagination } from './components/ui/pagination/SimplePagination';

// Sample data
const SAMPLE_ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`
}));

// Lazy-loaded page components
const ComponentsShowcase = lazy(() => import('./pages/ComponentsShowcase'));
const TypographyPage = lazy(() => import('./pages/TypographyPage'));

function App() {
  const [items] = useState(SAMPLE_ITEMS);
  const { currentPage, totalPages, goToPage, paginateArray } = usePagination({
    initialPage: 1,
    pageSize: 10,
    totalItems: items.length
  });

  // Get current page items
  const currentItems = paginateArray(items);

  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={
            <div className="container mx-auto p-6">
              <h1 className="text-2xl font-bold mb-6">Items List</h1>
              <div className="bg-card shadow rounded-lg p-4 mb-6">
                <ul className="divide-y">
                  {currentItems.map((item) => (
                    <li key={item.id} className="py-3">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <SimplePagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={goToPage} 
              />
            </div>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/components" element={<ComponentsShowcase />} />
          <Route path="/typography" element={<TypographyPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
