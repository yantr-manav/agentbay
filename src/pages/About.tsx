
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
  const roadmapItems = [
    {
      quarter: "Q1 2024",
      title: "Platform Launch",
      status: "completed",
      items: ["Core marketplace", "Web3 payments", "Agent SDK v1"]
    },
    {
      quarter: "Q2 2024", 
      title: "Enhanced Features",
      status: "current",
      items: ["Advanced search", "Creator tools", "Mobile app"]
    },
    {
      quarter: "Q3 2024",
      title: "AI Integration",
      status: "upcoming",
      items: ["Multi-modal agents", "Voice interfaces", "Custom training"]
    },
    {
      quarter: "Q4 2024",
      title: "Ecosystem Growth",
      status: "upcoming", 
      items: ["Enterprise features", "Global expansion", "DAO governance"]
    }
  ];

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Co-founder",
      avatar: "AC",
      bio: "Former AI researcher at DeepMind, PhD in Computer Science"
    },
    {
      name: "Sarah Kim",
      role: "CTO & Co-founder", 
      avatar: "SK",
      bio: "Ex-Google engineer, specialized in distributed systems"
    },
    {
      name: "Marcus Johnson",
      role: "Head of Product",
      avatar: "MJ",
      bio: "Product leader with 10+ years in AI and blockchain"
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Design",
      avatar: "ER",
      bio: "UX designer focused on human-AI interaction"
    }
  ];

  const investors = [
    { name: "Andreessen Horowitz", logo: "a16z" },
    { name: "Paradigm", logo: "P" },
    { name: "Coinbase Ventures", logo: "CV" },
    { name: "OpenAI Fund", logo: "OAI" }
  ];

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 particle-bg">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-slide-in-up">
            <span className="text-cyber-gradient">We believe in</span>
            <br />
            <span className="text-white">agentalizing intelligence</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.5s'}}>
            AgentBay is building the infrastructure for a future where AI agents are as accessible as apps, 
            empowering creators and users in a decentralized ecosystem.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-cyber-dark/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="text-cyber-gradient">Our Mission</span>
              </h2>
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <p>
                  We envision a world where AI agents are not controlled by a few tech giants, 
                  but are created, owned, and monetized by a global community of developers and creators.
                </p>
                <p>
                  AgentBay democratizes access to AI by creating the first truly decentralized marketplace 
                  for intelligent agents, powered by Web3 technology and community governance.
                </p>
                <p>
                  Every transaction, every interaction, and every innovation happens on-chain, 
                  ensuring transparency, ownership, and fair compensation for creators.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="glass-effect rounded-3xl p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="text-white/80">Decentralized by design</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-cyber-aqua rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <span className="text-white/80">Creator-first economy</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-cyber-violet rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <span className="text-white/80">Open-source infrastructure</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-cyber-magenta rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                  <span className="text-white/80">Community governance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-cyber-gradient">Roadmap</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Our journey to revolutionize the AI agent ecosystem
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative flex items-center mb-12">
                {/* Timeline Line */}
                {index < roadmapItems.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-24 bg-gradient-to-b from-cyber-violet to-cyber-aqua opacity-50"></div>
                )}
                
                {/* Timeline Dot */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-8 ${
                  item.status === 'completed' ? 'bg-neon-green' :
                  item.status === 'current' ? 'bg-cyber-aqua' : 'bg-white/20'
                }`}>
                  {item.status === 'completed' ? '✓' : index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 glass-effect rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <div className="text-cyber-violet font-medium">{item.quarter}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      item.status === 'completed' ? 'bg-neon-green/20 text-neon-green' :
                      item.status === 'current' ? 'bg-cyber-aqua/20 text-cyber-aqua' : 'bg-white/10 text-white/60'
                    }`}>
                      {item.status === 'completed' ? 'Completed' :
                       item.status === 'current' ? 'In Progress' : 'Upcoming'}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {item.items.map((feature, i) => (
                      <li key={i} className="text-white/70 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-cyber-violet rounded-full"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-cyber-dark/20 to-transparent">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-cyber-gradient">Meet the Team</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Passionate builders creating the future of decentralized AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-transform">
                <div className="w-20 h-20 bg-cyber-gradient rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 group-hover:animate-glow">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <div className="text-cyber-aqua font-medium mb-3">{member.role}</div>
                <p className="text-white/60 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-cyber-gradient">Backed by the Best</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Supported by leading investors in AI and Web3
            </p>
          </div>

          <div className="flex justify-center items-center space-x-12 opacity-60">
            {investors.map((investor, index) => (
              <div key={index} className="glass-effect rounded-xl p-6 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold mb-3">
                  {investor.logo}
                </div>
                <div className="text-white/80 text-sm font-medium">{investor.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
