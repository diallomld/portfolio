import { Toaster } from 'sonner'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { EducationSection } from '@/sections/EducationSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { ContactSection } from '@/sections/ContactSection'
import { Footer } from '@/components/layout/Footer'

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LandingPage />
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: '0.75rem',
            fontFamily: 'Inter, system-ui, sans-serif',
          },
        }}
      />
    </ThemeProvider>
  )
}
