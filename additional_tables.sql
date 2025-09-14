-- Additional tables to make the project complete
-- Run this after the main migration

-- Agent reviews and ratings
CREATE TABLE IF NOT EXISTS public.agent_reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
    reviewer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    session_id UUID REFERENCES public.agent_sessions(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    review_text TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(agent_id, reviewer_id, session_id)
);

-- User notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent categories
CREATE TABLE IF NOT EXISTS public.agent_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent category relationships
CREATE TABLE IF NOT EXISTS public.agent_category_relations (
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.agent_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (agent_id, category_id)
);

-- User favorites
CREATE TABLE IF NOT EXISTS public.user_favorites (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, agent_id)
);

-- Agent usage analytics
CREATE TABLE IF NOT EXISTS public.agent_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    sessions INTEGER DEFAULT 0,
    total_revenue DECIMAL(10,2) DEFAULT 0,
    avg_session_duration DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(agent_id, date)
);

-- User activity logs
CREATE TABLE IF NOT EXISTS public.user_activity_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    action TEXT NOT NULL, -- 'login', 'logout', 'upload_agent', 'rent_agent', 'payment', etc.
    resource_type TEXT, -- 'agent', 'payment', 'subscription', etc.
    resource_id UUID,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support tickets
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
    priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    category TEXT DEFAULT 'general', -- 'general', 'technical', 'billing', 'agent'
    assigned_to UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support ticket messages
CREATE TABLE IF NOT EXISTS public.support_ticket_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ticket_id UUID REFERENCES public.support_tickets(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false,
    attachments JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referral system
CREATE TABLE IF NOT EXISTS public.user_referrals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    referrer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    referred_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    referral_code TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'expired'
    reward_amount DECIMAL(10,2) DEFAULT 0,
    reward_currency currency_type DEFAULT 'usd',
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(referrer_id, referred_id)
);

-- Coupons and discounts
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    discount_type TEXT NOT NULL, -- 'percentage', 'fixed_amount'
    discount_value DECIMAL(10,2) NOT NULL,
    currency currency_type DEFAULT 'usd',
    min_amount DECIMAL(10,2) DEFAULT 0,
    max_uses INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    applicable_plans TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon usage tracking
CREATE TABLE IF NOT EXISTS public.coupon_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    coupon_id UUID REFERENCES public.coupons(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    subscription_id UUID REFERENCES public.user_subscriptions(id) ON DELETE SET NULL,
    discount_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(coupon_id, user_id)
);

-- Insert default categories
INSERT INTO public.agent_categories (name, description, icon, color) VALUES
('AI Assistant', 'General purpose AI assistants for various tasks', '🤖', '#00d4ff'),
('Data Analysis', 'Agents specialized in data processing and analytics', '📊', '#ff6b6b'),
('Content Creation', 'AI agents for writing, design, and creative tasks', '✍️', '#4ecdc4'),
('Code Review', 'Programming and code analysis specialists', '💻', '#45b7d1'),
('Research', 'Research and information gathering agents', '🔍', '#96ceb4'),
('Customer Support', 'Customer service and support automation', '💬', '#feca57'),
('Marketing', 'Marketing automation and strategy agents', '📈', '#ff9ff3'),
('Finance', 'Financial analysis and accounting assistants', '💰', '#54a0ff')
ON CONFLICT (name) DO NOTHING;

-- Enable RLS for new tables
ALTER TABLE public.agent_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_category_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for new tables

-- Agent reviews
CREATE POLICY "Users can view all reviews" ON public.agent_reviews FOR SELECT USING (true);
CREATE POLICY "Users can create own reviews" ON public.agent_reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update own reviews" ON public.agent_reviews FOR UPDATE USING (auth.uid() = reviewer_id);

-- Notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Categories are public
CREATE POLICY "Anyone can view categories" ON public.agent_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view category relations" ON public.agent_category_relations FOR SELECT USING (true);

-- User favorites
CREATE POLICY "Users can manage own favorites" ON public.user_favorites FOR ALL USING (auth.uid() = user_id);

-- Agent analytics (only agent owners can see their analytics)
CREATE POLICY "Agent owners can view analytics" ON public.agent_analytics FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM public.agents WHERE id = agent_id)
);

-- Activity logs
CREATE POLICY "Users can view own activity" ON public.user_activity_logs FOR SELECT USING (auth.uid() = user_id);

-- Support tickets
CREATE POLICY "Users can manage own tickets" ON public.support_tickets FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own ticket messages" ON public.support_ticket_messages FOR SELECT USING (
    auth.uid() = sender_id OR 
    auth.uid() IN (SELECT user_id FROM public.support_tickets WHERE id = ticket_id)
);
CREATE POLICY "Users can create ticket messages" ON public.support_ticket_messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id OR 
    auth.uid() IN (SELECT user_id FROM public.support_tickets WHERE id = ticket_id)
);

-- Referrals
CREATE POLICY "Users can view own referrals" ON public.user_referrals FOR SELECT USING (
    auth.uid() = referrer_id OR auth.uid() = referred_id
);
CREATE POLICY "Users can create referrals" ON public.user_referrals FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- Coupons are public for viewing
CREATE POLICY "Anyone can view active coupons" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Users can view own coupon usage" ON public.coupon_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create coupon usage" ON public.coupon_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_agent_reviews_updated_at BEFORE UPDATE ON public.agent_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON public.coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
    p_user_id UUID,
    p_title TEXT,
    p_message TEXT,
    p_type TEXT DEFAULT 'info',
    p_action_url TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO public.notifications (user_id, title, message, type, action_url, metadata)
    VALUES (p_user_id, p_title, p_message, p_type, p_action_url, p_metadata)
    RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity(
    p_user_id UUID,
    p_action TEXT,
    p_resource_type TEXT DEFAULT NULL,
    p_resource_id UUID DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO public.user_activity_logs (user_id, action, resource_type, resource_id, metadata)
    VALUES (p_user_id, p_action, p_resource_type, p_resource_id, p_metadata)
    RETURNING id INTO log_id;
    
    RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

SELECT 'Additional tables created successfully! Reviews, notifications, analytics, and more features are now available.' as result;