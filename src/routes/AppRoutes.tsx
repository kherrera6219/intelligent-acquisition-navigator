import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingPage } from "@/components/LoadingPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { ExternalPageLayout } from "@/components/layout/ExternalPageLayout";
import { ProtectedPageLayout } from "@/components/layout/ProtectedPageLayout";

// Import route collections
import landingRoutes from './landingRoutes';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import acquisitionRoutes from './acquisitionRoutes';
import settingsRoutes from './settingsRoutes';

// Import specific pages for route definitions that aren't in collections
import { lazy } from 'react';

const ChatPage = lazy(() => import('@/pages/ChatPage'));
const ImproveApp = lazy(() => import('@/pages/ImproveApp'));
const KnowledgeBasePage = lazy(() => import('@/pages/KnowledgeBasePage'));
const ValidationPage = lazy(() => import('@/pages/ValidationPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ActivityPage = lazy(() => import('@/pages/ActivityPage'));
const CodeReviewPage = lazy(() => import('@/pages/CodeReviewPage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Landing routes */}
        {landingRoutes.map((route, index) => (
          <Route 
            key={`landing-${index}`} 
            path={route.path} 
            element={
              <ExternalPageLayout>
                {route.element}
              </ExternalPageLayout>
            } 
          />
        ))}
        
        {/* Auth routes */}
        {authRoutes.map((route, index) => (
          <Route 
            key={`auth-${index}`} 
            path={route.path} 
            element={
              <ExternalPageLayout 
                showHeader={false} 
                showFooter={false}
              >
                {route.element}
              </ExternalPageLayout>
            } 
          />
        ))}
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute children={null} />}>
          {/* Dashboard routes */}
          {dashboardRoutes.map((route, index) => (
            <Route 
              key={`dashboard-${index}`} 
              path={route.path} 
              element={
                <ProtectedPageLayout>
                  {route.element}
                </ProtectedPageLayout>
              } 
            />
          ))}
          
          {/* Acquisition routes */}
          {acquisitionRoutes.map((route, index) => (
            <Route 
              key={`acquisition-${index}`} 
              path={route.path} 
              element={
                <ProtectedPageLayout>
                  {route.element}
                </ProtectedPageLayout>
              } 
            />
          ))}
          
          {/* Settings routes */}
          {settingsRoutes.map((route, index) => (
            <Route 
              key={`settings-${index}`} 
              path={route.path} 
              element={
                <ProtectedPageLayout>
                  {route.element}
                </ProtectedPageLayout>
              } 
            />
          ))}
          
          {/* Activity page */}
          <Route 
            path="/activity" 
            element={
              <ProtectedPageLayout>
                <ActivityPage />
              </ProtectedPageLayout>
            } 
          />
          
          {/* Code Review page */}
          <Route 
            path="/code-review" 
            element={
              <ProtectedPageLayout>
                <CodeReviewPage />
              </ProtectedPageLayout>
            } 
          />
          
          {/* Additional utility routes */}
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/validation" element={<ValidationPage />} />
        </Route>
        
        {/* Public utility routes */}
        <Route path="/improve" element={<ImproveApp />} />
        
        {/* Redirect root to dashboard if authenticated, otherwise to landing page */}
        <Route 
          path="/" 
          element={<Navigate to="/dashboard" replace />} 
        />
        
        {/* Catch all (404) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
