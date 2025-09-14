# 🔐 OAuth Setup Guide - Google & GitHub

## 📋 **Quick Setup Checklist**

### ✅ **Step 1: Google OAuth Setup**

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Create new project or select existing one

2. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "AgentBay"
   - Authorized redirect URIs: `https://fjoogathnnpzljisdcrf.supabase.co/auth/v1/callback`

4. **Configure in Supabase**
   - Go to: https://supabase.com/dashboard/project/fjoogathnnpzljisdcrf/auth/providers
   - Find "Google" provider
   - Toggle "Enable sign in with Google"
   - Enter your Client ID and Client Secret
   - Save configuration

### ✅ **Step 2: GitHub OAuth Setup**

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/developers
   - Click "OAuth Apps" → "New OAuth App"

2. **Create OAuth App**
   - Application name: "AgentBay"
   - Homepage URL: `http://localhost:8080` (for development)
   - Authorization callback URL: `https://fjoogathnnpzljisdcrf.supabase.co/auth/v1/callback`

3. **Configure in Supabase**
   - Go to: https://supabase.com/dashboard/project/fjoogathnnpzljisdcrf/auth/providers
   - Find "GitHub" provider
   - Toggle "Enable sign in with GitHub"
   - Enter your Client ID and Client Secret
   - Save configuration

## 🧪 **Testing OAuth**

After setup, test the OAuth flow:

1. **Visit your app**: http://localhost:8080/login
2. **Click "Google" or "GitHub" button**
3. **Complete OAuth flow**
4. **Should redirect to dashboard**

## 🔧 **Troubleshooting**

### Common Issues:

1. **"Redirect URI mismatch"**
   - Ensure callback URL is exactly: `https://fjoogathnnpzljisdcrf.supabase.co/auth/v1/callback`

2. **"OAuth app not found"**
   - Double-check Client ID and Secret in Supabase

3. **"Access denied"**
   - Verify OAuth app is not restricted to organization members

## 📝 **Production Setup**

For production deployment:

1. **Update redirect URIs** to include your production domain
2. **Use production OAuth apps** (separate from development)
3. **Enable additional scopes** if needed for user data

## ✅ **Verification**

OAuth is working correctly when:
- [ ] Google login button appears on login page
- [ ] GitHub login button appears on login page  
- [ ] Clicking buttons redirects to provider
- [ ] After authorization, user is logged into AgentBay
- [ ] User profile shows provider information

**Your OAuth integration is now complete! 🎉**