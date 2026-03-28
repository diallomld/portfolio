import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react'

const roles = [
  'Développeur Full Stack',
  'Expertise Backend & Frontend',
  'Spécialiste Java, Python & React',
]

function useTypewriter(words: string[], speed = 75, pause = 2000) {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && charIndex < word.length) {
      timeout = setTimeout(() => setCharIndex(c => c + 1), speed)
    } else if (!deleting && charIndex === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(c => c - 1), speed / 2)
    } else {
      timeout = setTimeout(() => {
        setDeleting(false)
        setWordIndex(i => (i + 1) % words.length)
      }, 0)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause])

  return words[wordIndex].slice(0, charIndex)
}

const techBadges = ['React', 'Vue', 'Angular', 'Java', 'Python', 'PHP', 'Docker', 'AWS']

export function HeroSection() {
  const text = useTypewriter(roles)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center mesh-bg overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-primary/6 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-purple-500/6 blur-[100px]" />
        <div className="absolute top-[40%] left-[40%] h-[300px] w-[300px] rounded-full bg-cyan-500/4 blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 inline-flex"
        >
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/8 px-4 py-1.5 text-xs font-medium text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
            <span className="status-dot online" />
            Disponible pour concrétiser votre prochain projet
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 space-y-3"
        >
          <p className="text-base font-mono text-muted-foreground tracking-widest uppercase">
            Bonjour, je suis
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none">
            <span className="gradient-text">Lamine DIALLO</span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="h-12 sm:h-14 flex items-center justify-center mb-8"
        >
          <p className="text-xl sm:text-2xl font-semibold text-muted-foreground font-mono">
            <span className="text-primary">› </span>
            <span className="text-foreground">{text}</span>
            <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse align-middle" />
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Vous cherchez un profil technique <span className="text-foreground font-semibold">fiable et orienté solution</span> ? Fort de plus de 3 ans d’expérience, j'accompagne vos projets du back au front jusqu'au devops en garantissant qualité et performance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <button
            id="hero-cta-projects"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-xl shadow-primary/25 hover:opacity-90 active:scale-95 transition-all glow-indigo"
          >
            <Sparkles className="h-4 w-4" />
            Voir mes projets
            <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
            id="hero-cta-contact"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-secondary/70 hover:border-primary/40 active:scale-95 transition-all"
          >
            <Mail className="h-4 w-4" />
            Me contacter
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          {[
            { href: 'https://github.com/diallomld', icon: Github, label: 'GitHub' },
            { href: 'https://linkedin.com/in/diallomld', icon: Linkedin, label: 'LinkedIn' },
            { href: 'mailto:m.lamine.diallo.pro@gmail.com', icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        {/* Floating tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {techBadges.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.06 }}
              className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-border/70 bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
