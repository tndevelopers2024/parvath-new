import Seo from '../components/Seo'
import { organisationJsonLd } from '../data/site'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import AboutFounder from '../components/AboutFounder'
import Services from '../components/Services'
import BusinessOwners from '../components/BusinessOwners'
import Process from '../components/Process'
import BrandTicker from '../components/BrandTicker'
import WhyParvath from '../components/WhyParvath'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import ScrollProgress from '../components/ScrollProgress'

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={organisationJsonLd} />
      <ScrollProgress />
      <Hero />
      <BrandTicker />
      <AboutFounder />
      <Services background="bg-cream" />
      <Stats />
      <BusinessOwners />
      <Process background="bg-cream" />
      <WhyParvath className="" />
      <CTA />
      <FAQ background="bg-cream" />
    </>
  )
}
