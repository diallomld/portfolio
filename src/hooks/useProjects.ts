import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured, type Project } from '@/lib/supabase'

// Static fallback data — used when Supabase is not configured
const staticProjects: Project[] = [
  {
    id: '0',
    title: 'Application de gestion de stock et de facturation',
    slug: 'stockpro',
    description: 'SaaS PWA user friendly et responsive pour la gestion de stock et de facturation.',
    content_md: '## Description\nPlateforme full-stack avec authentification OAuth, isolation RLS Supabase, et webhooks Stripe.',
    tech_stack: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'PostgreSQL', 'Tailwind', 'Vitest', 'PostHog', 'Sonarqube', 'Github Actions CI/CD', 'Vercel', 'OpenAPI/Swagger'],
    github_url: '',
    demo_url: 'https://stockpro.sn',
    priority: 0,
  },
  {
    id: '1',
    title: 'Portfolio',
    slug: 'portfolio',
    description: 'Portfolio personnel developper avec react, Framer Motion et tailwind.',
    content_md: '## Description\nPlateforme full-stack avec authentification OAuth, isolation RLS Supabase, et webhooks Stripe.',
    tech_stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vitest', 'PostHog', 'Sonarqube', 'eslint', 'Github Actions CI/CD', 'Vercel'],
    github_url: 'https://github.com/diallomld/portfolio/',
    demo_url: 'https://portfolio-weld-psi-28.vercel.app/',
    priority: 1,
  },
  {
    id: '2',
    title: 'Plateforme de live streaming',
    slug: 'live-streaming',
    description: 'Plateforme de live streaming avec LiveKit, WebRTC et WebSockets, Transcription et resume audio avec LLM.',
    content_md: '',
    tech_stack: ['PHP', 'Laravel', 'LiveKit', 'WebRTC', 'WebSockets', 'Stripe', 'LLM', 'OpenAI', 'Gemini', 'Deepgram', 'Basecamp', 'OVH VPC', 'Github Actions CI/CD'],
    github_url: '',
    demo_url: 'https://diva-yoga.com/',
    priority: 2,
  },
]

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      if (!isSupabaseConfigured || !supabase) {
        // Use static data with simulated loading
        await new Promise(r => setTimeout(r, 800))
        setProjects(staticProjects)
        setLoading(false)
        return
      }

      try {
        const { data, error: sbError } = await supabase
          .from('projects')
          .select('*')
          .order('priority', { ascending: true })

        if (sbError) throw sbError
        setProjects(data ?? staticProjects)
      } catch {
        setError('Erreur lors du chargement des projets')
        setProjects(staticProjects)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}
