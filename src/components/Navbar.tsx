import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LogOut, User as UserIcon } from 'lucide-react';
export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link
        to="/"
        className="flex items-center gap-2 text-primary font-bold text-xl">
        
        <FileText className="w-6 h-6" />
        <span>PDFMagic</span>
      </Link>

      <div className="flex items-center gap-4">
        {user ?
        <>
            {user.role === 'registered' &&
          <Link
            to="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            
                Dashboard
              </Link>
          }
            <Link
            to="/editor"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            
              Editor
            </Link>
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-8 h-8 bg-primary-100 text-primary rounded-full flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:inline">{user.name}</span>
            </div>
            <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-500 transition-colors"
            title="Logout">
            
              <LogOut className="w-5 h-5" />
            </button>
          </> :

        <>
            <Link
            to="/auth"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            
              Log in
            </Link>
            <Link
            to="/auth"
            className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-800 transition-colors">
            
              Sign up free
            </Link>
          </>
        }
      </div>
    </nav>);

};