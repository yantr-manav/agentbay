
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        const { error } = await signIn(email, password);
        if (!error) {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'github' | 'azure' | 'apple') => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });
      
      if (error) {
        console.error(`${provider} auth error:`, error);
        toast({
          title: "Authentication Error",
          description: error.message || `Failed to authenticate with ${provider}`,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error(`${provider} auth error:`, error);
      toast({
        title: "Error",
        description: error.message || `An error occurred with ${provider} authentication`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setLoading(true);
    try {
      const { error } = await signIn('admin@agentbay.com', 'admin123');
      if (!error) {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Admin Login Error",
        description: error.message || "Failed to login as admin",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-purple-900/20 to-cyber-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-effect rounded-3xl p-8">
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-cyber-gradient rounded-lg animate-glow"></div>
              <span className="text-2xl font-bold text-cyber-gradient">AgentBay</span>
            </Link>
            <h2 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-white/70">
              {isSignUp ? 'Join the AI agent marketplace' : 'Sign in to your account'}
            </p>
          </div>

          {/* Admin Login Button */}
          <div className="mb-6">
            <Button
              onClick={handleAdminLogin}
              disabled={loading}
              className="w-full bg-neon-green/20 border border-neon-green text-neon-green hover:bg-neon-green hover:text-cyber-black transition-all duration-300"
            >
              {loading ? 'Signing in...' : '🔑 Admin Access (Demo)'}
            </Button>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={() => handleSocialAuth('google')}
              disabled={loading}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              <span className="mr-2">🔍</span>
              {loading ? 'Connecting...' : 'Continue with Google'}
            </Button>
            <Button
              onClick={() => handleSocialAuth('github')}
              disabled={loading}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              <span className="mr-2">🐱</span>
              {loading ? 'Connecting...' : 'Continue with GitHub'}
            </Button>
            <Button
              onClick={() => handleSocialAuth('azure')}
              disabled={loading}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              <span className="mr-2">🏢</span>
              {loading ? 'Connecting...' : 'Continue with Microsoft'}
            </Button>
            <Button
              onClick={() => handleSocialAuth('apple')}
              disabled={loading}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              <span className="mr-2">🍎</span>
              {loading ? 'Connecting...' : 'Continue with Apple'}
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-cyber-black text-white/60">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-cyber-dark/50 border-cyber-violet/30 text-white placeholder:text-white/50"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cyber-dark/50 border-cyber-violet/30 text-white placeholder:text-white/50"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-white font-medium mb-2">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-cyber-dark/50 border-cyber-violet/30 text-white placeholder:text-white/50"
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                />
                {password !== confirmPassword && confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">Passwords don't match</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || (isSignUp && password !== confirmPassword)}
              className="w-full cyber-button"
            >
              <span className="relative z-10">
                {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </span>
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-cyber-aqua hover:underline transition-colors duration-300"
                disabled={loading}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
