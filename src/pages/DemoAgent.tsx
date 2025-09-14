
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const DemoAgent = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m the Demo Research Assistant. I can help you with research, data analysis, and report generation. Try asking me about any topic!'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionTime, setSessionTime] = useState(300); // 5 minutes in seconds
  const { toast } = useToast();

  const demoQuestions = [
    "Analyze the latest trends in AI research",
    "Summarize the key findings about renewable energy",
    "What are the benefits of blockchain technology?",
    "Explain quantum computing in simple terms"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on recent research, here are the key findings: AI development has accelerated significantly in 2024, with major breakthroughs in multimodal AI systems...",
        "Here's a comprehensive analysis of your query: The data suggests several important trends that warrant closer examination...",
        "I've analyzed this topic and found several interesting insights: The research indicates a growing consensus among experts...",
        "Let me break this down for you: Recent studies have shown remarkable progress in this field, particularly in..."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleDemoQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-cyber-gradient mb-4">Try Demo Agent</h1>
              <p className="text-white/70 mb-4">
                Experience the power of AI agents with our free demo. No wallet connection required.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="bg-cyber-violet/20 px-4 py-2 rounded-lg">
                  <span className="text-cyber-violet">⏱️ Demo Time: {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="bg-neon-green/20 px-4 py-2 rounded-lg">
                  <span className="text-neon-green">🆓 Free Trial</span>
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="glass-effect rounded-3xl p-6 mb-6">
              <div className="h-96 overflow-y-auto space-y-4 mb-6 p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-cyber-violet text-white'
                          : 'bg-cyber-dark/50 text-white/90 border border-cyber-aqua/20'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-cyber-dark/50 text-white/90 border border-cyber-aqua/20 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyber-aqua rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyber-aqua rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-cyber-aqua rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-cyber-dark/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyber-aqua/50"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="cyber-button px-6"
                  disabled={isTyping || !inputMessage.trim()}
                >
                  <span className="relative z-10">Send</span>
                </Button>
              </div>
            </div>

            {/* Demo Questions */}
            <div className="glass-effect rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Try these sample questions:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {demoQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-left justify-start border-cyber-violet/20 text-white/80 hover:bg-cyber-violet/10 h-auto py-3"
                    onClick={() => handleDemoQuestion(question)}
                  >
                    "{question}"
                  </Button>
                ))}
              </div>
            </div>

            {/* Upgrade CTA */}
            <div className="glass-effect rounded-2xl p-6 text-center bg-gradient-to-r from-cyber-violet/10 to-cyber-aqua/10">
              <h3 className="text-xl font-bold text-white mb-2">Ready for the Full Experience?</h3>
              <p className="text-white/70 mb-4">
                Connect your wallet to access premium agents, unlimited sessions, and advanced features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button">
                  <span className="relative z-10">Connect Wallet</span>
                </Button>
                <Button variant="outline" className="border-cyber-aqua text-cyber-aqua">
                  Explore All Agents
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoAgent;
