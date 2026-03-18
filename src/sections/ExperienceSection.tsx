import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Calendar, MapPin, Code2, ChevronDown } from 'lucide-react'

const experiences = [
  {
    id: 1,
    role: 'Développeur Full Stack',
    company: 'SymbioteK - Freelance',
    location: 'Paris',
    period: 'Depuis septembre 2025',
    description: "Intervention sur une plateforme SaaS Laravel existante dédiée au live streaming pour professionnel.",
    tasks: [
      "Conception et évolution d'un système de diffusion temps réel (salles, participants, chat, modération, rôles).",
      "Intégration de LiveKit (WebRTC) et WebSockets pour la gestion des flux audio/vidéo, des interactions et la réduction de la latence.",
      "Intégration des moyens de paiement (Stripe et PayPal)."
    ],
    tech: ['PHP', 'Laravel', 'LiveKit', 'WebRTC', 'WebSockets', 'Stripe']
  },
  {
    id: 2,
    role: 'Développeur Full Stack',
    company: 'Sopra Steria',
    location: 'Luxembourg',
    period: 'Septembre 2024 - Août 2025',
    description: "Maintenance évolutive et corrective d'applications back office critiques dans le secteur public.",
    tasks: [
      "Participation aux daily meetings et coordination avec les équipes.",
      "Développement, tests d'intégration, tests d'acceptation et déploiement via pipelines CI/CD.",
      "Chiffrage, revues de code et correction d'anomalies (Jira).",
      "Réalisation de tests de sécurité et traitement des vulnérabilités (CVE).",
      "Déploiement sur plusieurs environnements et rédaction de documentation (DAT, Doc Sécurité)."
    ],
    tech: ['Java EE', 'Spring', 'Vue.js', 'Angular', 'PostgreSQL', 'Docker', 'GitLab CI']
  },
  {
    id: 3,
    role: 'Développeur Freelance',
    company: 'Naboupay',
    location: 'Paris',
    period: '2023 - Août 2024',
    description: "Temps partiel. Développement des solutions de paiement et d'intégration.",
    tasks: [
      "Développement de l'API pour la partie backend.",
      "Développement des différents SDK dédiés à l'intégration.",
      "Conception et développement de la plateforme web."
    ],
    tech: ['Node.js', 'React', 'API REST', 'SDK']
  },
  {
    id: 4,
    role: 'Ingénieur développeur Full Stack',
    company: 'Origyns Labs - DER/FJ',
    location: 'Dakar, Sénégal',
    period: 'Août 2021 - Juillet 2023',
    description: "Conception, développement d'applications web et mobiles.",
    tasks: [
      "Développement d'API sécurisées avec Python/Django.",
      "Correction de bugs et amélioration continue des fonctionnalités.",
      "Déploiement des applications en environnement de production."
    ],
    tech: ['Python', 'Django', 'React', 'Firebase', 'PostgreSQL']
  },
  {
    id: 5,
    role: 'Analyste développeur',
    company: "Cabinet DEV'IT",
    location: 'Dakar, Sénégal',
    period: 'Février 2021 - Juillet 2021',
    description: "Application web SaaS de gestion de scolarité pour une école de la place.",
    tasks: [
      "Analyse des besoins et animation de workshops avec le client.",
      "Conception et réalisation de l'application web SaaS."
    ],
    tech: ['PHP', 'Laravel', 'JavaScript', 'HTML/CSS']
  }
]

export function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section id="experience" className="py-28 border-t border-border/40 bg-secondary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">// 03. parcours</p>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Mon <span className="gradient-text">Expérience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Plus de 3 ans passés à résoudre des défis techniques pour des projets variés, en freelance et en entreprise.
          </p>
        </motion.div>

        {/* Timeline (Linear Layout for better UX) */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 md:before:left-8 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-border/80 before:to-transparent pt-4">
          {experiences.map((exp, i) => {
            const isExpanded = expandedId === exp.id

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-stretch group"
              >
                {/* Timeline Axis & Dot */}
                <div className="flex-none w-12 md:w-16 flex justify-center pt-5">
                  <div className="h-4 w-4 rounded-full border-[3px] border-card bg-primary shadow-sm shadow-primary/30 z-10 transition-transform group-hover:scale-125" />
                </div>

                {/* Collapsible Card */}
                <div 
                  className={`flex-1 rounded-2xl border bg-card/50 overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'border-primary/50 shadow-md shadow-primary/5' : 'border-border/60 hover:border-border cursor-pointer shadow-sm hover:shadow-md'
                  }`}
                  onClick={() => !isExpanded && setExpandedId(exp.id)}
                >
                  {/* Card Header (Always visible) */}
                  <div className="p-5 md:p-6 grid gap-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/80 font-medium">
                          <span className="flex items-center gap-1.5 font-bold">
                            <Briefcase className="h-3.5 w-3.5 text-primary" />
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 opacity-70" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      
                      {/* Date Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/80 rounded-lg text-xs font-semibold text-muted-foreground whitespace-nowrap border border-border/40 shrink-0">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {exp.tech.map(tech => (
                        <span key={tech} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-background border border-border/60 text-[11px] font-mono text-muted-foreground mr-1">
                          <Code2 className="h-3 w-3 text-primary/70" />
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Expand Trigger */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedId(isExpanded ? null : exp.id)
                      }}
                      className="flex items-center gap-2 mt-1 text-xs font-medium text-primary hover:text-primary/80 self-start transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                    >
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                      {isExpanded ? 'Réduire' : 'Voir les détails des missions'}
                    </button>
                  </div>

                  {/* Expanded Content (Tasks & Description) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 md:px-6 pb-6 pt-2 border-t border-border/40 bg-secondary/10">
                          <p className="text-sm text-foreground/90 font-medium mb-3">
                            {exp.description}
                          </p>
                          <ul className="space-y-2.5">
                            {exp.tasks.map((task, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                                <span className="leading-relaxed">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
