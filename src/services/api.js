/**
 * Mock API Service
 * In a real application, this would be replaced with actual API calls to your Express.js backend
 * This service mimics the behavior of a RESTful API with simulated network delays
 */

// Mock data structure - Represents your MongoDB/database schema in Express
// Each object represents a legal service product with its properties
const legalServices = [
  {
    id: 1, // Primary key, similar to MongoDB _id
    name: "Contract Review", // Main title of the service
    description: "Professional review and analysis of legal contracts", // Detailed description
    price: 299.99, // Service cost - stored as number for calculations
    duration: "3-5 business days", // Service delivery timeframe
    category: "Business Law", // Service category for filtering/grouping
    requirements: [ // Array of required documents - similar to subdocument in MongoDB
      "Original contract document",
      "Company registration details",
      "Signatory information"
    ]
  },
  // Additional mock services...
  {
    id: 2,
    name: "Legal Consultation",
    description: "One-on-one consultation with experienced lawyers",
    price: 199.99,
    duration: "1 hour",
    category: "General Law",
    requirements: [
      "Personal identification",
      "Case summary document",
      "Related legal documents"
    ]
  },
  {
    id: 3,
    name: "Document Preparation",
    description: "Professional preparation of legal documents",
    price: 399.99,
    duration: "5-7 business days",
    category: "Documentation",
    requirements: [
      "Required information form",
      "Supporting documents",
      "Notarized identification"
    ]
  }
];

/**
 * Utility function to simulate network latency
 * Similar to Express middleware that adds artificial delay for testing
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Resolves after specified delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * API methods object - Similar to Express route handlers
 * Each method simulates a different API endpoint with appropriate delay
 */
export const api = {
  /**
   * Get all legal services
   * Similar to Express GET route: app.get('/api/legal-services')
   * Use case: Display all services in the product list
   * @returns {Promise<Array>} Array of legal services
   */
  getServices: async () => {
    await delay(800); // Simulate network delay for realistic behavior
    return legalServices;
  },

  /**
   * Get single legal service by ID
   * Similar to Express GET route: app.get('/api/legal-services/:id')
   * Use case: Display detailed information about a specific service
   * @param {string|number} id - Service ID to fetch
   * @returns {Promise<Object>} Single legal service object
   * @throws {Error} When service is not found
   */
  getServiceById: async (id) => {
    await delay(500);
    const service = legalServices.find(s => s.id === parseInt(id));
    if (!service) {
      // Similar to Express 404 response
      throw new Error('Service not found');
    }
    return service;
  },

  /**
   * Upload documents for a legal service
   * Similar to Express POST route with multer: app.post('/api/legal-services/:id/documents')
   * Use case: Submit required documents for a service
   * @param {string|number} id - Service ID to upload documents for
   * @param {FormData} formData - Form data containing files and additional information
   * @returns {Promise<Object>} Upload result
   */
  uploadDocuments: async (id, formData) => {
    await delay(1500); // Longer delay to simulate file upload
    // In a real Express backend, this would:
    // 1. Use multer to handle file uploads
    // 2. Save files to disk or cloud storage
    // 3. Store file metadata in database
    // 4. Return success/failure response
    return { success: true, message: 'Documents uploaded successfully' };
  }
}; 