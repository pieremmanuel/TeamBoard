import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;