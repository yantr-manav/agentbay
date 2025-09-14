import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
// import NotificationCenter from './NotificationCenter'; // Temporarily disabled

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cyber-gradient rounded-lg animate-glow"></div>
            <span className="text-2xl font-bold text-cyber-gradient">AgentBay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/explore" 
              className={`transition-colors ${
                isActive('/explore') 
                  ? 'text-cyber-aqua' 
                  : 'text-white/80 hover:text-cyber-aqua'
              }`}
            >
              Explore Agents
            </Link>
            <Link 
              to="/demo" 
              className={`transition-colors ${
                isActive('/demo') 
                  ? 'text-cyber-aqua' 
                  : 'text-white/80 hover:text-cyber-aqua'
              }`}
            >
              Try Demo
            </Link>
            {user && (
              <>
                <Link 
                  to="/upload" 
                  className={`transition-colors ${
                    isActive('/upload') 
                      ? 'text-cyber-aqua' 
                      : 'text-white/80 hover:text-cyber-aqua'
                  }`}
                >
                  Upload Agent
                </Link>
                <Link 
                  to="/dashboard" 
                  className={`transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-cyber-aqua' 
                      : 'text-white/80 hover:text-cyber-aqua'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/wallet" 
                  className={`transition-colors ${
                    isActive('/wallet') 
                      ? 'text-cyber-aqua' 
                      : 'text-white/80 hover:text-cyber-aqua'
                  }`}
                >
                  Wallet
                </Link>
                <Link 
                  to="/settings" 
                  className={`transition-colors ${
                    isActive('/settings') 
                      ? 'text-cyber-aqua' 
                      : 'text-white/80 hover:text-cyber-aqua'
                  }`}
                >
                  Settings
                </Link>
              </>
            )}
            <Link 
              to="/payment" 
              className={`transition-colors ${
                isActive('/payment') 
                  ? 'text-cyber-aqua' 
                  : 'text-white/80 hover:text-cyber-aqua'
              }`}
            >
              Pricing
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {/* <NotificationCenter /> */}
                <span className="text-white/70">Welcome!</span>
                <Button 
                  variant="outline" 
                  onClick={signOut}
                  className="border-cyber-violet text-cyber-violet hover:bg-cyber-violet hover:text-white"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className="text-white/80 hover:text-cyber-aqua"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="outline" 
                    className="border-cyber-violet text-cyber-violet hover:bg-cyber-violet hover:text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                to="/explore" 
                className={`transition-colors ${
                  isActive('/explore') 
                    ? 'text-cyber-aqua' 
                    : 'text-white/80 hover:text-cyber-aqua'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Explore Agents
              </Link>
              <Link 
                to="/demo" 
                className={`transition-colors ${
                  isActive('/demo') 
                    ? 'text-cyber-aqua' 
                    : 'text-white/80 hover:text-cyber-aqua'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Try Demo
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/upload" 
                    className={`transition-colors ${
                      isActive('/upload') 
                        ? 'text-cyber-aqua' 
                        : 'text-white/80 hover:text-cyber-aqua'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Upload Agent
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className={`transition-colors ${
                      isActive('/dashboard') 
                        ? 'text-cyber-aqua' 
                        : 'text-white/80 hover:text-cyber-aqua'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/wallet" 
                    className={`transition-colors ${
                      isActive('/wallet') 
                        ? 'text-cyber-aqua' 
                        : 'text-white/80 hover:text-cyber-aqua'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Wallet
                  </Link>
                  <Link 
                    to="/settings" 
                    className={`transition-colors ${
                      isActive('/settings') 
                        ? 'text-cyber-aqua' 
                        : 'text-white/80 hover:text-cyber-aqua'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="text-white/60 hover:text-white w-full text-left justify-start"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className="text-white/80 hover:text-cyber-aqua w-full text-left justify-start"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="border-cyber-violet text-cyber-violet hover:bg-cyber-violet hover:text-white w-full"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;