
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeaturedAgentsSection from '../components/FeaturedAgentsSection';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      <HeroSection />
      
      {/* Quick Actions Section */}
      <section className="py-16 bg-cyber-dark/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <>
                <Link to="/explore">
                  <Button className="cyber-button text-lg px-8 py-4">
                    <span className="relative z-10">Browse Agents</span>
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button 
                    variant="outline" 
                    className="border-cyber-aqua text-cyber-aqua hover:bg-cyber-aqua hover:text-cyber-black text-lg px-8 py-4"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button className="cyber-button text-lg px-8 py-4">
                    <span className="relative z-10">Sign Up Free</span>
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button 
                    variant="outline" 
                    className="border-cyber-aqua text-cyber-aqua hover:bg-cyber-aqua hover:text-cyber-black text-lg px-8 py-4"
                  >
                    Browse Agents
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      <HowItWorksSection />
      <FeaturedAgentsSection />
      <Footer />
    </div>
  );
};

export default Index;
