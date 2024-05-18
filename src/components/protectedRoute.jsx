import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
     const isAuthenticated = !!sessionStorage.getItem('user_id');
     const navigate = useNavigate();

     React.useEffect(() => {
          if (!isAuthenticated) {
               navigate('/auth');
          }
     }, [isAuthenticated, navigate]);

     if (!isAuthenticated) {
          return null; 
     }

     return children;
};

export default ProtectedRoute;
