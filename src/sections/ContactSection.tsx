import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, MapPin, Phone, Calendar } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'diallomalamine5@gmail.com', href: 'mailto:diallomalamine5@gmail.com' },
  { icon: Phone, label: 'Téléphone', value: '07 58 39 62 69', href: 'tel:+33758396269' },
  { icon: Github, label: 'GitHub', value: '@diallomld', href: 'https://github.com/diallomld' },
  { icon: MapPin, label: 'Localisation', value: 'Paris, France 🇫🇷', href: null },
]

export function ContactSection() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="contact" className="py-28 border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Me <span className="gradient-text">Contacter</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Un projet ? Une collaboration ? Prenons rendez-vous directement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-3"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-card/50 hover:bg-card/80 transition-colors group">
                <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
                  {href
                    ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block">{value}</a>
                    : <p className="text-sm font-medium text-foreground truncate">{value}</p>
                  }
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div className="mt-4 flex items-center gap-2.5 p-3.5 rounded-xl border border-emerald-400/20 bg-emerald-400/5">
              <span className="status-dot online" />
              <div>
                <p className="text-sm font-semibold text-emerald-400">Disponible</p>
                <p className="text-xs text-muted-foreground">Freelance & opportunités CDI/CDD</p>
              </div>
            </div>
          </motion.div>

          {/* Calendly Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="p-6 border-b border-border/40 bg-muted/30 flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Réserver un créneau</h3>
                <p className="text-xs text-muted-foreground">Choisissez le moment qui vous convient le mieux</p>
              </div>
            </div>

            <div
              className="calendly-inline-widget w-full"
              data-url="https://calendly.com/m-lamine-diallo-pro/30min"
              style={{ minWidth: '320px', height: '550px' }}
            >
              {/* Le widget Calendly sera injecté ici */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
