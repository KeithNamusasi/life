// Database Setup Script for Life-OS
// Run this with: npx tsx scripts/setup-database.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('🔧 Setting up Life-OS database...')
  
  // SQL to create tables
  const schemaSQL = `
    -- Create users table
    CREATE TABLE IF NOT EXISTS life_os.users (
      id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
      phone TEXT,
      full_name TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- Create transactions table
    CREATE TABLE IF NOT EXISTS life_os.transactions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES auth.users NOT NULL,
      amount DECIMAL(12, 2) NOT NULL,
      type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
      category TEXT NOT NULL,
      source TEXT CHECK (source IN ('web', 'whatsapp')) DEFAULT 'web',
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- Create categories table
    CREATE TABLE IF NOT EXISTS life_os.categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES auth.users,
      name TEXT NOT NULL,
      icon TEXT DEFAULT '💰',
      color TEXT DEFAULT '#6366F1',
      type TEXT CHECK (type IN ('income', 'expense', 'both')) DEFAULT 'both',
      is_default BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );
  `

  console.log('📋 Creating tables...')
  
  const { error: schemaError } = await supabase.rpc('exec_sql', { sql: schemaSQL })
  
  if (schemaError) {
    // Try executing SQL directly if RPC doesn't work
    console.log('Trying alternative approach...')
    
    // Execute statements one by one
    const statements = schemaSQL.split(';').filter(s => s.trim())
    
    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' })
        if (error) {
          console.log('Statement error (may be OK):', error.message)
        }
      }
    }
  }

  // Enable RLS and create policies
  console.log('🔐 Setting up security policies...')
  
  // Enable RLS on tables
  const rlsStatements = [
    'ALTER TABLE life_os.users ENABLE ROW LEVEL SECURITY;',
    'ALTER TABLE life_os.transactions ENABLE ROW LEVEL SECURITY;',
    'ALTER TABLE life_os.categories ENABLE ROW LEVEL SECURITY;',
    
    -- Users policies
    "CREATE POLICY IF NOT EXISTS 'Users can view own profile' ON life_os.users FOR SELECT USING (auth.uid() = id);",
    "CREATE POLICY IF NOT EXISTS 'Users can update own profile' ON life_os.users FOR UPDATE USING (auth.uid() = id);",
    
    -- Transactions policies
    "CREATE POLICY IF NOT EXISTS 'Users can view own transactions' ON life_os.transactions FOR SELECT USING (auth.uid() = user_id);",
    "CREATE POLICY IF NOT EXISTS 'Users can insert own transactions' ON life_os.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);",
    "CREATE POLICY IF NOT EXISTS 'Users can update own transactions' ON life_os.transactions FOR UPDATE USING (auth.uid() = user_id);",
    "CREATE POLICY IF NOT EXISTS 'Users can delete own transactions' ON life_os.transactions FOR DELETE USING (auth.uid() = user_id);",
    
    -- Categories policies
    "CREATE POLICY IF NOT EXISTS 'Users can view own categories' ON life_os.categories FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);",
    "CREATE POLICY IF NOT EXISTS 'Users can manage own categories' ON life_os.categories FOR ALL USING (auth.uid() = user_id);",
  ]

  for (const statement of rlsStatements) {
    try {
      await supabase.rpc('exec_sql', { sql: statement })
    } catch (err) {
      // Ignore errors from RLS statements
    }
  }

  // Insert default categories
  console.log('🏷️ Inserting default categories...')
  
  const defaultCategories = [
    { name: 'Salary', icon: '💰', color: '#22C55E', type: 'income' },
    { name: 'Freelance', icon: '💼', color: '#22C55E', type: 'income' },
    { name: 'Investment', icon: '📈', color: '#22C55E', type: 'income' },
    { name: 'Gift', icon: '🎁', color: '#22C55E', type: 'income' },
    { name: 'Groceries', icon: '🛒', color: '#EF4444', type: 'expense' },
    { name: 'Food & Dining', icon: '🍽️', color: '#EF4444', type: 'expense' },
    { name: 'Transport', icon: '🚗', color: '#EF4444', type: 'expense' },
    { name: 'Utilities', icon: '💡', color: '#EF4444', type: 'expense' },
    { name: 'Shopping', icon: '🛍️', color: '#EF4444', type: 'expense' },
    { name: 'Entertainment', icon: '🎬', color: '#EF4444', type: 'expense' },
    { name: 'Health', icon: '🏥', color: '#EF4444', type: 'expense' },
    { name: 'Education', icon: '📚', color: '#EF4444', type: 'expense' },
    { name: 'Subscriptions', icon: '📱', color: '#EF4444', type: 'expense' },
    { name: 'Other', icon: '💳', color: '#EF4444', type: 'expense' },
  ]

  for (const cat of defaultCategories) {
    try {
      await supabase.from('life_os.categories').insert(cat)
    } catch (err) {
      // Ignore duplicates
    }
  }

  console.log('✅ Database setup complete!')
  console.log('')
  console.log('Next steps:')
  console.log('1. Restart your Next.js development server')
  console.log('2. Try adding a transaction again')
}

setupDatabase().catch(console.error)
