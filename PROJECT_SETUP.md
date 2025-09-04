# GameStore - Game Top-Up Platform Setup Guide

## Project Overview
Sebuah platform top-up game modern yang dibangun dengan React JavaScript untuk frontend dan dirancang untuk backend Node.js dengan MySQL database. Platform ini menyediakan fitur lengkap untuk user dan admin management, product catalog, order processing, dan payment integration dengan Midtrans.

## Technology Stack

### Frontend
- **React 18** dengan JavaScript (bukan TypeScript)
- **Vite** untuk build tool yang cepat
- **React Router DOM** untuk client-side routing
- **Axios** untuk HTTP client
- **CSS Modules** dengan responsive design

### Backend (Rancangan)
- **Node.js + Express.js** untuk REST API
- **MySQL** untuk database relational
- **JWT** untuk authentication
- **Midtrans Snap** untuk payment gateway
- **Multer** untuk file upload
- **Nodemailer** untuk email service

## Cara Menjalankan Frontend React

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment (Opsional)
Salin file `.env.example` menjadi `.env` dan sesuaikan konfigurasi:
```bash
cp .env.example .env
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Frontend akan berjalan di `http://localhost:5000`

### 4. Build untuk Production
```bash
npm run build
```

## Struktur Folder Frontend

```
src/
├── components/          # Komponen reusable
│   ├── Navbar.jsx      # Navigation bar
│   ├── Footer.jsx      # Footer
│   ├── ProductCard.jsx # Card produk
│   ├── Carousel.jsx    # Carousel banner
│   └── AdminSidebar.jsx # Sidebar admin
│
├── pages/              # Halaman-halaman utama
│   ├── auth/           # Authentication pages
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── user/           # User pages
│   │   ├── UserHome.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Payment.jsx
│   │   ├── Transactions.jsx
│   │   └── Profile.jsx
│   │
│   └── admin/          # Admin pages
│       ├── AdminDashboard.jsx
│       ├── AdminProducts.jsx
│       ├── AdminItems.jsx
│       ├── AdminOrders.jsx
│       └── AdminReports.jsx
│
├── css/                # Styling files
│   ├── global.css      # Global styles
│   ├── auth.css        # Authentication styles
│   ├── user.css        # User pages styles
│   ├── admin.css       # Admin panel styles
│   └── responsive.css  # Mobile responsive
│
├── hooks/              # Custom React hooks
│   └── useAuth.jsx     # Authentication hook
│
├── services/           # API services (untuk implementasi backend)
├── utils/              # Utility functions
└── App.jsx             # Main app component
```

## Fitur Yang Tersedia

### User Features
1. **Authentication**
   - Login dengan username/email dan password
   - Register dengan role selection (user/admin)
   - Logout functionality

2. **Browse Products**
   - Lihat semua produk tanpa login
   - Carousel banner promosi
   - Search functionality
   - Product categories

3. **Product Purchase**
   - Detail produk dengan pilihan item
   - Input username game
   - Checkout process (requires login)
   - Payment integration (designed for Midtrans)

4. **User Management**
   - Profile editing
   - Transaction history
   - Password change

### Admin Features
1. **Dashboard**
   - Statistics overview
   - Quick metrics
   - Charts placeholder

2. **Product Management**
   - CRUD operations untuk produk
   - Image upload support
   - Category management

3. **Item Management**
   - CRUD operations untuk item produk
   - Price and bonus configuration
   - Product association

4. **Order Management**
   - View all orders
   - Update order status
   - Filter by status

5. **Reports**
   - Sales reports
   - Revenue analytics
   - Export to PDF (placeholder)

## Testing Credentials

### Admin Access
- Username: `admin`
- Password: any password (mock authentication)

### User Access
- Username: any username
- Password: any password (mock authentication)

**Note**: Saat ini menggunakan mock authentication untuk testing. Untuk production, implementasi backend dengan JWT authentication diperlukan.

## Database Schema

Database MySQL telah dirancang dengan tabel-tabel berikut:
- `users` - User management
- `products` - Product catalog
- `items` - Product items/variations
- `orders` - Order processing
- `transactions` - Payment records
- `admin_logs` - Admin activity tracking
- `system_settings` - System configuration

File SQL schema lengkap tersedia di `database_schema.sql`

## Next Steps untuk Backend Implementation

1. **Setup Backend Environment**
   ```bash
   mkdir backend
   cd backend
   npm init -y
   npm install express mysql2 sequelize jsonwebtoken bcryptjs cors helmet morgan multer nodemailer midtrans-client joi dotenv
   ```

2. **Database Setup**
   - Install MySQL
   - Import `database_schema.sql`
   - Configure connection in backend

3. **API Development**
   - Implement authentication endpoints
   - Create CRUD operations
   - Add payment integration
   - Setup file upload

4. **Integration**
   - Update frontend API calls
   - Replace mock data with real API
   - Add error handling
   - Implement loading states

## Security Considerations

1. **Frontend Security**
   - Input validation
   - XSS protection
   - CSRF protection via SameSite cookies
   - Secure authentication state management

2. **Backend Security** (Planned)
   - Password hashing dengan bcrypt
   - JWT token security
   - Rate limiting
   - SQL injection protection
   - File upload security

## Deployment Considerations

### Frontend Deployment
- Build static files dengan `npm run build`
- Deploy ke Vercel, Netlify, atau web server
- Configure environment variables
- Setup custom domain

### Backend Deployment (Planned)
- Deploy ke VPS atau cloud platform
- Setup MySQL database
- Configure environment variables
- Setup SSL certificate
- Monitor dan logging

## Support dan Development

Untuk pengembangan lebih lanjut atau pertanyaan, pastikan untuk:
1. Ikuti struktur folder yang ada
2. Gunakan naming convention yang konsisten
3. Tambahkan proper error handling
4. Write clean dan documented code
5. Test fitur sebelum deployment

---

**Created by**: Replit Agent
**Last Updated**: September 2025
**Version**: 1.0.0