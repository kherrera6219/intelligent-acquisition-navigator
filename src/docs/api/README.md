
# API Documentation

This document provides comprehensive documentation for all API endpoints and data structures used in the application.

## Authentication

### Login
- **Endpoint**: `/auth/login`
- **Method**: POST
- **Body**:
  ```typescript
  {
    email: string;
    password: string;
  }
  ```
- **Response**:
  ```typescript
  {
    user: {
      id: string;
      email: string;
      role: string;
    };
    token: string;
  }
  ```

### Logout
- **Endpoint**: `/auth/logout`
- **Method**: POST
- **Authentication**: Required
- **Response**: Status 200

## Proposals

### List Proposals
- **Endpoint**: `/proposals`
- **Method**: GET
- **Authentication**: Required
- **Query Parameters**:
  - page: number
  - searchTerm: string
- **Response**:
  ```typescript
  {
    proposals: Array<{
      id: string;
      title: string;
      description: string;
      status: string;
      submittedAt: string;
      updatedAt: string;
    }>;
    totalPages: number;
  }
  ```

### Get Proposal Details
- **Endpoint**: `/proposals/:id`
- **Method**: GET
- **Authentication**: Required
- **Response**:
  ```typescript
  {
    id: string;
    title: string;
    description: string;
    status: string;
    submittedAt: string;
    updatedAt: string;
    attachments: Array<{
      id: string;
      name: string;
      url: string;
    }>;
    evaluations: Array<{
      id: string;
      comment: string;
      rating: number;
    }>;
  }
  ```

## Dashboard

### Get Dashboard Metrics
- **Endpoint**: `/dashboard/metrics`
- **Method**: GET
- **Authentication**: Required
- **Response**:
  ```typescript
  {
    totalProposals: number;
    activeProjects: number;
    pendingReviews: number;
    metrics: Array<{
      date: string;
      value: number;
      category: string;
    }>;
    activities: Array<{
      date: string;
      value: number;
      type: string;
    }>;
  }
  ```
