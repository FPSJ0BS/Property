-- Create database
CREATE DATABASE IF NOT EXISTS property_db;
USE property_db;

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(20),
  property_type ENUM('house', 'apartment', 'condo', 'land', 'commercial') DEFAULT 'house',
  bedrooms INT DEFAULT 0,
  bathrooms INT DEFAULT 0,
  area_sqft INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
