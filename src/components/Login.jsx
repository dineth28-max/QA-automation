import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'dineth' && password === 'dineth@123') {
      setError('');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-gray relative overflow-hidden">
      {/* Abstract Background Elements matching the app theme */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-mango opacity-20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-leaf opacity-20 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-white p-10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] relative z-10 border border-neutral-gray/50"
      >
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-heading font-bold text-neutral-black mb-2"
          >
            Welcome Back
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-neutral-black/60 font-sans"
          >
            Please enter your details to sign in.
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-black mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 bg-neutral-gray/50 border border-transparent rounded-xl focus:border-mango focus:ring-2 focus:ring-mango/20 transition-all outline-none font-sans"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-black mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-neutral-gray/50 border border-transparent rounded-xl focus:border-mango focus:ring-2 focus:ring-mango/20 transition-all outline-none font-sans"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-red-500 text-sm font-medium text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-mango hover:bg-mango-dark text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-mango/30"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
