import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FileText, ArrowLeft, Github } from 'lucide-react';
export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/dashboard');
    }
  };
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length > 6) strength += 33;
    if (password.match(/[A-Z]/)) strength += 33;
    if (password.match(/[0-9]/)) strength += 34;
    return strength;
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      
      <motion.div
        animate={{
          rotate: -360
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          
          <ArrowLeft className="w-4 h-4" /> Back to home
        </button>
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a free account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{
                opacity: 0,
                x: isLogin ? -20 : 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: isLogin ? 20 : -20
              }}
              transition={{
                duration: 0.2
              }}
              className="space-y-6"
              onSubmit={handleSubmit}>
              
              {!isLogin &&
              <div>
                  <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700">
                  
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                    id="name"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                  
                  </div>
                </div>
              }
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="you@example.com" />
                  
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                  
                </div>
                {!isLogin && password &&
                <div className="mt-2 flex gap-1 h-1.5">
                    <div
                    className={`flex-1 rounded-full ${getPasswordStrength() > 0 ? 'bg-red-500' : 'bg-gray-200'}`}>
                  </div>
                    <div
                    className={`flex-1 rounded-full ${getPasswordStrength() > 33 ? 'bg-yellow-500' : 'bg-gray-200'}`}>
                  </div>
                    <div
                    className={`flex-1 rounded-full ${getPasswordStrength() > 66 ? 'bg-green-500' : 'bg-gray-200'}`}>
                  </div>
                  </div>
                }
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                  
                  {isLogin ? 'Sign in' : 'Sign up'}
                </button>
              </div>
            </motion.form>
          </AnimatePresence>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <Github className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setPassword('');
                }}
                className="text-sm font-medium text-primary hover:text-primary-800">
                
                {isLogin ?
                "Don't have an account? Sign up" :
                'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

};