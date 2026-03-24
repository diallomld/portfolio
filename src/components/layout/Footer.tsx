import { Github, Linkedin, Mail, Code2, Zap, ArrowUp } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com/diallomld', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/diallomld', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:diallomalamine5@gmail.com', icon: Mail, label: 'Email' },
]

const navLinks = [
  { href: '#about', label: 'À propos' },
  { href: '#experience', label: 'Parcours' },
  { href: '#skills', label: 'Compétences' },
  { href: '#projects', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <button onClick={scrollTop} className="flex items-center gap-2 group focus:outline-none">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30 group-hover:ring-primary/60 transition-all">
                <Code2 className="h-4 w-4 text-primary" />
                <Zap className="absolute -right-1 -top-1 h-3 w-3 text-primary fill-primary" />
              </div>
              <span className="font-bold text-sm tracking-tight">
                <span className="gradient-text">Lamine</span>
                <span className="text-foreground"> DIALLO</span>
              </span>
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Développeur Full Stack & DevOps.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={e => {
                      e.preventDefault()
                      document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Back to top */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Réseaux</h3>
              <div className="flex gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <button
              onClick={scrollTop}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Retour en haut
            </button>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p className='justify-center items-center mx-auto text-center'>© {year} Lamine DIALLO. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
