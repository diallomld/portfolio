import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Layers, Code2, Globe, Palette, Sparkles, Smartphone,
  Server, Coffee, Database, Zap, Share2, Plug,
  Box, Cpu, Cloud, GitBranch, Settings, Terminal,
  Activity, AlertCircle, LineChart, Wand2, Bot
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useSkills } from '@/hooks/useSkills'
import { SkillCardSkeleton } from '@/components/ui/Skeleton'
import type { Skill } from '@/lib/supabase'

const iconMap: Record<string, LucideIcon> = {
  Layers, Code2, Globe, Palette, Sparkles, Smartphone,
  Server, Coffee, Database, Zap, Share2, Plug,
  Box, Cpu, Cloud, GitBranch, Settings, Terminal,
  Activity, AlertCircle, LineChart, Wand2, Bot
}

const categories = {
  frontend: {
    label: 'Frontend',
    desc: 'Interfaces modernes et réactives',
    accent: 'text-cyan-400',
    bar: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    bg: 'bg-cyan-500/10',
    ring: 'ring-cyan-500/25',
    line: 'from-cyan-500/30 to-transparent',
  },
  backend: {
    label: 'Backend',
    desc: 'APIs robustes & bases de données',
    accent: 'text-emerald-400',
    bar: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
    ring: 'ring-emerald-500/25',
    line: 'from-emerald-500/30 to-transparent',
  },
  devops: {
    label: 'DevOps & CI/CD',
    desc: 'Infrastructure & Pipelines',
    accent: 'text-orange-400',
    bar: 'bg-gradient-to-r from-orange-500 to-amber-500',
    bg: 'bg-orange-500/10',
    ring: 'ring-orange-500/25',
    line: 'from-orange-500/30 to-transparent',
  },
  security: {
    label: 'DevSecOps & Monit.',
    desc: 'Qualité de code, Obsevabilité',
    accent: 'text-red-400',
    bar: 'bg-gradient-to-r from-red-500 to-rose-500',
    bg: 'bg-red-500/10',
    ring: 'ring-red-500/25',
    line: 'from-red-500/30 to-transparent',
  },
  systems: {
    label: 'Systèmes & Cloud',
    desc: 'Hébergement, OS, Architectures',
    accent: 'text-indigo-400',
    bar: 'bg-gradient-to-r from-indigo-500 to-violet-500',
    bg: 'bg-indigo-500/10',
    ring: 'ring-indigo-500/25',
    line: 'from-indigo-500/30 to-transparent',
  },
  tools: {
    label: 'Outils & IA',
    desc: 'Environnement de dvt, IA ass.',
    accent: 'text-fuchsia-400',
    bar: 'bg-gradient-to-r from-fuchsia-500 to-pink-500',
    bg: 'bg-fuchsia-500/10',
    ring: 'ring-fuchsia-500/25',
    line: 'from-fuchsia-500/30 to-transparent',
  },
} as const

type CategoryKey = keyof typeof categories

const levelLabels = ['', 'Notions', 'Intermédiaire', 'Avancé', 'Expert', 'Maître']

function SkillItem({ skill, barClass }: { skill: Skill; barClass: string }) {
  const Icon = iconMap[skill.icon_name] ?? Code2
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bar.style.width = `${(skill.level / 5) * 100}%`
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(bar)
    return () => obs.disconnect()
  }, [skill.level])

  const cat = categories[skill.category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card/50 hover:border-border hover:bg-card transition-all group"
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${cat.bg} ring-1 ${cat.ring} group-hover:scale-110 transition-transform`}>
        <Icon className={`h-4.5 w-4.5 ${cat.accent}`} style={{ width: '1.1rem', height: '1.1rem' }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-semibold text-foreground truncate">{skill.name}</span>
          <span className="text-[10px] text-muted-foreground ml-1 shrink-0">{levelLabels[skill.level]}</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            ref={barRef}
            className={`h-full rounded-full transition-all duration-[1.2s] ease-out ${barClass}`}
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const { grouped, loading } = useSkills()

  return (
    <section id="skills" className="py-28 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Mes <span className="gradient-text">Compétences</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Technologies maîtrisées à travers des projets réels et une veille continue.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {(Object.entries(categories) as [CategoryKey, typeof categories[CategoryKey]][]).map(
            ([key, cat], colIdx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: colIdx * 0.1 }}
              >
                {/* Category header */}
                <div className="mb-5">
                  <h3 className={`text-lg font-bold ${cat.accent} mb-0.5`}>{cat.label}</h3>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-muted-foreground">{cat.desc}</p>
                    <div className={`flex-1 h-px bg-gradient-to-r ${cat.line}`} />
                  </div>
                </div>

                {/* Skills list */}
                <div className="space-y-2.5">
                  {loading
                    ? Array.from({ length: 6 }).map((_, i) => <SkillCardSkeleton key={i} />)
                    : grouped[key].map(skill => (
                      <SkillItem key={skill.id} skill={skill} barClass={cat.bar} />
                    ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
