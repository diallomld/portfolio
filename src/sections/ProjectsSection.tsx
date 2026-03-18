import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Search, FolderOpen } from 'lucide-react'
import { useProjects } from '@/hooks/useProjects'
import { ProjectCardSkeleton } from '@/components/ui/Skeleton'

const ALL = 'Tous'

export function ProjectsSection() {
  const { projects, loading } = useProjects()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState(ALL)

  const topTechs = useMemo(() => {
    const freq = new Map<string, number>()
    projects.forEach(p => p.tech_stack.forEach(t => freq.set(t, (freq.get(t) ?? 0) + 1)))
    const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t)
    return [ALL, ...sorted.slice(0, 10)]
  }, [projects])

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const q = search.toLowerCase()
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tech_stack.some(t => t.toLowerCase().includes(q))
      const matchFilter = activeFilter === ALL || p.tech_stack.includes(activeFilter)
      return matchSearch && matchFilter
    })
  }, [projects, search, activeFilter])

  return (
    <section id="projects" className="py-28 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">// 03. réalisations</p>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Mes <span className="gradient-text">Projets</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Des projets concrets qui démontrent mon expertise technique.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="project-search-input"
              type="text"
              placeholder="Rechercher un projet ou une techno…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>
          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {topTechs.map(tech => (
              <button
                key={tech}
                id={`filter-pill-${tech.toLowerCase().replace(/[\s.+]/g, '-')}`}
                onClick={() => setActiveFilter(tech)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  activeFilter === tech
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                    : 'border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <FolderOpen className="h-14 w-14 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Aucun projet trouvé</h3>
            <p className="text-muted-foreground text-sm mb-5">Essayez un autre terme ou effacez les filtres.</p>
            <button
              id="clear-filters-btn"
              onClick={() => { setSearch(''); setActiveFilter(ALL) }}
              className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Effacer les filtres
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 card-hover group"
                >
                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech_stack.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-md border border-border/70 bg-secondary/50 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-border/50">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-lg border border-border text-xs font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
                        id={`github-btn-${project.slug}`}
                      >
                        <Github className="h-3.5 w-3.5" />
                        Code
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-all"
                        id={`demo-btn-${project.slug}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Demo
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
