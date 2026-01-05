import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from '../Layout.jsx'

// Pages
import Dashboard from '../Pages/Dashboard.jsx'
import Journal from '../Pages/Journal.jsx'
import Charts from '../Pages/Chart.jsx'
import Watchlist from '../Pages/Watchlist.jsx'
import Portfolio from '../Pages/portfolio.jsx'
import Analytics from '../Pages/Analytics.jsx'
import Calculator from '../Pages/Calculator.jsx'
import Psychology from '../Pages/Psychology.jsx'
import Notes from '../Pages/Notes.jsx'
import Profile from '../Pages/Profile.jsx'
import Settings from '../Pages/Settings.jsx'

// Platform and company/support placeholders (created if missing)
import Spot from '../Pages/Spot.jsx'
import Futures from '../Pages/Futures.jsx'
import Options from '../Pages/Options.jsx'
import Margin from '../Pages/Margin.jsx'
import NFT from '../Pages/NFT.jsx'

import Support from '../Pages/Support.jsx'
import HelpCenter from '../Pages/HelpCenter.jsx'
import APIDocs from '../Pages/APIDocs.jsx'
import TradingGuides from '../Pages/TradingGuides.jsx'
import ContactSupport from '../Pages/ContactSupport.jsx'
import SystemStatus from '../Pages/SystemStatus.jsx'

import About from '../Pages/About.jsx'
import Careers from '../Pages/Careers.jsx'
import PressKit from '../Pages/PressKit.jsx'
import Privacy from '../Pages/Privacy.jsx'
import Terms from '../Pages/Terms.jsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/psychology" element={<Psychology />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Markets */}
          <Route path="/spot" element={<Spot />} />
          <Route path="/futures" element={<Futures />} />
          <Route path="/options" element={<Options />} />
          <Route path="/margin" element={<Margin />} />
          <Route path="/nft" element={<NFT />} />

          {/* Support & Docs */}
          <Route path="/support" element={<Support />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/api-docs" element={<APIDocs />} />
          <Route path="/trading-guides" element={<TradingGuides />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/system-status" element={<SystemStatus />} />

          {/* Company */}
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press-kit" element={<PressKit />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Fallback to dashboard */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
)
