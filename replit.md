# QuoteSync - Daily Motivation App

## Overview

QuoteSync is a cross-platform application that displays time-based motivational quotes with Google authentication and push notifications. It consists of a web application and a mobile app wrapper.

The web application is built with Next.js and React, featuring Google authentication via NextAuth.js and Material UI components. The mobile application is built with React Native, providing a WebView to the web content and Firebase Cloud Messaging for push notifications.

The project is currently being transitioned to a modern tech stack using React, Vite, Drizzle ORM, and ShadCN UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The system follows a client-server architecture with the following components:

1. **Client**:
   - Web application built with React + Vite
   - UI components from ShadCN UI library (based on Radix UI)
   - React Router (via Wouter) for navigation
   - React Query for data fetching and state management

2. **Server**:
   - Express.js server
   - API routes with a RESTful structure
   - Database abstraction through Drizzle ORM
   - Session-based authentication

3. **Database**:
   - PostgreSQL database (configured via Drizzle ORM)
   - Schema defined in `shared/schema.ts`

4. **Mobile Application**:
   - React Native wrapper
   - WebView to display web content
   - Firebase Cloud Messaging for push notifications

## Key Components

### Web Application

1. **Authentication**:
   - Google OAuth authentication via Next Auth
   - Session management for logged-in users

2. **Quote Display**:
   - Time-based motivational quotes that change hourly
   - Quote data stored in JSON format

3. **UI Components**:
   - Material UI for the legacy app 
   - ShadCN UI (Radix + Tailwind CSS) for the new implementation
   - Responsive design for various screen sizes

### Server

1. **Express API**:
   - RESTful endpoints prefixed with `/api`
   - Request/response logging middleware
   - Error handling middleware

2. **Storage Interface**:
   - Abstract storage layer with CRUD operations
   - Currently implemented as an in-memory storage

3. **Database Schema**:
   - User table with username and password fields

### Mobile Application

1. **WebView Container**:
   - Displays the web application content
   - Passes authentication context between native and web

2. **Push Notifications**:
   - Firebase Cloud Messaging integration
   - Permission handling
   - Notification display

## Data Flow

1. **Authentication Flow**:
   - User clicks "Sign in with Google" button
   - Google OAuth flow redirects to authentication provider
   - Upon successful authentication, creates session
   - Session information stored in database and cookie

2. **Quote Display Flow**:
   - Application retrieves current hour from device
   - Queries quotes database/JSON for the corresponding quote
   - Renders quote in the UI with author attribution

3. **Push Notification Flow**:
   - Mobile app requests notification permissions
   - App registers with FCM and receives a token
   - Token is sent to server for storage
   - Server sends notifications through Firebase
   - App receives and displays notifications

## External Dependencies

1. **Frontend**:
   - React and React DOM for UI
   - ShadCN UI (Radix UI + Tailwind CSS) for components
   - TanStack Query (React Query) for data fetching
   - Wouter for client-side routing
   - Lucide for icons

2. **Backend**:
   - Express.js for the server
   - Drizzle ORM for database operations
   - Connect-PG-Simple for session management
   - Neon Database Serverless for PostgreSQL connectivity

3. **Mobile**:
   - React Native for mobile app framework
   - React Native WebView for embedding web content
   - Firebase Cloud Messaging for push notifications

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

1. **Development Mode**:
   - `npm run dev` starts both the Vite dev server and Express server
   - Local development served on port 5000

2. **Production Build**:
   - Client-side code bundled with Vite (`vite build`)
   - Server-side code bundled with esbuild
   - Static assets served by Express

3. **Database**:
   - Configured to connect to a PostgreSQL database provided by Replit
   - Database migrations managed through Drizzle Kit

4. **Continuous Deployment**:
   - Automatic builds on code changes
   - Environment variables managed through Replit Secrets

5. **Scaling**:
   - Configured for auto-scaling via Replit deployment settings
   - Session persistence across scaled instances

## Implementation Roadmap

1. **Immediate Tasks**:
   - Complete the migration from Next.js to React + Vite
   - Implement complete authentication flow with Express backend
   - Set up database schema and migrations

2. **Next Steps**:
   - Implement quote fetching and display logic
   - Create user preferences and settings pages
   - Implement push notification subscription management

3. **Future Enhancements**:
   - Add offline support and PWA capabilities
   - Implement user quote collections and favorites
   - Add social sharing features