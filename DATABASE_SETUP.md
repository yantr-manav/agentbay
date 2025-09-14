# Database Setup Instructions

## Overview
This guide will help you set up the Supabase database with authentication and payment tables.

## Prerequisites
1. Supabase account and project
2. Supabase CLI installed (optional but recommended)

## Setup Steps

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Create a new project
3. Note your project URL and anon key

### 2. Run Database Migration
You can run the migration in two ways:

#### Option A: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase/migrations/20250914000001_auth_and_payments_setup.sql`
4. Paste and run the SQL script

#### Option B: Using Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase in your project
supabase init

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

### 3. Verify Setup
After running the migration, you should see these tables in your database:
- `users` - User profiles
- `subscription_plans` - Available subscription plans
- `user_subscriptions` - User subscription records
- `payment_transactions` - Payment history
- `agents` - AI agent listings
- `agent_sessions` - Agent rental sessions
- `wallet_transactions` - Wallet transaction history

### 4. Configure Environment Variables
Update your `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Database Schema

### Core Tables

#### users
- Extends Supabase auth.users
- Stores user profiles and preferences
- Links to Stripe customer ID

#### subscription_plans
- Pre-populated with Basic, Premium, Enterprise plans
- Multi-currency pricing (USD/INR)
- Feature lists and limits

#### user_subscriptions
- Active user subscriptions
- Links to Stripe subscription ID
- Billing cycle and period tracking

#### payment_transactions
- All payment records
- Links to Stripe payment intents
- Status tracking and metadata

### Security Features
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Automatic user profile creation on signup
- Secure payment processing integration

## Testing the Setup

### 1. Test Authentication
1. Start your development server: `npm run dev`
2. Navigate to `/signup` and create a test account
3. Check that a user record is created in the `users` table

### 2. Test Payments
1. Navigate to `/payment` while logged in
2. Select a plan and payment method
3. Use Stripe test cards for testing
4. Verify subscription and payment records are created

### 3. Test Dashboard
1. Navigate to `/dashboard` after signup
2. Verify user profile and subscription data display correctly

## Troubleshooting

### Common Issues

1. **Migration fails**: Check that you have the correct permissions and the database is accessible

2. **RLS policies blocking access**: Ensure you're authenticated and the policies are correctly set up

3. **Environment variables not loading**: Make sure your `.env` file is in the project root and variables start with `VITE_`

4. **Stripe integration issues**: Verify your Stripe publishable key is correct and test mode is enabled

### Support
- Supabase Documentation: https://supabase.com/docs
- Stripe Documentation: https://stripe.com/docs
- Project Issues: Create an issue in the repository