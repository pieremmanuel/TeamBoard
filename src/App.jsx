import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

// Main app content
function AppContent() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <Main />
      </div>
    </>
  );
}

// App entry point
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppContent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
