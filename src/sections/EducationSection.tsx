import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'

const education = [
  {
    id: 1,
    degree: 'Master diplôme d\'ingénieur spécialité Systèmes complexes',
    school: 'Université de Technologie de Troyes (UTT)',
    location: 'Troyes, France',
    period: '2023 - 2025',
    description: "Formation avancée sur la conception, modélisation et optimisation des systèmes complexes, d'information et de décision."
  }
]

export function EducationSection() {
  return (
    <section id="education" className="py-28 border-t border-border/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">// 04. formation</p>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
            Ma <span className="gradient-text">Formation</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-border/60 bg-card/50 flex flex-col md:flex-row gap-6 items-start hover:border-primary/30 transition-all card-hover"
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">{edu.degree}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground mb-4">
                  <span className="text-primary">{edu.school}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {edu.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {edu.period}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
