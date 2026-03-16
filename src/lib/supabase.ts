import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/*
 * Supabase table schema — run this SQL in your Supabase project:
 *
 * create table articles (
 *   id           uuid primary key default gen_random_uuid(),
 *   title        text not null,
 *   slug         text unique not null,
 *   standfirst   text,
 *   content      text,          -- HTML content
 *   author       text not null default 'Anshul Kapoor',
 *   author_initials text not null default 'AK',
 *   published_at date,
 *   read_time    integer,
 *   type         text not null default 'article' check (type in ('article', 'video')),
 *   video_duration text,
 *   featured     boolean not null default false,
 *   published    boolean not null default false,
 *   created_at   timestamptz not null default now(),
 *   updated_at   timestamptz not null default now()
 * );
 *
 * -- Enable RLS
 * alter table articles enable row level security;
 *
 * -- Allow anyone to read published articles
 * create policy "Public read published articles"
 *   on articles for select
 *   using (published = true);
 *
 * -- For admin write access, use Supabase Auth or a service-role key
 * -- in a server-side function. This client uses the anon key which
 * -- cannot write unless you add an appropriate RLS policy.
 *
 * -- Dev-only: allow all operations with anon key (remove in production)
 * -- create policy "Dev allow all" on articles for all using (true) with check (true);
 */
