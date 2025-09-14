-- Copy and paste this entire script into your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/fjoogathnnpzljisdcrf/sql

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
DO $$ BEGIN
    CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'unpaid', 'trialing');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed', 'canceled', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE currency_type AS ENUM ('usd', 'inr');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    stripe_customer_id TEXT UNIQUE,
    preferred_currency currency_type DEFAULT 'usd'
);

-- Subscription plans table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price_usd_monthly DECIMAL(10,2) NOT NULL,
    price_usd_yearly DECIMAL(10,2) NOT NULL,
    price_inr_monthly DECIMAL(10,2) NOT NULL,
    price_inr_yearly DECIMAL(10,2) NOT NULL,
    features JSONB DEFAULT '[]',
    max_hours_monthly INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User subscriptions table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    plan_id TEXT REFERENCES public.subscription_plans(id) NOT NULL,
    stripe_subscription_id TEXT UNIQUE,
    status subscription_status NOT NULL DEFAULT 'trialing',
    currency currency_type NOT NULL DEFAULT 'usd',
    billing_cycle billing_cycle NOT NULL DEFAULT 'monthly',
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    canceled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment transactions table
CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    subscription_id UUID REFERENCES public.user_subscriptions(id) ON DELETE SET NULL,
    stripe_payment_intent_id TEXT UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    currency currency_type NOT NULL,
    status payment_status NOT NULL DEFAULT 'pending',
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agents table (for uploaded AI agents)
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    avatar TEXT,
    capabilities TEXT[] DEFAULT '{}',
    pricing_model TEXT DEFAULT 'hourly',
    price_per_hour DECIMAL(10,2) DEFAULT 0,
    currency currency_type DEFAULT 'usd',
    rating DECIMAL(3,2) DEFAULT 0,
    total_sessions INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent sessions/rentals table
CREATE TABLE IF NOT EXISTS public.agent_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
    renter_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    duration_hours DECIMAL(5,2) NOT NULL,
    total_cost DECIMAL(10,2) NOT NULL,
    currency currency_type NOT NULL,
    status TEXT DEFAULT 'active',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallet transactions table
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL, -- 'deposit', 'withdrawal', 'payment', 'earning'
    amount DECIMAL(10,2) NOT NULL,
    currency currency_type NOT NULL,
    description TEXT,
    reference_id UUID, -- Can reference payment_transactions, agent_sessions, etc.
    reference_type TEXT, -- 'payment', 'session', 'subscription', etc.
    balance_after DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default subscription plans (only if they don't exist)
INSERT INTO public.subscription_plans (id, name, description, price_usd_monthly, price_usd_yearly, price_inr_monthly, price_inr_yearly, features, max_hours_monthly) 
SELECT * FROM (VALUES
    ('basic', 'Basic', 'Perfect for getting started with AI agents', 9.99, 99.99, 799.00, 7999.00, '["Up to 10 hours per month", "Basic AI agents", "Standard support", "Basic analytics"]'::jsonb, 10),
    ('premium', 'Premium', 'Best for regular users and small teams', 29.99, 299.99, 2499.00, 24999.00, '["Up to 50 hours per month", "Premium AI agents", "Priority support", "Advanced analytics", "Custom integrations"]'::jsonb, 50),
    ('enterprise', 'Enterprise', 'For large teams and organizations', 99.99, 999.99, 8499.00, 84999.00, '["Unlimited hours", "All AI agents", "Dedicated support", "Advanced analytics", "Custom agents", "API access"]'::jsonb, NULL)
) AS v(id, name, description, price_usd_monthly, price_usd_yearly, price_inr_monthly, price_inr_yearly, features, max_hours_monthly)
WHERE NOT EXISTS (SELECT 1 FROM public.subscription_plans WHERE subscription_plans.id = v.id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can view own payments" ON public.payment_transactions;
DROP POLICY IF EXISTS "Users can insert own payments" ON public.payment_transactions;
DROP POLICY IF EXISTS "Users can view all agents" ON public.agents;
DROP POLICY IF EXISTS "Users can manage own agents" ON public.agents;
DROP POLICY IF EXISTS "Users can view own sessions" ON public.agent_sessions;
DROP POLICY IF EXISTS "Users can create sessions" ON public.agent_sessions;
DROP POLICY IF EXISTS "Users can view own wallet transactions" ON public.wallet_transactions;
DROP POLICY IF EXISTS "Users can insert own wallet transactions" ON public.wallet_transactions;

-- Create RLS policies
-- Users can only see and update their own data
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Subscription policies
CREATE POLICY "Users can view own subscriptions" ON public.user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON public.user_subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own subscriptions" ON public.user_subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- Payment transaction policies
CREATE POLICY "Users can view own payments" ON public.payment_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own payments" ON public.payment_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Agent policies
CREATE POLICY "Users can view all agents" ON public.agents FOR SELECT USING (true);
CREATE POLICY "Users can manage own agents" ON public.agents FOR ALL USING (auth.uid() = user_id);

-- Agent session policies
CREATE POLICY "Users can view own sessions" ON public.agent_sessions FOR SELECT USING (auth.uid() = renter_id OR auth.uid() = (SELECT user_id FROM public.agents WHERE id = agent_id));
CREATE POLICY "Users can create sessions" ON public.agent_sessions FOR INSERT WITH CHECK (auth.uid() = renter_id);

-- Wallet transaction policies
CREATE POLICY "Users can view own wallet transactions" ON public.wallet_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wallet transactions" ON public.wallet_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Subscription plans are public (read-only)
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view subscription plans" ON public.subscription_plans;
CREATE POLICY "Anyone can view subscription plans" ON public.subscription_plans FOR SELECT USING (true);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_subscription_plans_updated_at ON public.subscription_plans;
DROP TRIGGER IF EXISTS update_user_subscriptions_updated_at ON public.user_subscriptions;
DROP TRIGGER IF EXISTS update_payment_transactions_updated_at ON public.payment_transactions;
DROP TRIGGER IF EXISTS update_agents_updated_at ON public.agents;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON public.subscription_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON public.user_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON public.payment_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON public.agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Success message
SELECT 'Database migration completed successfully! All tables, policies, and triggers have been created.' as result;