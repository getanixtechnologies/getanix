import useLenis from './hooks/useLenis'
import useReveal from './hooks/useReveal'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Story from './components/Story'
import Services from './components/Services'
import Clients from './components/Clients'
import Testimonial from './components/Testimonial'
import Process from './components/Process'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { marqueeKeywords, marqueeOutcomes } from './data/content'

export default function App() {
  useLenis()
  useReveal()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee items={marqueeKeywords} variant="dark" />
        <Story />
        <Services />
        <Marquee items={marqueeOutcomes} variant="hand" reverse />
        <Clients />
        <Testimonial />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
