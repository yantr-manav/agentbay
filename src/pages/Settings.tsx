
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
    earningsVisible: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'privacy', name: 'Privacy', icon: '🛡️' },
    { id: 'billing', name: 'Billing', icon: '💳' },
    { id: 'api', name: 'API Keys', icon: '🔑' }
  ];

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-cyber-gradient">Settings</span>
            </h1>
            <p className="text-xl text-white/70">
              Manage your account preferences and security settings
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-2xl p-6 sticky top-32">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center space-x-3 ${
                        activeTab === tab.id
                          ? 'bg-cyber-violet/20 text-cyber-violet border border-cyber-violet/30'
                          : 'bg-transparent text-white/70 hover:bg-cyber-dark/30 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">{tab.icon}</span>
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white/70 mb-2">Full Name</label>
                        <Input 
                          placeholder="Enter your full name"
                          className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2">Email</label>
                        <Input 
                          placeholder="your@email.com"
                          type="email"
                          className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2">Username</label>
                        <Input 
                          placeholder="@username"
                          className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2">Location</label>
                        <Input 
                          placeholder="City, Country"
                          className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-white/70 mb-2">Bio</label>
                      <textarea 
                        className="w-full p-3 bg-cyber-dark/50 border border-cyber-violet/30 rounded-xl text-white placeholder:text-white/50 resize-none"
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    
                    <Button className="mt-6 bg-gradient-to-r from-cyber-violet to-cyber-aqua">
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Email Notifications</h3>
                          <p className="text-white/60 text-sm">Receive notifications via email</p>
                        </div>
                        <Switch 
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Push Notifications</h3>
                          <p className="text-white/60 text-sm">Browser push notifications</p>
                        </div>
                        <Switch 
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">SMS Notifications</h3>
                          <p className="text-white/60 text-sm">Text message alerts</p>
                        </div>
                        <Switch 
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Marketing Communications</h3>
                          <p className="text-white/60 text-sm">Updates about new features and offers</p>
                        </div>
                        <Switch 
                          checked={notifications.marketing}
                          onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Privacy Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Public Profile</h3>
                          <p className="text-white/60 text-sm">Make your profile visible to other users</p>
                        </div>
                        <Switch 
                          checked={privacy.profileVisible}
                          onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Activity Status</h3>
                          <p className="text-white/60 text-sm">Show when you're active on the platform</p>
                        </div>
                        <Switch 
                          checked={privacy.activityVisible}
                          onCheckedChange={(checked) => setPrivacy({...privacy, activityVisible: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Earnings Visibility</h3>
                          <p className="text-white/60 text-sm">Display earnings on your public profile</p>
                        </div>
                        <Switch 
                          checked={privacy.earningsVisible}
                          onCheckedChange={(checked) => setPrivacy({...privacy, earningsVisible: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-white font-medium mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <Input 
                            type="password"
                            placeholder="Current password"
                            className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                          />
                          <Input 
                            type="password"
                            placeholder="New password"
                            className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                          />
                          <Input 
                            type="password"
                            placeholder="Confirm new password"
                            className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                          />
                          <Button className="bg-cyber-violet hover:bg-cyber-violet/80">
                            Update Password
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border-t border-white/10 pt-6">
                        <h3 className="text-white font-medium mb-4">Two-Factor Authentication</h3>
                        <p className="text-white/60 text-sm mb-4">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline" className="border-cyber-aqua text-cyber-aqua hover:bg-cyber-aqua/10">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-6">
                  <div className="glass-effect rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">API Keys</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-white font-medium">Personal Access Token</h3>
                          <Button className="bg-gradient-to-r from-cyber-violet to-cyber-aqua">
                            Generate New Token
                          </Button>
                        </div>
                        <div className="bg-cyber-dark/30 p-4 rounded-xl border border-cyber-violet/20">
                          <code className="text-cyber-aqua font-mono text-sm">
                            agb_1234567890abcdef...
                          </code>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-white font-medium mb-4">Webhook Endpoints</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-cyber-dark/30 p-3 rounded-xl">
                            <span className="text-white/70 font-mono text-sm">https://api.yourapp.com/webhook</span>
                            <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500/10">
                              Delete
                            </Button>
                          </div>
                        </div>
                        <Button variant="outline" className="mt-3 border-cyber-violet text-cyber-violet hover:bg-cyber-violet/10">
                          Add Webhook
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
