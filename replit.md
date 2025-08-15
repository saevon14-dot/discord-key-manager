# Discord Key Management Bot

## Overview

This is a full-stack Discord bot application for managing and distributing keys (licenses/codes) through a web dashboard. The system features a React frontend with a modern UI built using shadcn/ui components, an Express.js backend with WebSocket support for real-time updates, and a Discord bot integration using discord.js. The application allows administrators to manage different types of keys (day, week, month, etc.), configure role-based permissions, and monitor bot activity through a comprehensive dashboard.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **UI Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **Routing**: Wouter for lightweight client-side routing
- **Real-time Updates**: WebSocket integration for live dashboard updates
- **Design System**: Custom Discord-themed color palette with CSS variables for theming

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Real-time Communication**: WebSocket server using the 'ws' library for broadcasting live updates
- **Discord Integration**: discord.js v14 for bot functionality with comprehensive event handling
- **Data Access**: Abstracted storage interface with in-memory implementation (designed for easy database migration)
- **API Design**: RESTful endpoints with structured error handling and request logging middleware

### Data Storage Strategy
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Database**: PostgreSQL (configured but not yet implemented - currently using in-memory storage)
- **Schema Design**: Normalized tables for keys, roles, settings, activity logs, and bot status
- **Migration System**: Drizzle Kit for database schema migrations and management

### Authentication & Authorization
- **Role-based Access**: Discord role-based permissions system with configurable key type access
- **Admin System**: Designated admin roles with full system access
- **Permission Model**: Granular permissions per key type (day, week, month, lifetime, custom)

### Key Management System
- **Key Types**: Pre-defined types (day, week, month, 3month, 6month, lifetime) plus custom types
- **Status Tracking**: Available/used status with usage history and user attribution
- **Bulk Operations**: Support for adding multiple keys simultaneously
- **Cleanup System**: Automated removal of expired keys

### Real-time Features
- **WebSocket Broadcasting**: Live updates for bot status changes, key usage, and activity logs
- **Dashboard Updates**: Real-time statistics and status monitoring  
- **Activity Logging**: Comprehensive event tracking with detailed metadata
- **Animated Galaxy Background**: Real-time moving stars, nebula clouds, and cosmic effects
- **Live UI Updates**: Instant reflection of all system changes across connected clients

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **discord.js**: Discord bot framework and API integration
- **wouter**: Lightweight React router
- **drizzle-orm**: Type-safe PostgreSQL ORM with Zod validation
- **@neondatabase/serverless**: PostgreSQL database driver for serverless environments

### UI Framework & Design System
- **@radix-ui/***: Comprehensive set of headless UI components
- **tailwindcss**: Utility-first CSS framework with custom galaxy theme
- **class-variance-authority**: Component variant management
- **Galaxy Theme**: Custom animated space background with:
  - Real-time moving stars with sparkle and drift animations
  - Color-shifting nebula clouds with flow effects
  - Purple, blue, pink cosmic color palette
  - Smooth transitions and hover effects
- **Logo System**: Custom animated "S" logo with gradient and glow effects

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety and development experience
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit-specific development features

### Database & Storage
- **PostgreSQL**: Primary database (configured via DATABASE_URL environment variable)
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **drizzle-zod**: Runtime validation using Zod schemas
- **In-Memory Storage**: Default storage system for immediate deployment
- **Production Ready**: Easy migration to PostgreSQL for persistence

### Deployment & Hosting
- **GitHub Pages**: Frontend-only deployment with animated UI and local storage
- **Railway (Recommended)**: 24/7 uptime, $5 monthly credits, full Discord bot functionality
- **Render, Cyclic, Glitch**: Additional free hosting options for complete Discord bot
- **Auto-Deploy**: GitHub Actions workflow for GitHub Pages, GitHub integration for other platforms
- **Production Build**: Optimized Vite build with esbuild server bundling
- **Environment Variables**: Secure configuration management
- **Deployment Files**: Complete configuration files for all platforms including GitHub Pages

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **zod**: Runtime type validation and schema definition