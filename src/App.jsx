/**
 * Main Application Component
 * Serves as the root component and handles routing configuration
 * Similar to Express app setup with middleware and route configuration
 */
import React from 'react';
// Router components for client-side routing - Similar to Express Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Screen components - Similar to Express route handlers
import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';
import DocumentUpload from './screens/DocumentUpload';
// Layout components - Similar to Express middleware
import Header from './components/Header';

/**
 * App Component Implementation
 * Sets up the application structure and routing
 * 
 * Requirements:
 * - Must handle all route definitions
 * - Must provide consistent layout wrapper
 * - Must maintain responsive design
 * 
 * Similar to Express concepts:
 * - Router setup is like Express app.use(router)
 * - Routes are like Express app.get('/path', handler)
 * - Layout wrapping is like Express middleware
 */
function App() {
  return (
    // Router wrapper - Enables client-side routing
    <Router>
      {/* Main application container with minimum height and background */}
      <div className="min-h-screen bg-gray-50">
        {/* Header component - Persistent across all routes */}
        <Header />
        
        {/* Main content area with responsive padding */}
        <main className="container mx-auto px-4 py-8">
          {/* Route definitions - Similar to Express routes */}
          <Routes>
            {/* Home route - Shows product list */}
            <Route path="/" element={<ProductList />} />
            
            {/* Product details route with dynamic ID parameter */}
            <Route path="/product/:id" element={<ProductDetails />} />
            
            {/* Document upload route with dynamic ID parameter */}
            <Route path="/upload/:id" element={<DocumentUpload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 