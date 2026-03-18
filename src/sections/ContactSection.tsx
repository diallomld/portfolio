import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, MessageSquare, Send, Github, Linkedin, MapPin, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Message } from '@/lib/supabase'

const contactInfo = [
  { icon: Mail,     label: 'Email',         value: 'diallomalamine5@gmail.com', href: 'mailto:diallomalamine5@gmail.com' },
  { icon: Phone,    label: 'Téléphone',     value: '07 58 39 62 69',           href: 'tel:+33758396269'                 },
  { icon: Github,   label: 'GitHub',        value: '@diallomld',                href: 'https://github.com/diallomld'     },
  { icon: Linkedin, label: 'LinkedIn',      value: 'in/diallomld',              href: 'https://linkedin.com/in/diallomld'},
  { icon: MapPin,   label: 'Localisation',  value: 'Paris, France 🇫🇷',         href: null                               },
]

interface FormState { name: string; email: string; subject: string; body: string }
interface FormErrors { name?: string; email?: string; subject?: string; body?: string }

function validate(f: FormState): FormErrors {
  const e: FormErrors = {}
  if (!f.name.trim()) e.name = 'Requis'
  if (!f.email.trim()) e.email = 'Requis'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Email invalide'
  if (!f.subject.trim()) e.subject = 'Requis'
  if (!f.body.trim()) e.body = 'Requis'
  else if (f.body.trim().length < 20) e.body = 'Minimum 20 caractères'
  return e
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', body: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [sending, setSending] = useState(false)

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors(er => ({ ...er, [k]: undefined }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    try {
      const msg: Message = { email: form.email, subject: `[${form.name}] ${form.subject}`, body: form.body }
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('messages').insert([msg])
        if (error) throw error
      } else {
        await new Promise(r => setTimeout(r, 1000))
      }
      toast.success('Message envoyé !', { description: 'Je vous répondrai dans les 24h. Merci !' })
      setForm({ name: '', email: '', subject: '', body: '' })
    } catch {
      toast.error('Échec de l\'envoi', { description: 'Une erreur est survenue. Réessayez ou écrivez directement.' })
    } finally {
      setSending(false)
    }
  }

  const fieldClass = (err?: string) =>
    `w-full rounded-xl border ${err ? 'border-red-400 focus:ring-red-400/30' : 'border-border focus:ring-ring/30'} bg-secondary/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors`

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
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">// 05. contact</p>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Me <span className="gradient-text">Contacter</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Un projet ? Une collaboration ? Parlons-en.
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
              <div key={label} className="flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-card/50">
                <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary/10 shrink-0">
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
                <p className="text-xs text-muted-foreground">Freelance & opportunités CDI</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            id="contact-form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-7 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="c-name" className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                  <User className="h-3 w-3" /> Nom
                </label>
                <input id="c-name" placeholder="Jean Dupont" value={form.name} onChange={set('name')} className={fieldClass(errors.name)} />
                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="c-email" className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                  <Mail className="h-3 w-3" /> Email
                </label>
                <input id="c-email" type="email" placeholder="jean@example.com" value={form.email} onChange={set('email')} className={fieldClass(errors.email)} />
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="c-subject" className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                <MessageSquare className="h-3 w-3" /> Sujet
              </label>
              <input id="c-subject" placeholder="Collaboration sur un projet React…" value={form.subject} onChange={set('subject')} className={fieldClass(errors.subject)} />
              {errors.subject && <p className="text-xs text-red-400">{errors.subject}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="c-message" className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                <MessageSquare className="h-3 w-3" /> Message
              </label>
              <textarea id="c-message" rows={5} placeholder="Décrivez votre projet ou votre question…" value={form.body} onChange={set('body')} className={`${fieldClass(errors.body)} resize-none`} />
              {errors.body && <p className="text-xs text-red-400">{errors.body}</p>}
            </div>

            <button
              id="contact-submit-btn"
              type="submit"
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all glow-indigo"
            >
              {sending ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                  />
                  Envoi en cours…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer le message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
