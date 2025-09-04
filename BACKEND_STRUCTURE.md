# Backend Structure Documentation
## Game Top-Up Platform Backend Design

### Project Overview
Backend API untuk platform top-up game dengan fitur user management, product management, order processing, dan payment integration dengan Midtrans.

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Midtrans Snap
- **File Upload**: Multer
- **Email Service**: Nodemailer
- **Environment Variables**: dotenv

### Folder Structure
```
backend/
│
├── src/
│   ├── config/
│   │   ├── database.js          # Database connection configuration
│   │   ├── jwt.js               # JWT configuration
│   │   ├── midtrans.js          # Midtrans payment gateway config
│   │   └── email.js             # Email service configuration
│   │
│   ├── controllers/
│   │   ├── authController.js    # Authentication (login, register)
│   │   ├── userController.js    # User profile management
│   │   ├── productController.js # Product CRUD operations
│   │   ├── itemController.js    # Product items CRUD
│   │   ├── orderController.js   # Order management
│   │   ├── paymentController.js # Payment processing
│   │   └── reportController.js  # Admin reports
│   │
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   ├── admin.js             # Admin role verification
│   │   ├── validation.js        # Request data validation
│   │   ├── upload.js            # File upload middleware
│   │   └── errorHandler.js      # Global error handling
│   │
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Product.js           # Product model
│   │   ├── Item.js              # Product item model
│   │   ├── Order.js             # Order model
│   │   ├── Transaction.js       # Payment transaction model
│   │   └── index.js             # Model associations
│   │
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── users.js             # User management routes
│   │   ├── products.js          # Product routes
│   │   ├── items.js             # Product items routes
│   │   ├── orders.js            # Order routes
│   │   ├── payments.js          # Payment routes
│   │   └── reports.js           # Admin reports routes
│   │
│   ├── services/
│   │   ├── authService.js       # Authentication business logic
│   │   ├── userService.js       # User operations
│   │   ├── productService.js    # Product operations
│   │   ├── orderService.js      # Order processing
│   │   ├── paymentService.js    # Payment processing with Midtrans
│   │   ├── emailService.js      # Email notifications
│   │   └── reportService.js     # Report generation
│   │
│   ├── utils/
│   │   ├── helpers.js           # General utility functions
│   │   ├── validators.js        # Data validation functions
│   │   ├── constants.js         # Application constants
│   │   └── logger.js            # Logging configuration
│   │
│   └── app.js                   # Express app configuration
│
├── uploads/                     # File upload directory
│   ├── products/                # Product images
│   └── temp/                    # Temporary files
│
├── tests/                       # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/                        # API documentation
│   ├── api.md
│   └── deployment.md
│
├── scripts/                     # Database and deployment scripts
│   ├── seed.js                  # Database seeding
│   └── migrate.js               # Database migrations
│
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
├── server.js                    # Application entry point
└── README.md                    # Project documentation
```

### API Endpoints Structure

#### Authentication Routes (`/api/auth`)
```
POST   /register        # User registration
POST   /login           # User login
POST   /logout          # User logout
POST   /refresh         # Refresh JWT token
POST   /forgot-password # Password reset request
POST   /reset-password  # Password reset confirmation
```

#### User Routes (`/api/users`)
```
GET    /profile         # Get user profile
PUT    /profile         # Update user profile
PUT    /change-password # Change password
GET    /transactions    # Get user transaction history
```

#### Product Routes (`/api/products`)
```
GET    /                # Get all products (public)
GET    /:id             # Get product by ID (public)
POST   /                # Create product (admin only)
PUT    /:id             # Update product (admin only)
DELETE /:id             # Delete product (admin only)
POST   /:id/upload      # Upload product image (admin only)
```

#### Product Items Routes (`/api/items`)
```
GET    /                # Get all items
GET    /product/:id     # Get items by product ID
POST   /                # Create item (admin only)
PUT    /:id             # Update item (admin only)
DELETE /:id             # Delete item (admin only)
```

#### Order Routes (`/api/orders`)
```
POST   /                # Create new order
GET    /                # Get user orders
GET    /:id             # Get order by ID
PUT    /:id/status      # Update order status (admin only)
GET    /admin/all       # Get all orders (admin only)
```

#### Payment Routes (`/api/payments`)
```
POST   /create          # Create payment with Midtrans
POST   /notification    # Midtrans webhook notification
GET    /:id/status      # Check payment status
```

#### Report Routes (`/api/reports`)
```
GET    /dashboard       # Dashboard statistics (admin only)
GET    /sales           # Sales reports (admin only)
GET    /products        # Product performance (admin only)
GET    /export/pdf      # Export report to PDF (admin only)
```

### Database Models Structure

#### User Model
```javascript
{
  id: INTEGER PRIMARY KEY AUTO_INCREMENT,
  username: VARCHAR(50) UNIQUE NOT NULL,
  email: VARCHAR(100) UNIQUE NOT NULL,
  password: VARCHAR(255) NOT NULL, // Hashed
  role: ENUM('user', 'admin') DEFAULT 'user',
  created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
}
```

#### Product Model
```javascript
{
  id: INTEGER PRIMARY KEY AUTO_INCREMENT,
  name: VARCHAR(100) NOT NULL,
  description: TEXT,
  image: VARCHAR(255),
  category: VARCHAR(50),
  is_active: BOOLEAN DEFAULT true,
  created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
}
```

#### Item Model
```javascript
{
  id: INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_id: INTEGER FOREIGN KEY REFERENCES products(id),
  name: VARCHAR(100) NOT NULL,
  price: DECIMAL(10,2) NOT NULL,
  bonus: VARCHAR(50),
  is_active: BOOLEAN DEFAULT true,
  created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
}
```

#### Order Model
```javascript
{
  id: INTEGER PRIMARY KEY AUTO_INCREMENT,
  order_id: VARCHAR(20) UNIQUE NOT NULL, // Generated order ID
  user_id: INTEGER FOREIGN KEY REFERENCES users(id),
  product_id: INTEGER FOREIGN KEY REFERENCES products(id),
  item_id: INTEGER FOREIGN KEY REFERENCES items(id),
  game_username: VARCHAR(100) NOT NULL,
  amount: DECIMAL(10,2) NOT NULL,
  status: ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
  created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
}
```

#### Transaction Model
```javascript
{
  id: INTEGER PRIMARY KEY AUTO_INCREMENT,
  order_id: INTEGER FOREIGN KEY REFERENCES orders(id),
  midtrans_order_id: VARCHAR(100),
  payment_type: VARCHAR(50),
  transaction_status: VARCHAR(50),
  payment_url: TEXT,
  amount: DECIMAL(10,2) NOT NULL,
  created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
}
```

### Required Dependencies (package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "sequelize": "^6.32.1",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.4",
    "midtrans-client": "^1.3.1",
    "joi": "^17.9.2",
    "dotenv": "^16.3.1",
    "express-rate-limit": "^6.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "supertest": "^6.3.3"
  }
}
```

### Environment Variables (.env)
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gamestore_db
DB_USER=root
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Midtrans Configuration
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_email_password

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

### Security Features
1. **Authentication**: JWT-based authentication
2. **Authorization**: Role-based access control (user/admin)
3. **Password Security**: bcrypt hashing
4. **Rate Limiting**: API request rate limiting
5. **CORS**: Cross-origin resource sharing configuration
6. **Helmet**: Security headers
7. **Input Validation**: Joi validation for all inputs
8. **File Upload Security**: File type and size restrictions

### Payment Integration
- **Midtrans Snap**: For payment processing
- **Webhook Handling**: Automatic payment status updates
- **Transaction Logging**: Complete payment audit trail

### Development Setup Instructions
1. Install Node.js and MySQL
2. Clone repository and install dependencies: `npm install`
3. Set up MySQL database
4. Configure environment variables in `.env`
5. Run database migrations: `npm run migrate`
6. Seed initial data: `npm run seed`
7. Start development server: `npm run dev`

### API Documentation
- Use tools like Swagger/OpenAPI for API documentation
- Include request/response examples
- Document authentication requirements
- Provide error code explanations

### Testing Strategy
- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Complete user flow testing
- **Load Testing**: Performance testing

This backend structure provides a solid foundation for your game top-up platform with proper separation of concerns, security features, and scalability considerations.