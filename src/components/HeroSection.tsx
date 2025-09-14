
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Galaxy Background using CSS */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-purple-900/20 to-cyber-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent"></div>
        {/* Animated stars */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top: '20%', left: '10%'}}></div>
          <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top: '40%', left: '80%', animationDelay: '1s'}}></div>
          <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top: '60%', left: '30%', animationDelay: '2s'}}></div>
          <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top: '80%', left: '70%', animationDelay: '0.5s'}}></div>
          <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top: '15%', left: '60%', animationDelay: '1.5s'}}></div>
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10 pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-slide-in-up">
            <span className="text-cyber-gradient">Rent the Smartest</span>
            <br />
            <span className="text-white animate-neon-flicker">AI Agents.</span>
            <br />
            <span className="text-cyber-gradient">Instantly.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.5s'}}>
            Browse, Rent, and Deploy AI Agents for any task — powered by Web3 and GenAI.
            <br />
            <span className="text-cyber-aqua">The future of intelligent automation is here.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{animationDelay: '1s'}}>
            <Link to="/explore">
              <Button className="cyber-button text-lg px-12 py-6">
                <span className="relative z-10">Explore Agents</span>
              </Button>
            </Link>
            <Link to="/upload">
              <Button 
                variant="outline" 
                className="border-2 border-cyber-aqua text-cyber-aqua hover:bg-cyber-aqua hover:text-cyber-black text-lg px-12 py-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyber-aqua/25"
              >
                Become a Creator
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in" style={{animationDelay: '1.5s'}}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyber-violet mb-2">10K+</div>
              <div className="text-white/60">Active Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyber-aqua mb-2">500+</div>
              <div className="text-white/60">AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyber-magenta mb-2">50+</div>
              <div className="text-white/60">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">24/7</div>
              <div className="text-white/60">Availability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyber-aqua rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyber-aqua rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
