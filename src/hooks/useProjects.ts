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
    title: 'Orchestrateur DevOps CI/CD',
    slug: 'devops-pipeline',
    description: 'Pipeline CI/CD automatisé avec Docker, Kubernetes et monitoring Prometheus/Grafana sur AWS EKS.',
    content_md: '',
    tech_stack: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform', 'Prometheus'],
    github_url: 'https://github.com',
    demo_url: '',
    priority: 2,
  },
  {
    id: '3',
    title: 'API REST Haute Performance',
    slug: 'rest-api',
    description: 'API RESTful en Node.js/Express avec Redis pour le cache, rate limiting et documentation Swagger auto-générée.',
    content_md: '',
    tech_stack: ['Node.js', 'Express', 'Redis', 'PostgreSQL', 'Jest', 'Swagger'],
    github_url: 'https://github.com',
    demo_url: 'https://demo.example.com',
    priority: 3,
  },
  {
    id: '4',
    title: 'Dashboard Analytics React',
    slug: 'analytics-dashboard',
    description: 'Dashboard de business intelligence avec graphiques interactifs, filtres dynamiques et export PDF/CSV.',
    content_md: '',
    tech_stack: ['React', 'TypeScript', 'Recharts', 'React Query', 'Tailwind'],
    github_url: 'https://github.com',
    demo_url: 'https://demo.example.com',
    priority: 4,
  },
  {
    id: '5',
    title: 'Microservices Spring Boot',
    slug: 'spring-microservices',
    description: 'Architecture microservices avec Spring Boot, Kafka pour les events, et service mesh Istio.',
    content_md: '',
    tech_stack: ['Java', 'Spring Boot', 'Kafka', 'Docker', 'Kubernetes', 'MySQL'],
    github_url: 'https://github.com',
    demo_url: '',
    priority: 5,
  },
  {
    id: '6',
    title: 'Application Mobile React Native',
    slug: 'mobile-app',
    description: 'App cross-platform iOS/Android avec géolocalisation, push notifications et synchronisation offline-first.',
    content_md: '',
    tech_stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Redux'],
    github_url: 'https://github.com',
    demo_url: '',
    priority: 6,
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
