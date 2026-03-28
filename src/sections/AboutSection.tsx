import { motion } from 'framer-motion'
import { Terminal, ArrowRight, Github, ExternalLink } from 'lucide-react'

const stats = [
  { value: '3+', label: 'Années d\'expérience' },
  { value: '5+', label: 'Projets livrés' },
  { value: '15+', label: 'Technologies' },
  { value: '100%', label: 'Motivation' },
]

export function AboutSection() {
  return (
    <section id="about" className="py-28 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-foreground">
            Qui suis-<span className="gradient-text">je ?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl border border-border overflow-hidden shadow-2xl">
              {/* Fake terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <div className="flex items-center gap-1.5 ml-3 text-xs text-muted-foreground">
                  <Terminal className="h-3 w-3" />
                  <span className="font-mono">profile.ts</span>
                </div>
              </div>
              {/* Code */}
              <pre className="p-6 text-sm font-mono leading-relaxed text-left overflow-x-auto bg-card">
                <code>
                  <span className="text-muted-foreground">{'// Mon profil développeur\n'}</span>
                  <span className="text-cyan-400">const </span>
                  <span className="text-foreground">developer </span>
                  <span className="text-cyan-400">= </span>
                  <span className="text-yellow-400">{'{\n'}</span>
                  <span className="text-blue-400">{'  name'}</span><span className="text-foreground">{': '}</span><span className="text-emerald-400">{'\'Lamine DIALLO\''}</span><span className="text-foreground">{',\n'}</span>
                  <span className="text-blue-400">{'  location'}</span><span className="text-foreground">{': '}</span><span className="text-emerald-400">{'\'Paris, France 🇫🇷\''}</span><span className="text-foreground">{',\n'}</span>
                  <span className="text-blue-400">{'  experience'}</span><span className="text-foreground">{': '}</span><span className="text-orange-400">{'\'3+ ans\''}</span><span className="text-foreground">{',\n'}</span>
                  <span className="text-blue-400">{'  stack'}</span><span className="text-foreground">{': '}</span><span className="text-yellow-400">{'[\n'}</span>
                  <span className="text-emerald-400">{'    \'Java\', \'Python\', \'React\',\n'}</span>
                  <span className="text-emerald-400">{'    \'Vue.js\', \'Angular\', \'Laravel\',\n'}</span>
                  <span className="text-emerald-400">{'    \'Docker\', \'AWS\', \'CI/CD\',\n'}</span>
                  <span className="text-yellow-400">{'  ]'}</span><span className="text-foreground">{',\n'}</span>
                  <span className="text-blue-400">{'  contact'}</span><span className="text-foreground">{': '}</span><span className="text-emerald-400">{'\'m.lamine.diallo.pro@gmail.com\''}</span><span className="text-foreground">{',\n'}</span>
                  <span className="text-blue-400">{'  qualities'}</span><span className="text-foreground">{': '}</span><span className="text-emerald-400">{'\'Analyse & Esprit d\'équipe\''}</span><span className="text-foreground">{',\n'}</span>
                  <span className="text-yellow-400">{'}'}</span>
                </code>
              </pre>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Développeur Full Stack avec <span className="text-foreground font-semibold"> plus de 3 ans d'expérience</span>,
              j'interviens aussi bien sur le backend que le frontend, avec une expertise forte sur
              des technologies telles que Java, Python, React, Vue.js et PHP/Laravel.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Je suis capable de concevoir, développer, maintenir et sécuriser des
              applications web de bout en bout.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://github.com/diallomld"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <Github className="h-4 w-4" />
                GitHub
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all"
              >
                Mes projets
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-border bg-card/50 p-4">
                  <div className="text-2xl font-black gradient-text">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
