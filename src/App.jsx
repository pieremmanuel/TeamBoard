import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import withAuth from './hocs/withAuth';


// Main app content
function AppContent() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

const ProtectedAppContent = withAuth(AppContent);

// App entry point
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<ProtectedAppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
