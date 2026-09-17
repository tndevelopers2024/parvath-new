import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import CustomCursor from './components/CustomCursor'
import FloatingActions from './components/FloatingActions'
import WelcomePopup from './components/WelcomePopup'
import Preloader from './components/Preloader'
import Home from './pages/Home'

// Home ships in the initial bundle; everything else is fetched on navigation.
const About = lazy(() => import('./pages/About'))
const ServicesPage = lazy(() => import('./pages/Services'))
const WealthCreation = lazy(() => import('./pages/WealthCreation'))
const RetirementPlanning = lazy(() => import('./pages/RetirementPlanning'))
const LifeInsurance = lazy(() => import('./pages/LifeInsurance'))
const LegacyPlanning = lazy(() => import('./pages/LegacyPlanning'))
const EmployeeBenefits = lazy(() => import('./pages/EmployeeBenefits'))
const GroupGratuity = lazy(() => import('./pages/GroupGratuity'))
// Insights is hidden until real articles exist; the page file stays in src/pages.
const Contact = lazy(() => import('./pages/Contact'))

const Calculators = lazy(() => import('./pages/calculators/Calculators'))
const ChildEducationCalc = lazy(() => import('./pages/calculators/ChildEducation'))
const GrandWeddingCalc = lazy(() => import('./pages/calculators/GrandWedding'))
const DreamPurchaseCalc = lazy(() => import('./pages/calculators/DreamPurchase'))
const DreamVacationCalc = lazy(() => import('./pages/calculators/DreamVacation'))
const SipCalc = lazy(() => import('./pages/calculators/Sip'))
const LumpsumCalc = lazy(() => import('./pages/calculators/Lumpsum'))
const CostOfDelayCalc = lazy(() => import('./pages/calculators/CostOfDelay'))
const LimitedPeriodSipCalc = lazy(() => import('./pages/calculators/LimitedPeriodSip'))
const SipTopUpCalc = lazy(() => import('./pages/calculators/SipTopUp'))
const BirthdaySipCalc = lazy(() => import('./pages/calculators/BirthdaySip'))
const EmiCalc = lazy(() => import('./pages/calculators/Emi'))
const HomeLoanSipCalc = lazy(() => import('./pages/calculators/HomeLoanSip'))
const SwpCalc = lazy(() => import('./pages/calculators/Swp'))
const DreamRetirementCalc = lazy(() => import('./pages/calculators/DreamRetirement'))
const LifeInsuranceNeedCalc = lazy(() => import('./pages/calculators/LifeInsuranceNeed'))

const NotFound = lazy(() => import('./pages/NotFound'))

/** Lenis configuration for a slower, calmer luxury scroll experience. */
const lenisOptions = {
  lerp: 0.05,
  duration: 1.8,
  smoothWheel: true,
  wheelMultiplier: 0.85,
}

/** Holds the viewport height while a lazy route resolves, so nothing jumps. */
function RouteFallback() {
  return <div className="min-h-[70vh]" aria-hidden="true" />
}

export default function App() {
  const location = useLocation()

  return (
    <ReactLenis root options={lenisOptions}>
      {/* Keyed by path: remounts, and so replays, on every route change */}
      <Preloader key={location.pathname} />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />

      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/wealth-creation" element={<WealthCreation />} />
              <Route path="/services/retirement-planning" element={<RetirementPlanning />} />
              <Route path="/services/life-insurance" element={<LifeInsurance />} />
              <Route path="/services/legacy-planning" element={<LegacyPlanning />} />
              <Route path="/services/employee-benefits" element={<EmployeeBenefits />} />
              <Route path="/services/group-gratuity" element={<GroupGratuity />} />
              {/* Approach was folded into About; keep old links working */}
              <Route path="/approach" element={<Navigate to="/about" replace />} />
              <Route path="/insights" element={<Navigate to="/" replace />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/calculators" element={<Calculators />} />
              <Route path="/calculators/child-education" element={<ChildEducationCalc />} />
              <Route path="/calculators/grand-wedding" element={<GrandWeddingCalc />} />
              <Route path="/calculators/dream-purchase" element={<DreamPurchaseCalc />} />
              <Route path="/calculators/dream-vacation" element={<DreamVacationCalc />} />
              <Route path="/calculators/sip" element={<SipCalc />} />
              <Route path="/calculators/lumpsum" element={<LumpsumCalc />} />
              <Route path="/calculators/cost-of-delay" element={<CostOfDelayCalc />} />
              <Route path="/calculators/limited-period-sip" element={<LimitedPeriodSipCalc />} />
              <Route path="/calculators/sip-top-up" element={<SipTopUpCalc />} />
              <Route path="/calculators/birthday-sip" element={<BirthdaySipCalc />} />
              <Route path="/calculators/emi" element={<EmiCalc />} />
              <Route path="/calculators/home-loan-sip" element={<HomeLoanSipCalc />} />
              <Route path="/calculators/swp" element={<SwpCalc />} />
              <Route path="/calculators/dream-retirement" element={<DreamRetirementCalc />} />
              <Route path="/calculators/life-insurance-need" element={<LifeInsuranceNeedCalc />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>

      <Footer />
      <FloatingActions />
      <WelcomePopup />
    </ReactLenis>
  )
}
