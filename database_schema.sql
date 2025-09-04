-- =====================================================
-- Game Top-Up Platform Database Schema
-- MySQL Database Schema for GameStore Platform
-- =====================================================

-- Create database
CREATE DATABASE IF NOT EXISTS gamestore_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gamestore_db;

-- =====================================================
-- Users Table
-- =====================================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    email_verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- =====================================================
-- Products Table
-- =====================================================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    category VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_is_active (is_active),
    INDEX idx_sort_order (sort_order)
);

-- =====================================================
-- Product Items Table
-- =====================================================
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    bonus VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_price (price),
    INDEX idx_is_active (is_active),
    INDEX idx_sort_order (sort_order)
);

-- =====================================================
-- Orders Table
-- =====================================================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(20) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    item_id INT NOT NULL,
    game_username VARCHAR(100) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    admin_fee DECIMAL(12,2) DEFAULT 1000.00,
    total_amount DECIMAL(12,2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    notes TEXT NULL,
    processed_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- Transactions Table (Payment Records)
-- =====================================================
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    midtrans_order_id VARCHAR(100),
    payment_type VARCHAR(50),
    transaction_status VARCHAR(50),
    payment_url TEXT,
    amount DECIMAL(12,2) NOT NULL,
    settlement_time TIMESTAMP NULL,
    fraud_status VARCHAR(50) NULL,
    midtrans_response JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_midtrans_order_id (midtrans_order_id),
    INDEX idx_transaction_status (transaction_status)
);

-- =====================================================
-- User Sessions Table (Optional - for JWT blacklisting)
-- =====================================================
CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_jti VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_blacklisted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token_jti (token_jti),
    INDEX idx_expires_at (expires_at)
);

-- =====================================================
-- Password Reset Tokens Table
-- =====================================================
CREATE TABLE password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at)
);

-- =====================================================
-- Admin Activity Logs Table
-- =====================================================
CREATE TABLE admin_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50),
    record_id INT,
    old_values JSON NULL,
    new_values JSON NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_admin_id (admin_id),
    INDEX idx_action (action),
    INDEX idx_table_name (table_name),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- System Settings Table
-- =====================================================
CREATE TABLE system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_setting_key (setting_key)
);

-- =====================================================
-- Insert Initial Data
-- =====================================================

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password, role) VALUES 
('admin', 'admin@gamestore.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample products
INSERT INTO products (name, description, image, category, sort_order) VALUES 
('Mobile Legends', 'Top-up Diamond Mobile Legends Bang Bang', '/images/mobile-legends.jpg', 'MOBA', 1),
('Free Fire', 'Top-up Diamond Free Fire', '/images/free-fire.jpg', 'Battle Royale', 2),
('PUBG Mobile', 'Top-up UC PUBG Mobile', '/images/pubg.jpg', 'Battle Royale', 3),
('Genshin Impact', 'Top-up Genesis Crystal Genshin Impact', '/images/genshin.jpg', 'RPG', 4);

-- Insert sample items for Mobile Legends (product_id = 1)
INSERT INTO items (product_id, name, price, bonus, sort_order) VALUES 
(1, '86 Diamond', 20000, '0 Bonus', 1),
(1, '172 Diamond', 40000, '0 Bonus', 2),
(1, '257 Diamond', 60000, '1 Bonus', 3),
(1, '344 Diamond', 80000, '2 Bonus', 4),
(1, '429 Diamond', 100000, '3 Bonus', 5),
(1, '514 Diamond', 120000, '4 Bonus', 6),
(1, '706 Diamond', 160000, '8 Bonus', 7),
(1, '878 Diamond', 200000, '12 Bonus', 8);

-- Insert sample items for Free Fire (product_id = 2)
INSERT INTO items (product_id, name, price, bonus, sort_order) VALUES 
(2, '70 Diamond', 12000, '0 Bonus', 1),
(2, '140 Diamond', 24000, '0 Bonus', 2),
(2, '210 Diamond', 36000, '5 Bonus', 3),
(2, '355 Diamond', 60000, '15 Bonus', 4),
(2, '720 Diamond', 120000, '35 Bonus', 5),
(2, '1450 Diamond', 240000, '75 Bonus', 6);

-- Insert sample items for PUBG Mobile (product_id = 3)
INSERT INTO items (product_id, name, price, bonus, sort_order) VALUES 
(3, '60 UC', 12000, '5 Bonus', 1),
(3, '325 UC', 60000, '25 Bonus', 2),
(3, '660 UC', 120000, '60 Bonus', 3),
(3, '1800 UC', 300000, '200 Bonus', 4),
(3, '3850 UC', 600000, '485 Bonus', 5);

-- Insert sample items for Genshin Impact (product_id = 4)
INSERT INTO items (product_id, name, price, bonus, sort_order) VALUES 
(4, '60 Genesis Crystal', 15000, '0 Bonus', 1),
(4, '330 Genesis Crystal', 75000, '30 Bonus', 2),
(4, '1090 Genesis Crystal', 240000, '110 Bonus', 3),
(4, '2240 Genesis Crystal', 480000, '240 Bonus', 4),
(4, '3880 Genesis Crystal', 800000, '440 Bonus', 5);

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES 
('site_name', 'GameStore', 'Website name'),
('admin_fee', '1000', 'Default admin fee for transactions'),
('order_timeout', '3600', 'Order timeout in seconds (1 hour)'),
('max_order_per_day', '10', 'Maximum orders per user per day'),
('maintenance_mode', 'false', 'Enable/disable maintenance mode');

-- =====================================================
-- Views for Reports
-- =====================================================

-- Daily sales view
CREATE VIEW daily_sales AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
    SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) as completed_revenue
FROM orders 
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Monthly sales view
CREATE VIEW monthly_sales AS
SELECT 
    YEAR(created_at) as year,
    MONTH(created_at) as month,
    DATE_FORMAT(created_at, '%Y-%m') as month_year,
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
    SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) as completed_revenue
FROM orders 
GROUP BY YEAR(created_at), MONTH(created_at)
ORDER BY year DESC, month DESC;

-- Product performance view
CREATE VIEW product_performance AS
SELECT 
    p.id,
    p.name as product_name,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_revenue,
    COUNT(CASE WHEN o.status = 'completed' THEN 1 END) as completed_orders,
    SUM(CASE WHEN o.status = 'completed' THEN o.total_amount ELSE 0 END) as completed_revenue
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
GROUP BY p.id, p.name
ORDER BY completed_revenue DESC;

-- =====================================================
-- Stored Procedures
-- =====================================================

-- Procedure to generate unique order ID
DELIMITER //
CREATE PROCEDURE GenerateOrderId(OUT order_id VARCHAR(20))
BEGIN
    DECLARE prefix VARCHAR(5);
    DECLARE suffix INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE temp_id VARCHAR(20);
    
    SET prefix = 'GS';
    SET suffix = FLOOR(RAND() * 900000) + 100000;
    
    REPEAT
        SET temp_id = CONCAT(prefix, LPAD(suffix, 6, '0'));
        
        SELECT COUNT(*) INTO done FROM orders WHERE orders.order_id = temp_id;
        
        IF done > 0 THEN
            SET suffix = FLOOR(RAND() * 900000) + 100000;
        END IF;
    UNTIL done = 0 END REPEAT;
    
    SET order_id = temp_id;
END //
DELIMITER ;

-- Procedure to clean up expired sessions
DELIMITER //
CREATE PROCEDURE CleanupExpiredSessions()
BEGIN
    DELETE FROM user_sessions WHERE expires_at < NOW();
    DELETE FROM password_reset_tokens WHERE expires_at < NOW();
END //
DELIMITER ;

-- =====================================================
-- Triggers
-- =====================================================

-- Trigger to generate order ID automatically
DELIMITER //
CREATE TRIGGER before_order_insert 
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    DECLARE new_order_id VARCHAR(20);
    
    IF NEW.order_id IS NULL OR NEW.order_id = '' THEN
        CALL GenerateOrderId(new_order_id);
        SET NEW.order_id = new_order_id;
    END IF;
    
    SET NEW.total_amount = NEW.amount + NEW.admin_fee;
END //
DELIMITER ;

-- Trigger to log admin activities
DELIMITER //
CREATE TRIGGER log_product_changes
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    DECLARE admin_user_id INT DEFAULT 0;
    
    -- This would be set by the application context
    -- For now, we'll use a placeholder
    INSERT INTO admin_logs (admin_id, action, table_name, record_id, old_values, new_values)
    VALUES (
        admin_user_id, 
        'UPDATE', 
        'products', 
        NEW.id,
        JSON_OBJECT('name', OLD.name, 'description', OLD.description, 'is_active', OLD.is_active),
        JSON_OBJECT('name', NEW.name, 'description', NEW.description, 'is_active', NEW.is_active)
    );
END //
DELIMITER ;

-- =====================================================
-- Indexes for Performance
-- =====================================================

-- Additional indexes for better query performance
CREATE INDEX idx_orders_status_created ON orders(status, created_at);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_transactions_status_created ON transactions(transaction_status, created_at);

-- =====================================================
-- Sample Queries for Testing
-- =====================================================

-- Get user order history
-- SELECT o.*, p.name as product_name, i.name as item_name, t.transaction_status
-- FROM orders o
-- JOIN products p ON o.product_id = p.id
-- JOIN items i ON o.item_id = i.id
-- LEFT JOIN transactions t ON o.id = t.order_id
-- WHERE o.user_id = 1
-- ORDER BY o.created_at DESC;

-- Get daily sales report
-- SELECT * FROM daily_sales WHERE date >= CURDATE() - INTERVAL 30 DAY;

-- Get product performance
-- SELECT * FROM product_performance;

-- Get admin dashboard stats
-- SELECT 
--     (SELECT COUNT(*) FROM products WHERE is_active = true) as total_products,
--     (SELECT COUNT(*) FROM orders) as total_orders,
--     (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status = 'completed') as total_revenue,
--     (SELECT COUNT(*) FROM orders WHERE status = 'pending') as pending_orders;

-- =====================================================
-- Database Complete
-- =====================================================