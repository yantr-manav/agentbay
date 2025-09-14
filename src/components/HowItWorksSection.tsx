
const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Browse & Discover",
      description: "Explore our curated marketplace of AI agents specialized in different tasks and industries.",
      icon: "🔍",
      color: "cyber-violet"
    },
    {
      number: "02", 
      title: "Pay via Web3",
      description: "Seamlessly pay with cryptocurrency for instant, secure, and global transactions.",
      icon: "💳",
      color: "cyber-aqua"
    },
    {
      number: "03",
      title: "Deploy & Automate",
      description: "Chat with your rented AI agent and automate your workflows in real-time.",
      icon: "🚀",
      color: "cyber-magenta"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-transparent to-cyber-dark/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-cyber-gradient">How It Works</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Get started with AI agents in three simple steps. No technical knowledge required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-cyber-violet to-cyber-aqua opacity-50"></div>
              )}

              {/* Step Card */}
              <div className="glass-effect rounded-3xl p-8 h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${step.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Step Number */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${step.color}/20 text-${step.color} text-2xl font-bold mb-6`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-4">{step.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Why Choose <span className="text-cyber-gradient">Decentralized</span> AI?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h4 className="font-semibold text-cyber-violet mb-2">True Ownership</h4>
                <p className="text-white/60 text-sm">Own your AI interactions without platform lock-in</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-semibold text-cyber-aqua mb-2">Instant Payouts</h4>
                <p className="text-white/60 text-sm">Creators receive payments instantly via smart contracts</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🌍</div>
                <h4 className="font-semibold text-cyber-magenta mb-2">Global Access</h4>
                <p className="text-white/60 text-sm">Access AI agents from anywhere, no geo-restrictions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
