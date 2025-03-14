import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingPage } from "@/components/LoadingPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { ExternalPageLayout } from "@/components/layout/ExternalPageLayout";
import { ProtectedPageLayout } from "@/components/layout/ProtectedPageLayout";
import { AppLayout } from "@/components/layout/AppLayout";
import UniversalInternalHeader from "@/components/layout/UniversalInternalHeader";
import { InternalFooter } from "@/components/layout/InternalFooter";
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';

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
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

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
          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Dashboard routes with internal layout */}
          {dashboardRoutes.map((route, index) => (
            <Route 
              key={`dashboard-${index}`} 
              path={route.path} 
              element={
                <>
                  <UniversalInternalHeader />
                  <NetworkStatusBanner />
                  <ProtectedPageLayout title={route.title || ""}>
                    {route.element}
                  </ProtectedPageLayout>
                  <InternalFooter />
                </>
              } 
            />
          ))}
          
          {/* Acquisition routes with internal layout */}
          {acquisitionRoutes.map((route, index) => (
            <Route 
              key={`acquisition-${index}`} 
              path={route.path} 
              element={
                <>
                  <UniversalInternalHeader />
                  <NetworkStatusBanner />
                  <ProtectedPageLayout title={route.title || ""}>
                    {route.element}
                  </ProtectedPageLayout>
                  <InternalFooter />
                </>
              } 
            />
          ))}
          
          {/* Settings routes with internal layout */}
          {settingsRoutes.map((route, index) => (
            <Route 
              key={`settings-${index}`} 
              path={route.path} 
              element={
                <>
                  <UniversalInternalHeader />
                  <NetworkStatusBanner />
                  <ProtectedPageLayout title={route.title || ""}>
                    {route.element}
                  </ProtectedPageLayout>
                  <InternalFooter />
                </>
              } 
            />
          ))}
          
          {/* Other protected routes */}
          <Route 
            path="/activity" 
            element={
              <AppLayout>
                <ActivityPage />
              </AppLayout>
            } 
          />
          
          <Route 
            path="/knowledge-base" 
            element={
              <AppLayout>
                <KnowledgeBasePage />
              </AppLayout>
            } 
          />
          
          <Route 
            path="/chat" 
            element={
              <AppLayout>
                <ChatPage />
              </AppLayout>
            } 
          />
          
          <Route 
            path="/improve" 
            element={
              <AppLayout>
                <ImproveApp />
              </AppLayout>
            } 
          />
          
          <Route 
            path="/validation" 
            element={
              <AppLayout>
                <ValidationPage />
              </AppLayout>
            } 
          />
          
          <Route 
            path="/code-review" 
            element={
              <AppLayout>
                <CodeReviewPage />
              </AppLayout>
            } 
          />
        </Route>
        
        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
