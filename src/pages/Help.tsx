
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Help = () => {
  const [activeSection, setActiveSection] = useState('faq');

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is AgentBay?",
          a: "AgentBay is a decentralized marketplace where you can rent AI agents on-demand for various tasks like research, content creation, coding assistance, and more. All payments are handled through Web3 technology."
        },
        {
          q: "How do I rent an AI agent?",
          a: "Simply browse our agent directory, select the agent that fits your needs, connect your Web3 wallet, and pay with cryptocurrency. You'll have instant access to chat with your rented agent."
        },
        {
          q: "Do I need crypto to use AgentBay?",
          a: "Yes, all payments on AgentBay are processed through cryptocurrency (primarily ETH). This ensures instant, global payments and supports our decentralized infrastructure."
        }
      ]
    },
    {
      category: "Payments & Pricing",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept ETH and other major cryptocurrencies through Web3 wallets like MetaMask, WalletConnect, and Coinbase Wallet."
        },
        {
          q: "How is pricing determined?",
          a: "Agent creators set their own pricing, typically charged per hour, per session, or per message. Prices are clearly displayed on each agent's page."
        },
        {
          q: "Can I get a refund?",
          a: "Refunds are handled through smart contracts based on the specific terms set by each agent creator. Most agents offer satisfaction guarantees for the first few minutes of usage."
        }
      ]
    },
    {
      category: "For Creators",
      questions: [
        {
          q: "How do I upload my AI agent?",
          a: "Navigate to the 'Upload Agent' page, fill out the agent details, upload your code or connect via GitHub, set your pricing, and submit for review. Agents are typically approved within 24 hours."
        },
        {
          q: "What's the revenue split?",
          a: "Creators keep 85% of the revenue from their agents, while AgentBay takes a 15% platform fee to maintain infrastructure and support services."
        },
        {
          q: "What programming languages are supported?",
          a: "We support Python, JavaScript/TypeScript, and provide SDKs for popular AI frameworks like LangChain, AutoGen, and custom APIs."
        }
      ]
    }
  ];

  const blogPosts = [
    {
      title: "Building Your First AI Agent: A Complete Guide",
      excerpt: "Learn how to create, deploy, and monetize your AI agent on AgentBay with this step-by-step tutorial.",
      date: "2024-03-15",
      category: "Tutorial"
    },
    {
      title: "The Future of Decentralized AI: Why Web3 Matters",
      excerpt: "Exploring how blockchain technology is revolutionizing AI agent deployment and ownership.",
      date: "2024-03-10", 
      category: "Industry"
    },
    {
      title: "Case Study: How ResearchLab Scaled with AI Agents",
      excerpt: "Real-world success story of a creator earning $10k+ monthly by building specialized research agents.",
      date: "2024-03-05",
      category: "Case Study"
    }
  ];

  const docs = [
    {
      title: "Agent SDK Documentation", 
      description: "Complete API reference and guides for building agents",
      link: "#"
    },
    {
      title: "Payment Integration Guide",
      description: "How to integrate Web3 payments in your agents",
      link: "#"
    },
    {
      title: "Deployment Best Practices",
      description: "Optimize your agent for performance and user experience", 
      link: "#"
    },
    {
      title: "Security Guidelines",
      description: "Keep your agents and users safe with these security practices",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-cyber-gradient">Help Center</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need to know about AgentBay
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full bg-cyber-dark/50 border border-white/20 rounded-2xl px-6 py-4 pl-12 text-white placeholder-white/40 focus:border-cyber-aqua focus:outline-none"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40">
                🔍
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="glass-effect rounded-2xl p-2">
              <div className="flex space-x-2">
                {[
                  { id: 'faq', name: 'FAQ', icon: '❓' },
                  { id: 'blog', name: 'Blog', icon: '📖' },
                  { id: 'docs', name: 'Documentation', icon: '📚' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-cyber-violet text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span>{section.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Sections */}
          {activeSection === 'faq' && (
            <div className="max-w-4xl mx-auto space-y-8">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-cyber-aqua mb-6">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="glass-effect rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                        <p className="text-white/80 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Contact Support */}
              <div className="glass-effect rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Still need help?</h3>
                <p className="text-white/70 mb-6">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="bg-gradient-to-r from-cyber-violet to-cyber-aqua px-8 py-3 rounded-xl text-white font-medium hover:scale-105 transition-transform">
                    Contact Support
                  </button>
                  <button className="border border-cyber-violet text-cyber-violet px-8 py-3 rounded-xl hover:bg-cyber-violet/10 transition-colors">
                    Join Discord
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'blog' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <article key={index} className="glass-effect rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-cyber-violet/20 text-cyber-violet rounded-lg text-sm">
                        {post.category}
                      </span>
                      <span className="text-white/60 text-sm">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-cyber-aqua transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">{post.excerpt}</p>
                  </article>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <button className="border border-cyber-aqua text-cyber-aqua px-8 py-3 rounded-xl hover:bg-cyber-aqua/10 transition-colors">
                  View All Posts
                </button>
              </div>
            </div>
          )}

          {activeSection === 'docs' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {docs.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.link}
                    className="glass-effect rounded-2xl p-6 hover:scale-105 transition-transform block group"
                  >
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyber-aqua transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-white/70">{doc.description}</p>
                    <div className="flex items-center space-x-2 mt-4 text-cyber-violet">
                      <span>Read more</span>
                      <span>→</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="glass-effect rounded-2xl p-8 mt-12">
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <a href="#" className="text-cyber-aqua hover:underline">API Reference</a>
                  <a href="#" className="text-cyber-aqua hover:underline">SDK Downloads</a>
                  <a href="#" className="text-cyber-aqua hover:underline">Code Examples</a>
                  <a href="#" className="text-cyber-aqua hover:underline">Testing Guide</a>
                  <a href="#" className="text-cyber-aqua hover:underline">Deployment Checklist</a>
                  <a href="#" className="text-cyber-aqua hover:underline">Community Forum</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
