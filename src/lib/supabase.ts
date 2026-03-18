import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Supabase client – configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
// Falls back to static data when not configured
export const isSupabaseConfigured =
  !!supabaseUrl &&
  supabaseUrl !== 'undefined' &&
  !!supabaseAnonKey &&
  supabaseAnonKey !== 'undefined'

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type Project = {
  id: string
  title: string
  slug: string
  description: string
  content_md: string
  tech_stack: string[]
  github_url: string
  demo_url: string
  priority: number
}

export type Skill = {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'systems' | 'security' | 'tools'
  icon_name: string
  level: number
}

export type Message = {
  id?: string
  created_at?: string
  email: string
  subject: string
  body: string
  status?: string
}
