/**
 * ProductDetails Component
 * Displays detailed information about a specific legal service
 * Similar to Express route handler for GET /products/:id endpoint
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Routing hooks
import { api } from '../services/api'; // API service for data fetching

/**
 * ProductDetails Component Implementation
 * Fetches and displays detailed information about a specific product
 * 
 * Requirements:
 * - Must fetch product details using ID from URL
 * - Must display comprehensive product information
 * - Must handle loading and error states
 * - Must provide navigation to document upload
 * - Must maintain responsive layout
 * 
 * URL Parameters:
 * - id: Product ID from route parameter
 * 
 * State Management:
 * - product: Object containing product details
 * - loading: Boolean for loading state
 * - error: String/null for error state
 */
function ProductDetails() {
  // URL parameters - Similar to Express req.params.id
  const { id } = useParams();
  const navigate = useNavigate(); // Navigation hook for redirection

  // State declarations - Similar to Express response preparation
  const [product, setProduct] = useState(null); // Product data storage
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error message storage

  /**
   * Data fetching effect
   * Runs on component mount and when ID changes
   * Similar to Express middleware that validates and fetches data
   */
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // API call to get product details
        const response = await api.getServiceById(id);
        setProduct(response); // Store fetched product
        setLoading(false); // Turn off loading state
      } catch (err) {
        setError(err.message); // Store error message
        setLoading(false); // Turn off loading state even on error
      }
    };

    fetchProductDetails();
  }, [id]); // Re-run if product ID changes

  /**
   * Upload button click handler
   * Navigates to document upload page
   * Similar to Express redirect
   */
  const handleUploadClick = () => {
    navigate(`/upload/${id}`); // Navigate to upload page with current product ID
  };

  // Loading state render
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state render
  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="text-center p-4">
        Product not found
      </div>
    );
  }

  // Main render - Product details display
  return (
    <div className="container mx-auto p-4">
      {/* Product details card */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Product title */}
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        
        {/* Product description section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* Product details section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Price: ${product.price}</li>
            <li>Duration: {product.duration}</li>
            <li>Category: {product.category}</li>
          </ul>
        </div>

        {/* Requirements section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc list-inside text-gray-600">
            {product.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Upload documents button */}
        <button
          onClick={handleUploadClick}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Upload Documents
        </button>
      </div>
    </div>
  );
}

export default ProductDetails; 