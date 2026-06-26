import { ScrollProvider } from '@/app/ScrollProvider'
import { Shell } from '@/app/Shell'
import Hero from '@/chapters/00-Hero'
import Intro from '@/chapters/01-Intro'
import Organization from '@/chapters/02-Organization'
import Problem from '@/chapters/03-Problem'
import Analysis from '@/chapters/04-Analysis'
import Solution from '@/chapters/05-Solution'
import Discussion from '@/chapters/06-Discussion'
import Close from '@/chapters/Close'

/**
 * Composes the experience: the smooth-scroll + ScrollTrigger context wraps the
 * persistent shell (top PillarNav + right StepRail), which wraps the eight
 * full-viewport chapter scenes in narrative order (00-PROJECT-BRIEF §4).
 */
export default function App() {
  return (
    <ScrollProvider>
      <Shell>
        <Hero />
        <Intro />
        <Organization />
        <Problem />
        <Analysis />
        <Discussion />
        <Close />
        <Solution />
      </Shell>
    </ScrollProvider>
  )
}
