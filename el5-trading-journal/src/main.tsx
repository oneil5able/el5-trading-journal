import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from '../Layout'

// Pages
import Dashboard from '../Pages/Dashboard'
import Journal from '../Pages/Journal'
import Charts from '../Pages/Chart'
import Watchlist from '../Pages/Watchlist'
import Portfolio from '../Pages/portfolio'
import Analytics from '../Pages/Analytics'
import Calculator from '../Pages/Calculator'
import Psychology from '../Pages/Psychology'
import Notes from '../Pages/Notes'
import Profile from '../Pages/Profile'
import Settings from '../Pages/Settings'

// Platform and company/support placeholders (created if missing)
import Spot from '../Pages/Spot'
import Futures from '../Pages/Futures'
import Options from '../Pages/Options'
import Margin from '../Pages/Margin'
import NFT from '../Pages/NFT'

import Support from '../Pages/Support'
import HelpCenter from '../Pages/HelpCenter'
import APIDocs from '../Pages/APIDocs'
import TradingGuides from '../Pages/TradingGuides'
import ContactSupport from '../Pages/ContactSupport'
import SystemStatus from '../Pages/SystemStatus'

import About from '../Pages/About'
import Careers from '../Pages/Careers'
import PressKit from '../Pages/PressKit'
import Privacy from '../Pages/Privacy'
import Terms from '../Pages/Terms'

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
