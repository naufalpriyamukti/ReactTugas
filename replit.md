# Overview

This is a complete game top-up platform built with React JavaScript. The platform allows users to purchase in-game items and currency for various games. Features include user authentication with role-based access (users and admins), product catalog management, order processing, and payment integration designed for Midtrans. Users can browse products without authentication but must login to complete purchases. Admins have access to a comprehensive dashboard for managing products, orders, and viewing reports.

**Current Status**: Frontend is fully implemented and functional. Backend structure and database schema are documented and ready for implementation.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with JavaScript (not TypeScript despite config files)
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router DOM for client-side navigation
- **State Management**: React hooks (useState, useEffect, useContext) for local state
- **HTTP Client**: Axios for API communication
- **Styling**: Modular CSS files organized by feature (auth, admin, user, global, responsive)

## Backend Architecture (Planned)
- **Runtime**: Node.js with Express.js framework
- **Database**: MySQL for relational data storage
- **Authentication**: JWT (JSON Web Tokens) for stateless authentication
- **File Handling**: Multer middleware for image uploads
- **Email Service**: Nodemailer for transactional emails
- **Error Handling**: Centralized error handling middleware

## Data Models
The backend design includes these core entities:
- **Users**: Authentication and profile management with role-based access
- **Products**: Game categories and product information
- **Items**: Specific purchasable items within products (diamonds, coins, etc.)
- **Orders**: Purchase transactions and order history
- **Transactions**: Payment processing records

## Authentication & Authorization
- JWT-based authentication system
- Role-based access control (user/admin)
- Protected routes requiring authentication for checkout
- Admin-only access for management features

## UI/UX Design Principles
- Light mode, clean and intuitive interface
- Responsive design for mobile, tablet, and desktop
- Consistent styling with modular CSS architecture
- Guest browsing allowed, authentication required for purchases

# External Dependencies

## Payment Gateway
- **Midtrans Snap**: Indonesian payment gateway for processing transactions
- Handles multiple payment methods and secure payment processing

## Development Tools
- **Vite**: Modern build tool with hot module reloading
- **React**: UI library for component-based architecture
- **React Router DOM**: Client-side routing solution
- **Axios**: Promise-based HTTP client for API calls

## Database
- **MySQL**: Relational database for storing user data, products, orders, and transactions
- Environment-based configuration for database connections

## Additional Services
- **Nodemailer**: Email service for user notifications and order confirmations
- **Multer**: File upload handling for product images and user avatars
- **dotenv**: Environment variable management for secure configuration