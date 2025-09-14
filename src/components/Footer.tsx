
const Footer = () => {
  return (
    <footer className="bg-cyber-dark/50 border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-cyber-gradient rounded-lg animate-glow"></div>
              <span className="text-2xl font-bold text-cyber-gradient">AgentBay</span>
            </div>
            <p className="text-white/60 max-w-md">
              The decentralized marketplace for AI agents. Rent, deploy, and monetize artificial intelligence on Web3.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">Twitter</a>
              <a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">Discord</a>
              <a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">GitHub</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">Explore Agents</a></li>
              <li><a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">Become Creator</a></li>
              <li><a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">How It Works</a></li>
              <li><a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">Documentation</a></li>
              <li><a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/60 hover:text-cyber-aqua transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            © 2024 AgentBay. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/40 hover:text-cyber-aqua text-sm transition-colors">Privacy</a>
            <a href="#" className="text-white/40 hover:text-cyber-aqua text-sm transition-colors">Terms</a>
            <a href="#" className="text-white/40 hover:text-cyber-aqua text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
