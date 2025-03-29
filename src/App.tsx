
import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import { usePagination } from './hooks/usePagination';
import { SimplePagination } from './components/ui/pagination/SimplePagination';
import { MsFluentCard } from './components/ui/MsFluentCard';
import { SectionTitle } from './components/ui/universal/SectionTitle';

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
  const { 
    currentPage, 
    totalPages, 
    goToPage, 
    paginateArray,
    changePageSize,
    itemsPerPage
  } = usePagination({
    initialPage: 1,
    pageSize: 10,
    totalItems: items.length
  });

  // Get current page items
  const currentItems = paginateArray(items);

  // Available page sizes
  const pageSizes = [5, 10, 20, 50];

  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={
            <div className="container mx-auto p-6">
              <SectionTitle 
                title="Pagination Demo" 
                description="A demonstration of different pagination components and options"
                size="large"
                align="center"
                className="mb-8"
              />

              <div className="grid gap-8">
                <MsFluentCard className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Items List</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Items per page:</span>
                      <select 
                        value={itemsPerPage}
                        onChange={(e) => changePageSize(Number(e.target.value))}
                        className="border rounded p-1 text-sm"
                      >
                        {pageSizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
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
                </MsFluentCard>

                <div className="grid md:grid-cols-2 gap-6">
                  <MsFluentCard className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Minimal Pagination</h2>
                    <div className="mb-6 p-4 bg-card shadow rounded-lg">
                      <p className="text-muted-foreground">Simple pagination with just page information and arrows</p>
                    </div>
                    <SimplePagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={goToPage}
                      variant="minimal"
                    />
                  </MsFluentCard>

                  <MsFluentCard className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Compact Pagination</h2>
                    <div className="mb-6 p-4 bg-card shadow rounded-lg">
                      <p className="text-muted-foreground">Compact pagination with page numbers but no text labels</p>
                    </div>
                    <SimplePagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={goToPage}
                      variant="compact"
                    />
                  </MsFluentCard>
                </div>
              </div>
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
