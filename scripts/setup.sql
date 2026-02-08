-- Life-OS Database Setup Script
-- Run this in your Supabase SQL Editor to fix "Failed to add transaction" error

-- ============================================
-- STEP 1: Create the schema (run once)
-- ============================================

-- Drop existing tables if you want to start fresh
-- DROP TABLE IF EXISTS public.users CASCADE;
-- DROP TABLE IF EXISTS public.transactions CASCADE;
-- DROP TABLE IF EXISTS public.categories CASCADE;

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  phone TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  category TEXT NOT NULL,
  source TEXT CHECK (source IN ('web', 'whatsapp')) DEFAULT 'web',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '💰',
  color TEXT DEFAULT '#6366F1',
  type TEXT CHECK (type IN ('income', 'expense', 'both')) DEFAULT 'both',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 2: Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 3: Create RLS Policies
-- Important: These must check for auth.uid() to work with Supabase client
-- ============================================

-- Users table policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Transactions table policies
DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can delete own transactions" ON public.transactions;

CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON public.transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON public.transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON public.transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Categories table policies
DROP POLICY IF EXISTS "Users can view own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can manage own categories" ON public.categories;

-- View all categories (default + own)
CREATE POLICY "Users can view own categories" ON public.categories
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Manage own categories only
CREATE POLICY "Users can manage own categories" ON public.categories
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- STEP 4: Insert default categories
-- ============================================

-- Clear existing default categories
DELETE FROM public.categories WHERE is_default = true;

-- Insert income categories
INSERT INTO public.categories (name, icon, color, type, is_default) VALUES
('Salary', '💰', '#22C55E', 'income', true),
('Freelance', '💼', '#22C55E', 'income', true),
('Investment', '📈', '#22C55E', 'income', true),
('Gift', '🎁', '#22C55E', 'income', true);

-- Insert expense categories
INSERT INTO public.categories (name, icon, color, type, is_default) VALUES
('Groceries', '🛒', '#EF4444', 'expense', true),
('Food & Dining', '🍽️', '#EF4444', 'expense', true),
('Transport', '🚗', '#EF4444', 'expense', true),
('Utilities', '💡', '#EF4444', 'expense', true),
('Shopping', '🛍️', '#EF4444', 'expense', true),
('Entertainment', '🎬', '#EF4444', 'expense', true),
('Health', '🏥', '#EF4444', 'expense', true),
('Education', '📚', '#EF4444', 'expense', true),
('Subscriptions', '📱', '#EF4444', 'expense', true),
('Other', '💳', '#EF4444', 'expense', true);

-- ============================================
-- STEP 5: Create a function to auto-create user profile
-- This triggers when a new user signs up via Supabase Auth
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- STEP 6: Enable uuid-ossp extension for uuid_generate_v4
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- VERIFICATION
-- ============================================

SELECT '✅ Setup complete! Tables created:' as status;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('users', 'transactions', 'categories');

SELECT '📋 RLS Policies created:' as status;
SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public';

SELECT '🏷️ Default categories inserted:' as status;
SELECT name, type, icon FROM public.categories WHERE is_default = true ORDER BY type;
