# Component-by-Component Tutorial

This guide provides a detailed walkthrough of each component in our Legal Services Portal, explaining the implementation step by step.

## Table of Contents
1. [App Component](#1-app-component)
2. [Header Component](#2-header-component)
3. [ProductList Component](#3-productlist-component)
4. [ProductDetails Component](#4-productdetails-component)
5. [DocumentUpload Component](#5-documentupload-component)
6. [API Service](#6-api-service)

## 1. App Component

### Purpose
The App component serves as the root component of our application, setting up routing and the main layout structure.

### Implementation Steps

1. **Setup Router**
```jsx
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Component content */}
    </Router>
  );
}
```

2. **Create Layout Structure**
```jsx
<div className="min-h-screen bg-gray-50">
  <Header />
  <main className="container mx-auto px-4 py-8">
    {/* Routes */}
  </main>
</div>
```

3. **Define Routes**
```jsx
<Routes>
  <Route path="/" element={<ProductList />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/upload/:id" element={<DocumentUpload />} />
</Routes>
```

### Key Learning Points
- Router setup and configuration
- Layout composition
- Route definition and organization
- Component hierarchy

## 2. Header Component

### Purpose
The Header component provides navigation and context across all pages.

### Implementation Steps

1. **Setup Navigation Links**
```jsx
<Link to="/" className="text-xl font-semibold">
  Legal Services Portal
</Link>
```

2. **Implement Breadcrumb Logic**
```jsx
const location = useLocation();

{location.pathname === '/' ? (
  <span>Home</span>
) : (
  <Link to="/">Home</Link>
)}
```

3. **Add Dynamic Path Segments**
```jsx
{location.pathname.includes('/product/') && (
  <>
    <span className="mx-2">/</span>
    <span>Product Details</span>
  </>
)}
```

### Key Learning Points
- React Router hooks (useLocation)
- Conditional rendering
- Navigation patterns
- Breadcrumb implementation

## 3. ProductList Component

### Purpose
Displays a grid of available legal services with basic information.

### Implementation Steps

1. **Setup State**
```jsx
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

2. **Implement Data Fetching**
```jsx
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await api.getServices();
      setProducts(response);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
```

3. **Create Product Grid**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {products.map((product) => (
    <div key={product.id} onClick={() => handleProductClick(product.id)}>
      {/* Product card content */}
    </div>
  ))}
</div>
```

### Key Learning Points
- State management with useState
- Side effects with useEffect
- Error handling
- Responsive grid layout
- Event handling

## 4. ProductDetails Component

### Purpose
Shows detailed information about a specific legal service.

### Implementation Steps

1. **Setup Route Parameters**
```jsx
const { id } = useParams();
const navigate = useNavigate();
```

2. **Implement Data Fetching**
```jsx
useEffect(() => {
  const fetchProductDetails = async () => {
    try {
      const response = await api.getServiceById(id);
      setProduct(response);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  fetchProductDetails();
}, [id]);
```

3. **Create Detail Sections**
```jsx
<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
  {/* Product sections */}
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2">Description</h2>
    <p className="text-gray-600">{product.description}</p>
  </div>
  {/* More sections */}
</div>
```

### Key Learning Points
- Route parameters
- Detailed data display
- Component organization
- Navigation handling

## 5. DocumentUpload Component

### Purpose
Handles file upload functionality for legal service documents.

### Implementation Steps

1. **Setup File State**
```jsx
const [files, setFiles] = useState([]);
const [uploading, setUploading] = useState(false);
const [uploadProgress, setUploadProgress] = useState(0);
```

2. **Implement File Validation**
```jsx
const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);
  const validFiles = selectedFiles.filter(file => {
    const isValidType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024;
    return isValidType && isValidSize;
  });
  setFiles(validFiles);
};
```

3. **Create Upload Form**
```jsx
<form onSubmit={handleSubmit} className="space-y-6">
  <input
    type="file"
    multiple
    onChange={handleFileChange}
    accept=".pdf,.jpg,.jpeg,.png"
  />
  {/* Progress and submit button */}
</form>
```

### Key Learning Points
- File input handling
- Form submission
- Progress tracking
- Error handling
- File validation

## 6. API Service

### Purpose
Provides centralized API communication for the application.

### Implementation Steps

1. **Setup API Methods**
```jsx
export const api = {
  getServices: async () => {
    await delay(800);
    return legalServices;
  },
  // More methods
};
```

2. **Implement Error Handling**
```jsx
getServiceById: async (id) => {
  await delay(500);
  const service = legalServices.find(s => s.id === parseInt(id));
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
};
```

3. **Add Upload Functionality**
```jsx
uploadDocuments: async (id, formData) => {
  await delay(1500);
  return { success: true, message: 'Documents uploaded successfully' };
};
```

### Key Learning Points
- API service structure
- Promise handling
- Error management
- Mock API implementation

## Best Practices Demonstrated

1. **Component Organization**
   - Single responsibility principle
   - Clear component hierarchy
   - Consistent naming conventions

2. **State Management**
   - Local state when appropriate
   - Lifted state when needed
   - Clear state updates

3. **Error Handling**
   - Try-catch blocks
   - Error state management
   - User feedback

4. **Performance**
   - Proper dependency arrays
   - Conditional rendering
   - Optimized re-renders

5. **Code Style**
   - Consistent formatting
   - Clear comments
   - Meaningful variable names

## Exercise Suggestions

1. **Add Features**
   - Implement service filtering
   - Add sorting options
   - Create a search function

2. **Enhance UI**
   - Add loading skeletons
   - Improve error messages
   - Add animations

3. **Extend Functionality**
   - Add user authentication
   - Implement favorites
   - Add user dashboard

4. **Improve Performance**
   - Add pagination
   - Implement infinite scroll
   - Add caching 