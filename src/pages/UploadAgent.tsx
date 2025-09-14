
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';

const UploadAgent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    capabilities: [],
    pricing: '',
    avatar: ''
  });

  const steps = [
    { number: 1, title: "Basic Info", icon: "📝" },
    { number: 2, title: "Configuration", icon: "⚙️" },
    { number: 3, title: "Pricing", icon: "💰" },
    { number: 4, title: "Review", icon: "✅" }
  ];

  const agentTypes = [
    { id: 'research', name: 'Research Assistant', icon: '🔬' },
    { id: 'content', name: 'Content Creator', icon: '✍️' },
    { id: 'coding', name: 'Code Assistant', icon: '💻' },
    { id: 'business', name: 'Business Advisor', icon: '📊' },
    { id: 'creative', name: 'Creative Helper', icon: '🎨' },
    { id: 'analysis', name: 'Data Analyst', icon: '📈' }
  ];

  const capabilities = [
    'Text Generation', 'Data Analysis', 'Web Scraping', 'Email Management',
    'Document Processing', 'Image Analysis', 'Code Review', 'Research',
    'Translation', 'Summarization', 'Planning', 'Automation'
  ];

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-cyber-gradient">Upload Your AI Agent</span>
            </h1>
            <p className="text-xl text-white/70">
              Join the creator economy and monetize your AI agents
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${
                    currentStep >= step.number ? 'text-cyber-aqua' : 'text-white/40'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      currentStep >= step.number 
                        ? 'bg-cyber-aqua text-cyber-black' 
                        : 'border border-white/30 text-white/40'
                    }`}>
                      {currentStep > step.number ? '✓' : step.icon}
                    </div>
                    <span className="font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-cyber-aqua' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="glass-effect rounded-3xl p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
                
                <div>
                  <label className="block text-white font-medium mb-2">Agent Name</label>
                  <input
                    type="text"
                    className="w-full bg-cyber-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-cyber-aqua focus:outline-none"
                    placeholder="e.g., Research Assistant Pro"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full bg-cyber-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-cyber-aqua focus:outline-none resize-none"
                    placeholder="Describe what your agent does and its capabilities..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-4">Agent Type</label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {agentTypes.map((type) => (
                      <button
                        key={type.id}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.type === type.id
                            ? 'border-cyber-aqua bg-cyber-aqua/10'
                            : 'border-white/20 hover:border-cyber-violet'
                        }`}
                        onClick={() => setFormData({...formData, type: type.id})}
                      >
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="text-white font-medium">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Avatar Emoji</label>
                  <input
                    type="text"
                    className="w-full bg-cyber-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-cyber-aqua focus:outline-none"
                    placeholder="🤖"
                    value={formData.avatar}
                    onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Agent Configuration</h2>
                
                <div>
                  <label className="block text-white font-medium mb-4">Capabilities</label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {capabilities.map((capability) => (
                      <button
                        key={capability}
                        className={`p-3 rounded-lg border text-sm transition-all ${
                          formData.capabilities.includes(capability)
                            ? 'border-cyber-aqua bg-cyber-aqua/10 text-cyber-aqua'
                            : 'border-white/20 text-white/70 hover:border-cyber-violet'
                        }`}
                        onClick={() => {
                          const newCapabilities = formData.capabilities.includes(capability)
                            ? formData.capabilities.filter(c => c !== capability)
                            : [...formData.capabilities, capability];
                          setFormData({...formData, capabilities: newCapabilities});
                        }}
                      >
                        {capability}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Model Provider</label>
                  <select className="w-full bg-cyber-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyber-aqua focus:outline-none">
                    <option>OpenAI GPT-4</option>
                    <option>Claude 3.5</option>
                    <option>Gemini Pro</option>
                    <option>Custom Model</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Code Upload</label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                    <div className="text-4xl mb-4">📁</div>
                    <p className="text-white/70 mb-4">Upload your agent code or connect via GitHub</p>
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" className="border-cyber-violet text-cyber-violet">
                        Upload Files
                      </Button>
                      <Button variant="outline" className="border-cyber-aqua text-cyber-aqua">
                        Connect GitHub
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Pricing & Revenue</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Pricing Model</label>
                    <select className="w-full bg-cyber-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyber-aqua focus:outline-none">
                      <option>Per Hour</option>
                      <option>Per Session</option>
                      <option>Per Message</option>
                      <option>Subscription</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Price (USD per hour)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full bg-cyber-dark/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-cyber-aqua focus:outline-none"
                      placeholder="15.00"
                      value={formData.pricing}
                      onChange={(e) => setFormData({...formData, pricing: e.target.value})}
                    />
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Revenue Split</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Creator (You)</span>
                      <span className="text-cyber-aqua font-bold">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Platform Fee</span>
                      <span className="text-white/70">15%</span>
                    </div>
                    <div className="border-t border-white/20 pt-3 flex justify-between">
                      <span className="text-white font-medium">Your Earnings per Hour</span>
                      <span className="text-neon-green font-bold">
                        ${formData.pricing ? (parseFloat(formData.pricing) * 0.85).toFixed(2) : '0.00'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-cyber-dark/50 text-cyber-aqua focus:ring-cyber-aqua" />
                    <span className="text-white">Mint NFT License (Optional)</span>
                  </label>
                  <p className="text-white/60 text-sm mt-2 ml-8">
                    Create an NFT to verify ownership and authenticity of your agent
                  </p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Review & Publish</h2>
                
                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Agent Preview</h3>
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{formData.avatar || '🤖'}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">{formData.name || 'Agent Name'}</h4>
                      <p className="text-white/70 mb-4">{formData.description || 'Agent description...'}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData.capabilities.slice(0, 3).map((cap) => (
                          <span key={cap} className="px-2 py-1 bg-cyber-violet/20 text-cyber-violet text-xs rounded-lg">
                            {cap}
                          </span>
                        ))}
                        {formData.capabilities.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-lg">
                            +{formData.capabilities.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="text-cyber-aqua font-bold">${formData.pricing || '0.00'}/hour</div>
                    </div>
                  </div>
                </div>

                <div className="bg-neon-green/10 border border-neon-green/30 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-neon-green mb-2">
                    <span>✓</span>
                    <span className="font-medium">Ready to Publish</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Your agent will be reviewed and approved within 24 hours. You'll receive an email confirmation once it's live.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              <Button
                variant="outline"
                className="border-white/30 text-white/70"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              <div className="text-white/60 text-sm">
                Step {currentStep} of {steps.length}
              </div>

              {currentStep < steps.length ? (
                <Button
                  className="bg-gradient-to-r from-cyber-violet to-cyber-aqua"
                  onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                >
                  Next Step
                </Button>
              ) : (
                <Button className="cyber-button">
                  <span className="relative z-10">Publish Agent</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAgent;
