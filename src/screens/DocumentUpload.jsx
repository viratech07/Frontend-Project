/**
 * DocumentUpload Component
 * Handles file upload functionality for legal service documents
 * Similar to Express route handler for POST /products/:id/documents endpoint
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Routing hooks
import { api } from '../services/api'; // API service for data operations

/**
 * DocumentUpload Component Implementation
 * Manages document upload process for a specific legal service
 * 
 * Requirements:
 * - Must fetch product details for context
 * - Must handle file selection and validation
 * - Must show upload progress
 * - Must handle upload errors
 * - Must provide feedback on upload status
 * - Must maintain responsive layout
 * 
 * File Validation Rules:
 * - Allowed types: PDF, JPEG, PNG
 * - Maximum size: 5MB per file
 * 
 * State Management:
 * - files: Array of selected files
 * - uploading: Boolean for upload state
 * - uploadProgress: Number for progress percentage
 * - error: String/null for error messages
 * - product: Object for product context
 */
function DocumentUpload() {
  // URL parameters - Similar to Express req.params.id
  const { id } = useParams();
  const navigate = useNavigate(); // Navigation hook for redirection

  // State declarations - Similar to Express request processing
  const [files, setFiles] = useState([]); // Selected files storage
  const [uploading, setUploading] = useState(false); // Upload state tracker
  const [uploadProgress, setUploadProgress] = useState(0); // Progress indicator
  const [error, setError] = useState(null); // Error message storage
  const [product, setProduct] = useState(null); // Product context

  /**
   * Product details fetching effect
   * Runs on component mount to get product context
   * Similar to Express middleware for data validation
   */
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.getServiceById(id);
        setProduct(response); // Store product details
      } catch (err) {
        setError('Failed to load product details');
      }
    };

    fetchProductDetails();
  }, [id]);

  /**
   * File change handler
   * Validates and processes selected files
   * Similar to Express multer middleware validation
   * @param {Event} event - File input change event
   */
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    // File validation - Similar to Express multer file filter
    const validFiles = selectedFiles.filter(file => {
      const isValidType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    // Handle validation errors
    if (validFiles.length !== selectedFiles.length) {
      setError('Some files were rejected. Please ensure all files are PDF, JPEG, or PNG and under 5MB.');
    }

    setFiles(validFiles); // Store valid files
    setError(null); // Clear previous errors
  };

  /**
   * Form submission handler
   * Processes file upload
   * Similar to Express POST route handler
   * @param {Event} event - Form submission event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);
    setError(null);

    try {
      // Prepare form data - Similar to Express multer processing
      const formData = new FormData();
      files.forEach(file => {
        formData.append('documents', file);
      });
      formData.append('productId', id);

      // Simulate upload progress - In real app, would use XHR or Fetch progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      // Upload files
      await api.uploadDocuments(id, formData);
      setUploadProgress(100);
      clearInterval(interval);
      
      // Navigate after successful upload
      setTimeout(() => {
        navigate(`/product/${id}?upload=success`);
      }, 500);
    } catch (err) {
      setError(err.message || 'Failed to upload documents');
      setUploading(false);
    }
  };

  // Loading state render
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Main render - Upload form
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Page title with product context */}
        <h1 className="text-3xl font-bold mb-4">Upload Documents</h1>
        <h2 className="text-xl text-gray-600 mb-6">for {product.name}</h2>

        {/* Error message display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Upload form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File input section */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Required Documents
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              disabled={uploading}
            />
            <p className="mt-1 text-sm text-gray-500">
              Accepted formats: PDF, JPEG, PNG (max 5MB each)
            </p>
          </div>

          {/* Selected files list */}
          {files.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Selected Files:</h3>
              <ul className="list-disc list-inside">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Upload progress bar */}
          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-sm text-gray-600 mt-1">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={files.length === 0 || uploading}
            className={`w-full bg-blue-500 text-white px-6 py-2 rounded 
              ${files.length === 0 || uploading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-600'} 
              transition-colors`}
          >
            {uploading ? 'Uploading...' : 'Upload Documents'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DocumentUpload; 