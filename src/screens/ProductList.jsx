/**
 * ProductList Component
 * Displays a grid of legal service products
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import { api } from '../services/api'; // API service for data fetching

/**
 * ProductList Component Implementation
 * Fetches and displays all available legal services
 * 
 * Requirements:
 * - Must fetch and display all products
 * - Must handle loading states
 * - Must handle error states
 * - Must provide navigation to product details
 * - Must be responsive (grid layout)
 * 
 * State Management:
 * - products: Array of product objects from API
 * - loading: Boolean for loading state
 * - error: String/null for error state
 */
function ProductList() {
  // State declarations - Similar to variables in Express route handler
  const [products, setProducts] = useState([]); // Product data storage
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error message storage
  
  // Navigation hook - Similar to Express res.redirect()
  const navigate = useNavigate();

  /**
   * Data fetching effect
   * Runs on component mount (like Express middleware)
   * Handles API call, loading state, and error handling
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // API returns array of products with IDs
        const response = await api.getServices();
        // Example response:
        // [
        //   { id: 1, name: "Contract Review", price: 299.99 },    <- product.id = 1
        //   { id: 2, name: "Legal Consultation", price: 199.99 }  <- product.id = 2
        // ]
        setProducts(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /**
   * Navigation handler for product details
   * @param {number} productId - Parameter name is camelCase by convention
   * 
   * Naming Explanation:
   * - product.id: Property access from product object (lowercase from API)
   * - productId: Parameter name in camelCase (JavaScript convention)
   * 
   * Example:
   * When clicking a product card:
   * 1. product = { id: 1, name: "Contract Review" }
   * 2. handleProductClick(product.id)
   *    - product.id is 1 (accessing the 'id' property)
   *    - this value becomes the productId parameter
   * 3. navigate(`/product/${productId}`)
   *    - productId is still 1, just named differently
   */
  const handleProductClick = (productId) => {
    // productId is just a parameter name, it contains the value from product.id
    navigate(`/product/${productId}`);
  };

  // Loading state render - Similar to Express intermediate response
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state render - Similar to Express error handler
  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  // Main render - Similar to Express response.send()
  return (
    <div className="container mx-auto p-4">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6">Legal Services Products</h1>
      
      {/* Product grid - Responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 
          products.map() explanation:
          - 'product' parameter represents each item in products array
          - Each product object has: { id, name, description, price }
          - product.id is used for both the key prop and click handler
        */}
        {products.map((product) => {
          // Destructure id from product to make property access clear
          const { id, name, description, price } = product;
          
          return (
            <div 
              key={id} // or key={product.id}
              onClick={() => handleProductClick(id)} // or handleProductClick(product.id)
              className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              role="button"
              aria-label={`View details for ${name}`}
            >
              <h2 className="text-xl font-semibold mb-2">{name}</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <p className="text-blue-500 font-semibold">${price}</p>
            </div>
          );
        })}

        {/* Show message if no products are available */}
        {products.length === 0 && !loading && !error && (
          <div className="col-span-full text-center text-gray-500">
            No legal services available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList; 