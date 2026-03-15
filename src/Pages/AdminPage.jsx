import React, { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import ShowComplaint from './showComplaint';
import AuthPage from '../components/AuthPage';

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
      setIsAuthenticated(true);
      setOpen(false);
    } else {
      setIsAuthenticated(false);
      setOpen(true);
    }
  }, []);

  const handleAuthClose = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'admin') {
      setIsAuthenticated(true);
      setOpen(false);
    }
  };

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <AuthPage onClose={handleAuthClose} />
        </div>
      )}

      {isAuthenticated && (
        <>
          <div className="flex justify-end p-4">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
          <AdminDashboard />
          <ShowComplaint selectedCategory="All" />
        </>
      )}
    </div>
  );
};

export default AdminPage;
