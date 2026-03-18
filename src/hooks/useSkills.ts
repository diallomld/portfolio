import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured, type Skill } from '@/lib/supabase'

const staticSkills: Skill[] = [
  // Frontend
  { id: '1', name: 'React', category: 'frontend', icon_name: 'Layers', level: 5 },
  { id: '2', name: 'Vue.js', category: 'frontend', icon_name: 'Globe', level: 4 },
  { id: '3', name: 'Angular', category: 'frontend', icon_name: 'Code2', level: 4 },
  { id: '4', name: 'JavaScript', category: 'frontend', icon_name: 'Code2', level: 5 },
  // Backend
  { id: '5', name: 'Java / JEE', category: 'backend', icon_name: 'Coffee', level: 5 },
  { id: '6', name: 'Spring', category: 'backend', icon_name: 'Server', level: 4 },
  { id: '7', name: 'Python / Django', category: 'backend', icon_name: 'Terminal', level: 4 },
  { id: '8', name: 'PHP / Laravel', category: 'backend', icon_name: 'Database', level: 4 },
  // DevOps
  { id: '9', name: 'Docker / Kubernetes', category: 'devops', icon_name: 'Box', level: 4 },
  { id: '10', name: 'CI/CD (GitLab, GitHub)', category: 'devops', icon_name: 'GitBranch', level: 5 },
  { id: '11', name: 'Terraform', category: 'devops', icon_name: 'Settings', level: 3 },
  { id: '12', name: 'Vercel', category: 'devops', icon_name: 'Cloud', level: 4 },
  // Security & Monitoring
  { id: '13', name: 'SonarQube', category: 'security', icon_name: 'Activity', level: 4 },
  { id: '14', name: 'Sentry', category: 'security', icon_name: 'AlertCircle', level: 4 },
  { id: '15', name: 'PostHog', category: 'security', icon_name: 'LineChart', level: 4 },
  { id: '16', name: 'Splunk', category: 'security', icon_name: 'Activity', level: 4 },
  // Systems & Cloud
  { id: '17', name: 'AWS / Azure', category: 'systems', icon_name: 'Cloud', level: 4 },
  { id: '18', name: 'Linux (Debian)', category: 'systems', icon_name: 'Terminal', level: 5 },
  { id: '19', name: 'Windows Server / AD', category: 'systems', icon_name: 'Server', level: 4 },
  // Tools & IA
  { id: '20', name: 'Cursor / Lovable', category: 'tools', icon_name: 'Wand2', level: 5 },
  { id: '21', name: 'Claude Code', category: 'tools', icon_name: 'Bot', level: 5 },
]

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSkills() {
      if (!isSupabaseConfigured || !supabase) {
        await new Promise(r => setTimeout(r, 600))
        setSkills(staticSkills)
        setLoading(false)
        return
      }

      try {
        const { data, error: sbError } = await supabase
          .from('skills')
          .select('*')
          .order('level', { ascending: false })

        if (sbError) throw sbError
        setSkills(data ?? staticSkills)
      } catch {
        setError('Erreur lors du chargement des compétences')
        setSkills(staticSkills)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Group skills by category
  const grouped = {
    frontend: skills.filter(s => s.category === 'frontend'),
    backend: skills.filter(s => s.category === 'backend'),
    devops: skills.filter(s => s.category === 'devops'),
    security: skills.filter(s => s.category === 'security'),
    systems: skills.filter(s => s.category === 'systems'),
    tools: skills.filter(s => s.category === 'tools'),
  }

  return { skills, grouped, loading, error }
}
