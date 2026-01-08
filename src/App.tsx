import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import './App.css';

// Import all your pages
import Dashboard from './pages/Dashboard.jsx';
import Journal from './pages/Journal.jsx';
import Portfolio from './pages/portfolio.jsx';
import Spot from './pages/Spot.jsx';
import Futures from './pages/Futures.jsx';
import Margin from './pages/Margin.jsx';
import Options from './pages/Options.jsx';
import NFT from './pages/NFT.jsx';
import Calculator from './pages/Calculator.tsx';
import Analytics from './pages/Analytics.jsx';
import Psychology from './pages/Psychology.jsx';
import Watchlist from './pages/Watchlist.jsx';
import Notes from './pages/Notes.jsx';
import Settings from './pages/Settings.jsx';
import Profile from './pages/Profile.jsx';
import HelpCenter from './pages/HelpCenter.jsx';
import Support from './pages/Support.jsx';
import APIDocs from './pages/APIDocs.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import ContactSupport from './pages/ContactSupport.jsx';
import PressKit from './pages/PressKit.jsx';
import Privacy from './pages/Privacy.jsx';
import SystemStatus from './pages/SystemStatus.jsx';
import Terms from './pages/Terms.jsx';
import TradingGuides from './pages/TradingGuides.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="journal" element={<Journal />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="spot" element={<Spot />} />
          <Route path="futures" element={<Futures />} />
          <Route path="margin" element={<Margin />} />
          <Route path="options" element={<Options />} />
          <Route path="nft" element={<NFT />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="psychology" element={<Psychology />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="notes" element={<Notes />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<HelpCenter />} />
          <Route path="support" element={<Support />} />
          <Route path="api-docs" element={<APIDocs />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<ContactSupport />} />
          <Route path="press" element={<PressKit />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="status" element={<SystemStatus />} />
          <Route path="terms" element={<Terms />} />
          <Route path="guides" element={<TradingGuides />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;