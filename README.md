# GlucoVA Frontend

A web application for glucose monitoring and diabetes management, built with modern web technologies.

## Technologies

- **React** - Frontend library for building user interfaces
- **TypeScript** - Static type-checking for JavaScript
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Motion** - Animation library for React
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful & customizable SVG icons

## Features

### 🏠 Dashboard

- Real-time glucose monitoring with auto-refresh every 30 seconds
- Latest glucose readings with color-coded status indicators
- Recent glucose records history
- Alert notifications with severity levels
- Responsive 3-column layout optimized for different screen sizes

### 📊 Health History

- Complete glucose level history with filtering options
- Configurable data display (10, 25, 50, 100 records)
- Color-coded glucose levels (Low, Normal, Elevated, High)
- Device tracking for each reading
- Timestamp and description for each record

### 🚨 Alert Management

- Configurable glucose alerts with multiple severity levels (Low, Medium, High, Critical)
- Device-specific alert configuration
- Alert history with filtering capabilities
- Real-time alert notifications on dashboard

### 📱 Device Management

- Register and manage glucose monitoring devices
- Device status tracking (Active/Inactive)
- Device registration timestamps
- Device removal capabilities

### 👥 Emergency Contacts

- Manage emergency contacts for critical alerts
- Full CRUD operations (Create, Read, Update, Delete)
- Contact cards with quick access to edit/delete
- Contact information including name, phone, and email

### 👤 User Profile

- Personal information management
- Profile photo upload
- Account settings and preferences
- Secure authentication system

### 🔐 Authentication

- Secure login and registration system
- JWT token-based authentication
- Protected routes with automatic redirects
- Session management


## Key Components

### Generic Components

- **GenericTable** - Reusable table component with sorting, actions, and loading states
- **GenericFilters** - Configurable filter component supporting multiple field types
- **LoadingSpinner** - Consistent loading indicators
- **ProtectedRoute** - Route protection for authenticated users

### Dashboard Components

- **SummaryCard** - Glucose level display with status indicators
- **RecentGlucoseRecords** - Latest readings with navigation to full history
- **RecentAlerts** - Recent alert notifications with severity indicators

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/glucova-frontend.git

# Navigate to project directory
cd glucova-frontend

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

The development server will start at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_base_url
```

### Building for Production

```bash
npm run build
# or
yarn build
```

### Linting

```bash
npm run lint
# or
yarn lint
```