-- Create a table for public profiles using Supabase auth.users
create table life_os.users (
  id uuid references auth.users not null primary key,
  phone text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Internal policies for users table
alter table life_os.users enable row level security;

create policy "Users can view own profile" on life_os.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on life_os.users
  for update using (auth.uid() = id);

-- Create a table for transactions
create table life_os.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  amount decimal(12, 2) not null,
  type text check (type in ('income', 'expense')) not null,
  category text not null,
  source text check (source in ('web', 'whatsapp')) default 'web',
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
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

-- Create a function to handle new user signup
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
