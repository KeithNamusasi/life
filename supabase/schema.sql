-- ============================================
-- LIFE-OS DATABASE SCHEMA
-- ============================================

-- Create a table for public profiles using Supabase auth.users
create table life_os.users (
  id uuid references auth.users not null primary key,
  phone text,
  full_name text,
  avatar_url text,
  currency text default 'USD',
  timezone text default 'UTC',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Internal policies for users table
alter table life_os.users enable row level security;

create policy "Users can view own profile" on life_os.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on life_os.users
  for update using (auth.uid() = id);

-- ============================================
-- CATEGORIES TABLE
-- ============================================
create table life_os.categories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users, -- null means system default category
  name text not null,
  icon text default '💰',
  color text default '#6366F1',
  type text check (type in ('income', 'expense', 'both')) default 'both',
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table life_os.categories enable row level security;

-- Policies for categories
create policy "Users can view own categories" on life_os.categories
  for select using (auth.uid() = user_id or user_id is null);

create policy "Users can insert own categories" on life_os.categories
  for insert with check (auth.uid() = user_id);

create policy "Users can update own categories" on life_os.categories
  for update using (auth.uid() = user_id);

create policy "Users can delete own categories" on life_os.categories
  for delete using (auth.uid() = user_id);

-- ============================================
-- TRANSACTIONS TABLE
-- ============================================
create table life_os.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  amount decimal(12, 2) not null,
  type text check (type in ('income', 'expense')) not null,
  category_id uuid references life_os.categories,
  category text, -- Denormalized for quick access
  source text check (source in ('web', 'whatsapp', 'import')) default 'web',
  description text,
  notes text,
  date date default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Internal policies for transactions table
alter table life_os.transactions enable row level security;

create policy "Users can view own transactions" on life_os.transactions
  for select using (auth.uid() = user_id);

create policy "Users can insert own transactions" on life_os.transactions
  for insert with check (auth.uid() = user_id);

create policy "Users can update own transactions" on life_os.transactions
  for update using (auth.uid() = user_id);

create policy "Users can delete own transactions" on life_os.transactions
  for delete using (auth.uid() = user_id);

-- ============================================
-- BUDGETS TABLE
-- ============================================
create table life_os.budgets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  category_id uuid references life_os.categories,
  amount decimal(12, 2) not null,
  period text check (period in ('weekly', 'monthly', 'yearly')) default 'monthly',
  start_date date default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table life_os.budgets enable row level security;

create policy "Users can view own budgets" on life_os.budgets
  for select using (auth.uid() = user_id);

create policy "Users can manage own budgets" on life_os.budgets
  for all using (auth.uid() = user_id);

-- ============================================
-- GOALS TABLE
-- ============================================
create table life_os.goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  target_amount decimal(12, 2) not null,
  current_amount decimal(12, 2) default 0,
  deadline date,
  is_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table life_os.goals enable row level security;

create policy "Users can view own goals" on life_os.goals
  for select using (auth.uid() = user_id);

create policy "Users can manage own goals" on life_os.goals
  for all using (auth.uid() = user_id);

-- ============================================
-- WHATSAPP WEBHOOK TABLE
-- ============================================
create table life_os.whatsapp_messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  phone_number text not null,
  message text not null,
  parsed_data jsonb, -- Extracted transaction data
  status text check (status in ('pending', 'processed', 'failed', 'ignored')) default 'pending',
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table life_os.whatsapp_messages enable row level security;

create policy "Users can view own whatsapp messages" on life_os.whatsapp_messages
  for select using (auth.uid() = user_id);

create policy "Users can insert whatsapp messages" on life_os.whatsapp_messages
  for insert with check (auth.uid() = user_id);

-- ============================================
-- SYSTEM DEFAULT CATEGORIES
-- ============================================
insert into life_os.categories (name, icon, color, type, is_default) values
  -- Income categories
  ('Salary', '💰', '#22C55E', 'income', true),
  ('Freelance', '💼', '#22C55E', 'income', true),
  ('Investment', '📈', '#22C55E', 'income', true),
  ('Gift', '🎁', '#22C55E', 'income', true),
  ('Bonus', '🎉', '#22C55E', 'income', true),
  ('Other Income', '💵', '#22C55E', 'income', true),
  
  -- Expense categories
  ('Groceries', '🛒', '#EF4444', 'expense', true),
  ('Food & Dining', '🍽️', '#EF4444', 'expense', true),
  ('Transport', '🚗', '#EF4444', 'expense', true),
  ('Utilities', '💡', '#EF4444', 'expense', true),
  ('Shopping', '🛍️', '#EF4444', 'expense', true),
  ('Entertainment', '🎬', '#EF4444', 'expense', true),
  ('Health', '🏥', '#EF4444', 'expense', true),
  ('Education', '📚', '#EF4444', 'expense', true),
  ('Subscriptions', '📱', '#EF4444', 'expense', true),
  ('Insurance', '🛡️', '#EF4444', 'expense', true),
  ('Other', '💳', '#EF4444', 'expense', true);

-- ============================================
-- FUNCTION: Handle new user signup
-- ============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into life_os.users (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- FUNCTION: Parse WhatsApp message
-- ============================================
create or replace function public.parse_whatsapp_message(message text)
returns jsonb as $$
declare
  amount numeric;
  transaction_type text;
  category text;
  description text;
begin
  -- Try to extract amount (looks for numbers)
  amount := (select substring(message from '[0-9]+(\.[0-9]{2})?')::numeric);
  
  -- Determine type based on keywords
  if message ilike '%spent%' or message ilike '%expense%' or message ilike '%paid%' then
    transaction_type := 'expense';
  elsif message ilike '%received%' or message ilike '%income%' or message ilike '%salary%' then
    transaction_type := 'income';
  else
    transaction_type := 'expense'; -- default
  end if;
  
  -- Try to find category
  category := 'Other';
  if message ilike '%food%' or message ilike '%lunch%' or message ilike '%dinner%' then
    category := 'Food & Dining';
  elsif message ilike '%grocer%' then
    category := 'Groceries';
  elsif message ilike '%transport%' or message ilike '%uber%' or message ilike '%taxi%' then
    category := 'Transport';
  elsif message ilike '%electric%' or message ilike '%water%' or message ilike '%internet%' then
    category := 'Utilities';
  elsif message ilike '%shopping%' then
    category := 'Shopping';
  elsif message ilike '%salary%' or message ilike '%salary%' then
    category := 'Salary';
  end if;
  
  return jsonb_build_object(
    'amount', coalesce(amount, 0),
    'type', transaction_type,
    'category', category,
    'description', message
  );
end;
$$ language plpgsql;

-- ============================================
-- VIEWS FOR DASHBOARD
-- ============================================

-- Monthly summary view
create or replace view life_os.monthly_summary as
select 
  user_id,
  date_trunc('month', created_at) as month,
  type,
  sum(amount) as total
from life_os.transactions
group by user_id, date_trunc('month', created_at), type;

-- Category breakdown view
create or replace view life_os.category_summary as
select 
  user_id,
  category,
  type,
  sum(amount) as total,
  count(*) as count
from life_os.transactions
group by user_id, category, type;
