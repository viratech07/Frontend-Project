# Learning React Through Legal Services Portal

This guide will teach you React fundamentals using our Legal Services Portal project as a practical example.

## Table of Contents
1. [Project Setup & Basic Concepts](#1-project-setup--basic-concepts)
2. [Components & Props](#2-components--props)
3. [State & Lifecycle](#3-state--lifecycle)
4. [Routing & Navigation](#4-routing--navigation)
5. [Forms & User Input](#5-forms--user-input)
6. [API Integration](#6-api-integration)
7. [Best Practices & Advanced Concepts](#7-best-practices--advanced-concepts)

## 1. Project Setup & Basic Concepts

### Project Structure
```
my-react-app/
├── src/
│   ├── components/    # Reusable UI components
│   ├── screens/       # Page components
│   ├── services/      # API and utility functions
│   └── App.jsx        # Root component
```

### Key React Concepts Demonstrated
- JSX Syntax
- Component-Based Architecture
- Virtual DOM
- One-Way Data Flow

### Example from Our Project
```jsx
// App.jsx - Basic component structure
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          {/* Routes */}
        </main>
      </div>
    </Router>
  );
}
```

## 2. Components & Props

### Component Types
1. **Functional Components** (Used throughout our project)
2. **Class Components** (Legacy, not used in our project)

### Props Example
```jsx
// Header.jsx demonstrates props usage through routing
<Link to="/" className="text-xl">
  {props.title || "Legal Services Portal"}
</Link>
```

### Component Composition
Our project uses component composition in several ways:
1. Layout components (`Header`)
2. Page components (`ProductList`, `ProductDetails`)
3. Feature components (`DocumentUpload`)

## 3. State & Lifecycle

### useState Hook
Used in our components for managing local state:
```jsx
// ProductList.jsx
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### useEffect Hook
Used for side effects like API calls:
```jsx
// ProductDetails.jsx
useEffect(() => {
  const fetchProductDetails = async () => {
    try {
      const response = await api.getServiceById(id);
      setProduct(response);
    } catch (err) {
      setError(err.message);
    }
  };
  fetchProductDetails();
}, [id]);
```

## 4. Routing & Navigation

### React Router Setup
```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<ProductList />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/upload/:id" element={<DocumentUpload />} />
</Routes>
```

### Navigation Hooks
```jsx
// Using useNavigate
const navigate = useNavigate();
navigate(`/product/${id}`);

// Using useParams
const { id } = useParams();
```

## 5. Forms & User Input

### Controlled Components
Example from DocumentUpload.jsx:
```jsx
const [files, setFiles] = useState([]);

const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);
  // Validation logic
  setFiles(validFiles);
};
```

### Form Submission
```jsx
const handleSubmit = async (event) => {
  event.preventDefault();
  // Form processing logic
};
```

## 6. API Integration

### API Service Layer
```jsx
// api.js
export const api = {
  getServices: async () => {
    // API call implementation
  },
  getServiceById: async (id) => {
    // API call implementation
  },
  uploadDocuments: async (id, formData) => {
    // API call implementation
  }
};
```

### Error Handling
```jsx
try {
  const response = await api.getServiceById(id);
  setProduct(response);
} catch (err) {
  setError(err.message);
}
```

## 7. Best Practices & Advanced Concepts

### Code Organization
- Separate concerns (components, services, utilities)
- Consistent file naming
- Component modularity

### Performance Optimization
1. **Proper useEffect Dependencies**
```jsx
useEffect(() => {
  // Effect logic
}, [id]); // Only re-run when id changes
```

2. **Conditional Rendering**
```jsx
{loading ? (
  <LoadingSpinner />
) : error ? (
  <ErrorMessage error={error} />
) : (
  <ProductContent product={product} />
)}
```

### Error Boundaries
Implementing error boundaries for graceful error handling:
```jsx
class ErrorBoundary extends React.Component {
  // Error boundary implementation
}
```

## Practical Exercises

1. **Basic Component Creation**
   - Create a new component for displaying legal service categories
   - Add it to the ProductList screen

2. **State Management**
   - Add sorting functionality to the ProductList
   - Implement filtering by category

3. **Form Handling**
   - Add a contact form component
   - Implement form validation

4. **API Integration**
   - Add a new API endpoint for user feedback
   - Implement the frontend integration

## Additional Resources

1. [React Official Documentation](https://reactjs.org/docs/getting-started.html)
2. [React Router Documentation](https://reactrouter.com/)
3. [React Hooks Reference](https://reactjs.org/docs/hooks-reference.html)
4. [JavaScript MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Project Extensions

1. **Authentication**
   - Add user login/registration
   - Implement protected routes

2. **State Management**
   - Integrate Redux or Context API
   - Manage global application state

3. **Testing**
   - Add unit tests with Jest
   - Add integration tests with React Testing Library

4. **Advanced Features**
   - Real-time updates with WebSocket
   - Offline support with Service Workers
   - Advanced form validation
   - File upload progress with chunks 