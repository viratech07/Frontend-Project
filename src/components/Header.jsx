/**
 * Header Component
 * Provides navigation and breadcrumb context for the application
 * Similar to Express middleware that adds common response headers and navigation context
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Router hooks for navigation and location info

/**
 * Header Component Implementation
 * Renders the top navigation bar and breadcrumb trail
 * Use case: Consistent navigation across all pages
 * Requirements:
 * - Must show current page context
 * - Must provide navigation links
 * - Must be responsive
 */
function Header() {
  // Get current route location - Similar to Express req.path
  const location = useLocation();
  
  return (
    // Main navigation container with shadow and white background
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Flex container for logo and breadcrumbs */}
        <div className="flex justify-between items-center">
          {/* Logo/Home link - Always visible */}
          <Link 
            to="/" 
            className="text-xl font-semibold text-gray-800 hover:text-blue-600"
            // Interactive element for navigation
          >
            Legal Services Portal
          </Link>
          
          {/* 
            Breadcrumb navigation
            Shows current page context in hierarchy
            Similar to Express route hierarchy/middleware stack
          */}
          <div className="text-sm text-gray-500">
            {/* Home link/text - Conditional rendering based on current path */}
            {location.pathname === '/' ? (
              <span>Home</span> // Current page - no link needed
            ) : (
              <Link to="/" className="hover:text-blue-600">Home</Link> // Link to home when on other pages
            )}
            
            {/* Product Details breadcrumb - Show when viewing product details */}
            {location.pathname.includes('/product/') && (
              <>
                <span className="mx-2">/</span>
                <span>Product Details</span>
              </>
            )}
            
            {/* Document Upload breadcrumb - Show when on upload page */}
            {location.pathname.includes('/upload/') && (
              <>
                <span className="mx-2">/</span>
                <span>Document Upload</span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header; 